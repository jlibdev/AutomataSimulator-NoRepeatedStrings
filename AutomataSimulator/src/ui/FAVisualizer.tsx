import cytoscape, { ElementDefinition } from "cytoscape";
import { useEffect, useRef } from "react";
import { styleSheet } from "../cytoscape/style";
import clsx from "clsx";
import { inputStringType } from "../types/AutomatonTypes";

type FAVisualizerProps = {
  states: Array<ElementDefinition>;
  transistions: Array<ElementDefinition>;
  className?: string;
  userInput: Array<string>;
  inputString: Array<inputStringType>;
};

const FAVisualizer = ({
  states,
  transistions,
  className,
  userInput,
  inputString,
}: FAVisualizerProps) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

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

    let prev_path = "initial";

    const paths = [];

    let current = "";
    for (const item of userInput) {
      current += item;
      paths.push(current);
    }

    paths.forEach((path) => {
      const sorted_path = path.split("").sort().join("");
      const edge = cy.getElementById(prev_path + " - " + sorted_path);
      const node = cy.getElementById(sorted_path);

      edge.addClass("pathEdge");
      node.addClass("pathNode");
      if (inputString.length == userInput.length) {
        // console.log("Valid");
      } else {
        if (path.length == userInput.length) {
          node.addClass("invalidState");
          cy.edges().map((edge) => {
            if (edge.source().id() == sorted_path) {
              console.log(edge);
              edge.addClass("invalidPath");
            }
          });
        }
      }

      prev_path = sorted_path;
    });

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
    <div ref={cyRef} className={clsx("w-full h-full rounded-2xl", className)} />
  );
};

export default FAVisualizer;
