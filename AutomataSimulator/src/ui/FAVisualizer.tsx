import { useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Core } from "cytoscape";
import { ElementDefinition } from "cytoscape";

export default function FAVisualizer({
  elements,
}: {
  elements: Array<ElementDefinition> | [];
}) {
  const cyRef = useRef<Core | null>(null);

  const stylesheet = [
    {
      selector: "node",
      style: {
        "background-color": "#0074D9", // Default node color
        label: "data(label)",
        color: "#fff", // Text color
        "font-size": "14px", // Font size
      },
    },
    {
      // Style for initial state node
      selector: 'node[state="initial"]',
      style: {
        "background-color": "#22e7f0",
        "border-width": "3px", // Border width for initial state
        "border-color": "#005f7f", // Darker border for emphasis
      },
    },
    {
      // Style for final state node
      selector: 'node[state="final"]',
      style: {
        "background-color": "#e57cf6", // Purple for final state
        "border-width": "3px", // Border width for final state
        "border-color": "#7f3d7f", // Darker purple border
      },
    },
    {
      selector: "edge",
      style: {
        label: "data(label)",
        "text-rotation": "autorotate",
        color: "#fff",
        "font-size": "12px",
      },
    },
  ];

  return (
    <div className="w-full h-full p-5 flex flex-col gap-2">
      <span className="text-2xl">Visualizer</span>
      <div className="w-full h-full outline rounded-2xl bg-gray-900">
        <div className="w-[100%] h-[5%] bg-slate-800 rounded-t-2xl px-2"></div>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "100%", height: "95%" }}
          layout={{ name: "preset" }}
          stylesheet={stylesheet}
          cy={(cy: Core) => {
            cyRef.current = cy;
            cy.zoom(1.5);
            cy.center();
          }}
        />
      </div>
    </div>
  );
}
