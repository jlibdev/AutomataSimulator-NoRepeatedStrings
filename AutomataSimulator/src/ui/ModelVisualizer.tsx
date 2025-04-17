import cytoscape from "cytoscape";
import { useEffect, useRef } from "react";

const ModelVisualizer = () => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        { data: { id: "initial", label: "q0" }, position: { x: 0, y: 0 } },
      ],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#0074D9", // Default node color
            label: "data(label)",
            color: "#fff", // Text color
            "font-size": "16px", // Font size
            "text-valign": "center",
          },
        },
      ],
    });
  }, []);
  return (
    <div className="w-full h-full p-5 flex flex-col gap-2">
      <span className="text-2xl">Visualizer</span>
      <div className="w-full h-full outline rounded-2xl bg-gray-900">
        <div className="w-[100%] h-[5%] bg-slate-800 rounded-t-2xl px-2"></div>
        <div ref={cyRef} className="w-full h-[95%] rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ModelVisualizer;
