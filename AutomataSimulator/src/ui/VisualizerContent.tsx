import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MoveRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useCytoscapeFA } from "@/hooks/useCytoscapeFA";
import { useGetElements } from "@/hooks/useGetElements";
import { isStringValid } from "@/utils/Validators";
import { getPath } from "@/utils/cytoscape_functions";

export interface VisualizerContentProps {
  userInput: string;
  isFullModel: boolean;
}

const VisualizerContent = ({
  userInput,
  isFullModel,
}: VisualizerContentProps) => {
  const cyRef = useRef<HTMLDivElement>(null);

  const currentIndex = useRef<number>(0);
  const currentState = useRef<string>("initial");

  // Get All Elements both states and transitions for the Model
  const { states, transitions } = useGetElements(userInput, isFullModel);
  //   States Definition

  const [paths, setPaths] = useState<Array<string>>(["q0"]);

  //   State for pressing the play button
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [showPath, setShowPath] = useState<boolean>(false);

  //   State for toggle of grababble nodes
  const [isGrababble, setIsGrababble] = useState<boolean>(false);

  //   State for toggle Auto Focus to current state

  const [isAutoFocus, setIsAutoFocus] = useState<boolean>(true);

  //   State for storing selected node on the FA

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  //   Instance initialization for cytoscape . Generates the FA MODEL

  const cyRefInstance = useCytoscapeFA({
    containerRef: cyRef,
    layoutName: "preset",
    states: states,
    transitions: transitions,
    setSelectedNode,
  });

  //   UseEffect that enables / disables the nodes ability to be grabbed by the user

  useEffect(() => {
    if (!cyRefInstance.current) return;

    cyRefInstance.current.nodes().forEach((node) => {
      if (node.id() !== "initial_arrow") {
        if (isGrababble) {
          node.grabify();
        } else {
          node.ungrabify();
        }
      }
    });
  }, [isGrababble]);

  //   Event Function for clicking grabbale button
  const handleClickGrabble = () => {
    setIsGrababble((prev) => !prev);
  };

  const gotoNextState = () => {
    if (!cyRefInstance.current) return false;

    const node = cyRefInstance.current.getElementById(currentState.current);

    let current_edge = null;

    if (
      node
        .outgoers("edge")
        .filter(
          (edge) => edge.data().label == userInput.charAt(currentIndex.current)
        )
        .id()
    ) {
      current_edge = node
        .outgoers("edge")
        .filter(
          (edge) => edge.data().label == userInput.charAt(currentIndex.current)
        );

      current_edge.addClass("pathEdge");

      const next_node = cyRefInstance.current.getElementById(
        current_edge.target().id()
      );

      next_node.addClass("pathNode");
      currentState.current = next_node.id();
      currentIndex.current = Math.min(
        currentIndex.current + 1,
        userInput.length
      );

      handleStateTransitionAnimation();

      setPaths(getPath(cyRefInstance.current, userInput, currentState.current));

      return true;
    } else {
      if (!isStringValid(userInput)) {
      } else {
        node.outgoers("edge").map((edge) => {
          edge.addClass("invalidPath");
        });
        node.getElementById(currentState.current).addClass("invalidState");
      }

      handleStateTransitionAnimation();

      return false;
    }
  };

  const gotoPrevState = () => {
    if (!cyRefInstance.current) return;

    const node = cyRefInstance.current.getElementById(currentState.current);

    if (
      node
        .outgoers("edge")
        .filter((edge) => edge.hasClass("invalidPath"))
        .id()
    ) {
      node.outgoers("edge").map((edge) => {
        edge.removeClass("invalidPath");
      });
      node.removeClass("invalidState");
    } else {
      node.removeClass("pathNode");
      cyRefInstance.current.edges().map((edge) => {
        if (edge.target().id() == node.id()) {
          if (edge.hasClass("pathEdge")) {
            edge.removeClass("pathEdge");
            currentState.current = edge.source().id();
            currentIndex.current--;
          }
        }
      });

      handleStateTransitionAnimation();
      setPaths(getPath(cyRefInstance.current, userInput, currentState.current));
    }
  };

  const handleFitModel = () => {
    cyRefInstance.current?.ready(() =>
      cyRefInstance.current?.animate({
        fit: {
          eles: cyRefInstance.current.elements(),
          padding: 50,
        },
        duration: 1000,
        easing: "ease-in-out",
      })
    );
  };

  const handleAutoFocus = () => {
    setIsAutoFocus(!isAutoFocus);
  };
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (!gotoNextState()) {
        setIsPlaying(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStateTransitionAnimation = () => {
    if (!cyRefInstance.current) return;

    const current_node = cyRefInstance.current.getElementById(
      currentState.current
    );
    if (isAutoFocus) {
      const position = current_node.position();

      cyRefInstance.current.animate(
        {
          pan: {
            x: -position.x + cyRefInstance.current.width() / 2,
            y: -position.y + cyRefInstance.current.height() / 2,
          },
          duration: 500,
        },
        {
          center: { eles: current_node },
          zoom: 1.5,
          duration: 500,
          complete: () => {
            current_node.animate(
              { style: { width: 220, height: 220 } },
              {
                duration: 200,
                easing: "ease-in",
                complete: () => {
                  setTimeout(() => {
                    current_node.animate(
                      { style: { width: 200, height: 200 } },
                      { duration: 200, easing: "ease-out" }
                    );
                  }, 100);
                },
              }
            );
          },
        }
      );
    } else {
      current_node.animate(
        { style: { width: 220, height: 220 } },
        {
          duration: 200,
          easing: "ease-in",
          complete: () => {
            setTimeout(() => {
              current_node.animate(
                { style: { width: 200, height: 200 } },
                { duration: 200, easing: "ease-out" }
              );
            }, 100);
          },
        }
      );
    }
  };

  const panToState = (id: string) => {
    const cy = cyRefInstance.current;
    if (!cy) return;

    cy.nodes().forEach((node) => {
      if (node.data().label === id) {
        const position = node.position();
        const panX = -position.x + cy.width() / 2;
        const panY = -position.y + cy.height() / 2;

        cy.animate({
          pan: {
            x: panX,
            y: panY,
          },
          center: {
            eles: node,
          },
          zoom: 1.5,
          duration: 500,
          easing: "ease-out",
        });

        return;
      }
    });
  };

  const handleReplay = () => {
    if (!cyRefInstance.current) return;
    currentIndex.current = 0;
    currentState.current = "initial";

    cyRefInstance.current.nodes().map((node) => {
      if (node.hasClass("pathNode") || node.hasClass("invalidState")) {
        node.removeClass("pathNode invalidState");
      }
    });

    cyRefInstance.current.edges().map((edge) => {
      if (edge.hasClass("pathEdge") || edge.hasClass("invalidPath")) {
        edge.removeClass("pathEdge invalidPath");
      }
    });

    handleStateTransitionAnimation();
  };

  const exportToJff = () => {
    const lines = [
      '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
      "<structure>&#13;",
      "\t<type>fa</type>&#13;",
      "\t<automaton>&#13;",
    ];

    const jflap_ids_list: Array<string> = [];

    if (cyRefInstance.current) {
      const cy = cyRefInstance.current;
      let count = 0;
      cy.nodes().map((node) => {
        if (node.id() != "initial_arrow") {
          lines.push(`\t\t<state id="${count}" name="${"q" + count}">&#13;`);
          lines.push(`\t\t\t<x>${node.position().x}</x>&#13;`);
          lines.push(`\t\t\t<y>${node.position().y}</y>&#13;`);
          if (node.hasClass("initial")) {
            lines.push(`\t\t\t<initial/>&#13;`);
          }
          if (node.hasClass("final")) {
            lines.push(`\t\t\t<final/>&#13;`);
          }
          lines.push(`</state>&#13;`);
          jflap_ids_list.push(node.id());
          count++;
        }
      });

      cy.edges().map((edge) => {
        lines.push(`\t\t<transition>&#13;`);
        lines.push(
          `\t\t\t<from>${jflap_ids_list.indexOf(
            edge.source().id()
          )}</from>&#13;`,
          `\t\t\t<to>${jflap_ids_list.indexOf(edge.target().id())}</to>&#13;`,
          `\t\t\t<read>${edge.data().label}</read>&#13;`,
          `\t\t</transition>&#13;`
        );
      });
    }

    lines.push("\t</automaton>&#13;", "</structure>");

    const fileContent = lines.join("\n"); // Join array into single string with new lines
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `strings-with-no-repating-over-0-9-model-0-${
      isFullModel ? "9" : userInput.length
    }.jff`;
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{`Input String : ${
        userInput.length > 0 ? userInput : "Empty String"
      }`}</Label>
      <div id="Actions" className="flex gap-2 h-10">
        <div className="flex gap-2 items-center">
          <Button onClick={() => gotoPrevState()} disabled={isPlaying}>
            <ChevronLeft />
          </Button>
          <Button onClick={() => setIsPlaying(!isPlaying)}>
            {!isPlaying ? <Play></Play> : <Pause></Pause>}
          </Button>
          <Button
            onClick={() => handleReplay()}
            disabled={isPlaying || currentIndex.current != userInput.length}
          >
            <RotateCcw></RotateCcw>
          </Button>
          <Button onClick={() => gotoNextState()} disabled={isPlaying}>
            <ChevronRight></ChevronRight>
          </Button>
          <Button onClick={() => exportToJff()} disabled={isPlaying}>
            <ArrowDownToLine></ArrowDownToLine>
          </Button>
          <Button onClick={() => handleFitModel()} disabled={isPlaying}>
            <Maximize2></Maximize2>
          </Button>
          <Button
            variant={isAutoFocus ? "default" : "outline"}
            onClick={() => handleAutoFocus()}
            disabled={isPlaying}
          >
            Auto Focus
          </Button>
          <Button
            variant={isGrababble ? "default" : "outline"}
            onClick={() => handleClickGrabble()}
            disabled={isPlaying}
          >
            Grabbable
          </Button>
          <Button
            variant={showPath ? "default" : "outline"}
            onClick={() => setShowPath(!showPath)}
          >
            Show Paths
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div className="flex w-full justify-between">
          <div className="flex items-center w-full justify-end gap-10 font-bold">
            <span>{`State Count : ${states.length - 1}`}</span>
            <span>{`Transition Count : ${transitions.length}`}</span>
            <span>
              {`Selected State: ${
                selectedNode
                  ? cyRefInstance.current?.getElementById(selectedNode)?.data()
                      ?.label
                  : "None"
              }`}
            </span>

            {isStringValid(userInput) ? (
              <span className="text-white bold bg-red-500 min-w-[100px] text-center rounded-full">
                Invalid
              </span>
            ) : (
              <span className="text-white bold bg-green-500 min-w-[100px] text-center rounded-full">
                Valid
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-6 gap-5">
        <div
          ref={cyRef}
          className={cn(
            "w-full h-[500px] rounded-md border-2 bg-slate-600",
            showPath ? "col-span-5" : "col-span-6"
          )}
        />

        {showPath && (
          <div className="border py-5 flex flex-col gap-5">
            <Label className="px-5">Current Node Path:</Label>
            <div className="flex gap-2 flex-wrap  h-fit justify-center">
              {paths.map((path) => (
                <Button
                  className="rounded-full w-fit min-w-[80px] animate-in"
                  onClick={() => panToState(path)}
                >
                  {path}
                  <MoveRight size={15}></MoveRight>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizerContent;
