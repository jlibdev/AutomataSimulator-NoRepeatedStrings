import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useCytoscapeFA } from "@/hooks/useCytoscapeFA";
import { useGetElements } from "@/hooks/useGetElements";
import { isStringValid } from "@/utils/Validators";

export interface VisualizerContentProps {
  userInput: string;
}

const VisualizerContent = ({ userInput }: VisualizerContentProps) => {
  const cyRef = useRef<HTMLDivElement>(null);

  const currentIndex = useRef<number>(0);
  const currentState = useRef<string>("initial");

  // Get All Elements both states and transitions for the Model
  const { states, transitions } = useGetElements(userInput);

  const [processString, setProcessString] = useState<string>("");

  //   States Definition

  //   State for pressing the play button
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  //   State for toggle of grababble nodes
  const [isGrababble, setIsGrababble] = useState<boolean>(true);

  //   State for toggle Auto Focus to current state

  const [isAutoFocus, setIsAutoFocus] = useState<boolean>(true);

  //   State for storing selected node on the FA

  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    label: string;
  } | null>(null);

  //   Event function for selecting a node in the model
  const handleNodeSelect = (id: string, label: string) => {
    if (selectedNode?.id === id) {
      setSelectedNode(null);
    } else {
      setSelectedNode({ id, label });
    }
  };

  //   Instance initialization for cytoscape . Generates the FA MODEL

  const cyRefInstance = useCytoscapeFA({
    containerRef: cyRef,
    layoutName: "preset",
    states: states,
    transitions: transitions,
    handleNodeSelect,
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

      handleStateTransitionAnimation();

      next_node.addClass("pathNode");
      currentState.current = next_node.id();
      currentIndex.current = Math.min(
        currentIndex.current + 1,
        userInput.length
      );

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
              { style: { width: 80, height: 80 } },
              {
                duration: 200,
                easing: "ease-in",
                complete: () => {
                  setTimeout(() => {
                    current_node.animate(
                      { style: { width: 60, height: 60 } },
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
        { style: { width: 80, height: 80 } },
        {
          duration: 200,
          easing: "ease-in",
          complete: () => {
            setTimeout(() => {
              current_node.animate(
                { style: { width: 60, height: 60 } },
                { duration: 200, easing: "ease-out" }
              );
            }, 100);
          },
        }
      );
    }
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
          <Button onClick={() => handleFitModel()} disabled={isPlaying}>
            Fit Model
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
        </div>
        <Separator orientation="vertical" />
        <div className="flex w-full justify-between">
          <div className="flex items-center w-full justify-end gap-10 font-bold">
            <span>{`State Count : ${states.length - 1}`}</span>
            <span>{`Transition Count : ${transitions.length}`}</span>
            <span>{`Selected State : ${
              selectedNode ? selectedNode.label : "None"
            }`}</span>
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
      <div
        ref={cyRef}
        className={cn("w-full h-[500px] rounded-md border-2 bg-slate-600")}
      />
    </div>
  );
};

export default VisualizerContent;
