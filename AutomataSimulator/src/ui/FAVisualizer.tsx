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
        "background-color": "#fff",
        label: "data(label)",
        width: "150px",
        height: "150px",
        color: "#fff",
        "font-size": "100px",
        "text-valign": "center",
        "text-outline-width": 5,
      },
    },
    {
      selector: 'node[state="initial"]',
      style: {
        "border-width": "3px",
        "border-color": "#005f7f",
      },
    },
    {
      selector: "node[is_initial = true]",
      style: {
        "border-width": "20px",
        "border-color": "#7f3d7f",
      },
    },
    {
      selector: 'node[state="final"]',
      style: {
        "background-color": "#e57cf6",
        "border-width": "20px",
        "border-color": "#7f3d7f",
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
    {
      selector: ".state",
      style: {
        shape: "ellipse",
        "background-color": "#3498db",
        label: "data(label)",
        width: "80px",
        height: "80px",
        "text-valign": "center",
        color: "#fff",
        "font-size": "20px",
      },
    },
    {
      selector: ".start-arrow",
      style: {
        shape: "tag",
        "background-color": "#2ecc71",
        width: "20px",
        height: "60px",
        "text-opacity": 0, // no label
      },
    },
  ];

  return (
    <div className="w-full h-full p-5 flex flex-col gap-2">
      <span className="text-2xl">Visualizer</span>
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
        </div>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "100%", height: "92%" }}
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
