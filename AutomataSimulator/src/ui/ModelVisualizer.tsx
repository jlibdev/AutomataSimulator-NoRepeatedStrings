import cytoscape, { ElementDefinition } from "cytoscape";
import { useEffect, useRef } from "react";

type ModelVisualizerProps = {
  el: ElementDefinition[];
};

const ModelVisualizer = ({ el }: ModelVisualizerProps) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!cyRef.current) return;

    // Destroy previous instance if it exists (for cleanup)
    if (cyInstance.current) {
      cyInstance.current.destroy();
    }

    const cy = cytoscape({
      container: cyRef.current,
      layout: { name: "preset" },
      elements: el,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#22e7f0",
            label: "data(label)",
            color: "#fff",
            "font-size": "16px",
            "text-valign": "center",
            "text-halign": "center",
            "border-width": 4,
            "border-color": "#ffffff",
            width: 60,
            height: 60,
            "overlay-opacity": 0,
            "text-outline-width": 3,
            "text-outline-color": "#000000",
          },
        },
        {
          selector: "edge",
          style: {
            label: "data(label)",
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "line-color": "#999",
            "target-arrow-color": "#999",
            "text-rotation": "autorotate",
            color: "#fff",
            "font-size": "100px",
            "text-outline-width": 5,
            "arrow-scale": 5,
            "target-endpoint": "outside-to-node",
            "source-endpoint": "outside-to-node",
          },
        },
      ],
    });

    cyInstance.current = cy;

    return () => {
      cy.destroy();
    };
  }, [el]);

  return (
    <div className="w-full h-full p-5 flex flex-col gap-2">
      <span className="text-2xl text-white">Visualizer</span>
      <div className="w-full h-full outline rounded-2xl bg-gray-900">
        <div className="w-[100%] h-[8%] bg-slate-800 rounded-t-2xl px-5 flex items-center text-black font-display gap-5 ">
          <button className="bg-slate-300 rounded-[5px] px-2">
            Full Model
          </button>
          <button className="bg-slate-300 rounded-[5px] px-2">
            Grabble Nodes
          </button>
          <button className="bg-slate-300 rounded-[5px] px-2">
            Idle Animation
          </button>
          <button className="bg-slate-300 rounded-[5px] px-2">
            Trace Input
          </button>
          <button className="bg-slate-300 rounded-[5px] px-2">
            Pan to current
          </button>
          <button className="bg-slate-300 rounded-[5px] px-2">
            Zoom to Model
          </button>
        </div>
        <div ref={cyRef} className="w-full h-[95%] rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ModelVisualizer;
