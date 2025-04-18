import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import cytoscape from "cytoscape";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { useCytoscapeFA } from "@/hooks/useCytoscapeFA";

export interface VisualizerContentProps {
  userInput: string;
}

const VisualizerContent = ({ userInput }: VisualizerContentProps) => {
  const cyRef = useRef<HTMLDivElement>(null);

  const { cy } = useCytoscapeFA({
    containerRef: cyRef,
    layoutName: "preset",
    states: [
      { data: { id: "Initial", label: "q1" }, position: { x: 0, y: 0 } },
    ],
    transitions: [],
  });

  return (
    <div className="flex flex-col gap-2">
      <Label>{`Input String : ${
        userInput.length > 0 ? userInput : "Empty String"
      }`}</Label>
      <div id="Actions" className="flex gap-2 h-10">
        <div className="flex gap-2 items-center">
          <Button>
            <ChevronLeft />
          </Button>
          <Button>
            <Play></Play>
            <Pause></Pause>
          </Button>
          <Button>
            <ChevronRight></ChevronRight>
          </Button>
          <Button>Auto Focus</Button>
          <Button>Zoom Out</Button>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center w-full justify-end gap-10 font-bold">
          <span>{`State Count : None`}</span>
          <span>{`Edge Count : None`}</span>
          <span>{`Selected Edge : None`}</span>
          <span>{`Selected State : None`}</span>
          <span>{`Valid`}</span>
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
