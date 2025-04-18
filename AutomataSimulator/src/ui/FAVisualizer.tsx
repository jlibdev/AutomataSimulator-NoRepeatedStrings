import cytoscape, { ElementDefinition } from "cytoscape";
import { Dispatch, useEffect, useRef, useState } from "react";
import { styleSheet } from "../cytoscape/style";
import clsx from "clsx";
import { inputStringType } from "../types/AutomatonTypes";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

type FAVisualizerProps = {
  states: Array<ElementDefinition>;
  transistions: Array<ElementDefinition>;
  className?: string;
  userInput: Array<string>;
  inputString: Array<inputStringType>;
  isFullModel: boolean;
  setIsFullModel: Dispatch<React.SetStateAction<boolean>>;
};

const FAVisualizer = ({
  states,
  transistions,
  className,
  userInput,
  inputString,
  isFullModel,
  setIsFullModel,
}: FAVisualizerProps) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

  let prev_path = "initial";
  let current_index = 0;

  console.log("Rerendered", prev_path, current_index);

  const [isLive, setIsLive] = useState<boolean>(false);
  const [isFocusing, setIsFocusing] = useState<boolean>(false);

  const handleNextState = (cy: cytoscape.Core | null) => {
    console.log("In 1 ", current_index, userInput.length);

    const paths: Array<string> = [];
    let current = "";

    for (const item of userInput) {
      current += item;
      paths.push(current);
    }

    if (!cy) return;

    const sorted_path = paths[current_index].split("").sort().join("");
    const edge = cy.getElementById(prev_path + " - " + sorted_path);
    const node = cy.getElementById(sorted_path);
    const position = node.position();
    if (isFocusing) {
      cy.animate(
        {
          pan: {
            x: -position.x + cy.width() / 2,
            y: -position.y + cy.height() / 2,
          },
          duration: 500,
        },
        {
          center: { eles: node },
          zoom: 1.5,
          duration: 500,
        }
      );
    }

    if (current_index < userInput.length) {
      console.log("In 2 ", current_index, userInput.length);

      edge.addClass("pathEdge");
      node.addClass("pathNode");

      if (
        inputString.length !== userInput.length &&
        paths[current_index].length === userInput.length
      ) {
        node.addClass("invalidState");

        cy.edges().forEach((edge) => {
          if (edge.source().id() === sorted_path) {
            edge.addClass("invalidPath");
          }
        });
      }
      prev_path = sorted_path;
      current_index += 1;
    }
  };

  const handlePrevState = (cy: cytoscape.Core | null) => {
    if (!cy || prev_path === "initial") return;

    const currentNode = cy.getElementById(prev_path);
    let newPrevPath = "initial";

    const incomingEdge = cy
      .edges()
      .toArray()
      .find(
        (edge) => edge.target().id() === prev_path && edge.hasClass("pathEdge")
      );

    if (incomingEdge) {
      incomingEdge.removeClass("pathEdge");
      newPrevPath = incomingEdge.source().id();
    }

    currentNode.removeClass("pathNode invalidState");

    cy.edges().forEach((edge) => {
      if (edge.source().id() === prev_path && edge.hasClass("invalidPath")) {
        edge.removeClass("invalidPath");
      }
    });

    const newNode = cy.getElementById(newPrevPath);
    const pos = newNode.position();

    if (isFocusing) {
      cy.animate(
        {
          pan: {
            x: -pos.x + cy.width() / 2,
            y: -pos.y + cy.height() / 2,
          },
          duration: 500,
        },
        {
          center: { eles: newNode },
          zoom: 1.5,
          duration: 500,
        }
      );
    }

    prev_path = newPrevPath;
    current_index = prev_path === "initial" ? 0 : current_index - 1;
  };

  useEffect(() => {
    if (!cyRef.current) return;

    if (cyInstance.current) {
      cyInstance.current.destroy();
    }

    const cy = cytoscape({
      container: cyRef.current,
      layout: { name: "preset" },
      elements: [...states, ...transistions],
      style: styleSheet,
    });

    cyInstance.current = cy;

    // Logic

    const paths = [];

    let current = "";
    for (const item of userInput) {
      current += item;
      paths.push(current);
    }

    if (isLive) {
      paths.forEach((path) => {
        const sorted_path = path.split("").sort().join("");
        const edge = cy.getElementById(prev_path + " - " + sorted_path);
        const node = cy.getElementById(sorted_path);

        edge.addClass("pathEdge");
        node.addClass("pathNode");
        if (inputString.length == userInput.length) {
          current_index++;
        } else {
          if (path.length == userInput.length) {
            node.addClass("invalidState");
            cy.edges().map((edge) => {
              if (edge.source().id() == sorted_path) {
                edge.addClass("invalidPath");
              }
            });
          }
        }
        prev_path = sorted_path;
      });
    }

    // Events

    cy.on("drag", "node", function (evt) {
      const node = evt.target;

      if (node.id() == "initial") {
        cy.getElementById("initial_arrow").position({
          x: node.position().x - 45,
          y: node.position().y,
        });
      }
    });

    return () => {
      cy.destroy();
    };
  }, [states, transistions]);

  return (
    <div className="bg-slate-800 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between">
      <div className="bg-slate-600 px-5 flex items-center text-white py-2 gap-5 ">
        <button
          type="button"
          className={clsx(
            "rounded-2xl   px-2 font-display min-w-[150px] transition-colors cursor-pall hover:scale-105 ease-in-out duration-300",
            isFullModel ? "bg-primary text-white" : "bg-slate-300 text-black"
          )}
          onClick={() => setIsFullModel(!isFullModel)}
        >
          Full Model
        </button>

        <button
          type="button"
          className={clsx(
            "rounded-2xl   px-2 font-display min-w-[150px] transition-colors cursor-pall hover:scale-105 ease-in-out duration-300",
            isLive ? "bg-primary text-white" : "bg-slate-300 text-black"
          )}
          onClick={() => setIsLive(!isLive)}
        >
          Live Visual
        </button>

        <button
          type="button"
          className={clsx(
            "rounded-2xl   px-2 font-display min-w-[150px] transition-colors cursor-pall hover:scale-105 ease-in-out duration-300",
            isFocusing ? "bg-primary text-white" : "bg-slate-300 text-black"
          )}
          onClick={() => setIsFocusing(!isFocusing)}
          onDoubleClick={() => console.log("hello?")}
        >
          Focus to Current
        </button>
      </div>
      <div
        ref={cyRef}
        className={clsx("w-full h-full rounded-2xl", className)}
      />
      <div className="bg-slate-600 px-10 flex items-center text-white gap-5 justify-center py-2">
        <button
          className="hover:scale-125 transition-transform ease-in-out duration-200"
          onClick={() => handlePrevState(cyInstance.current!)}
        >
          <ChevronLeft />
        </button>

        <button
          className="hover:scale-125 transition-transform ease-in-out duration-200"
          onClick={() => handleNextState(cyInstance.current!)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FAVisualizer;
