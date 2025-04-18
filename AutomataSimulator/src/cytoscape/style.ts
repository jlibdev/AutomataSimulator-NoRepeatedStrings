import { StylesheetStyle } from "cytoscape";

export const styleSheet : Array<StylesheetStyle> = [
    {
        selector: "node",
        style: {
          backgroundColor: "#fff",
          color: "#000",
          width: 200,
          height: 200,
          "font-size": "100px",
          "text-valign": "center",
          "text-halign": "center",
        },
    },
    {
        selector: '[label]',
        style: {
          label: 'data(label)',
        }
      },
    {
        selector : "edge",
        style: {
            color: "#fff",
            label : "data(label)",
            "curve-style": "bezier",
            "target-arrow-shape" : "chevron",
            "target-endpoint": "outside-to-node",
            "source-endpoint": "outside-to-node",
            "arrow-scale": 2,
            "target-arrow-color": "#999",
            "text-rotation": "autorotate",
            "font-size": "100px",
        }
    },
    {
        selector : ".initial",
        style : {
            color: "#fff",
            shape: "ellipse",
            backgroundColor: "#008000",
        }
    },
    {
        selector : "#initial_arrow",
        style: {
            shape : "tag",
            width: 100,
            height: 150,
            "border-width" : "0px",
            "z-index": -1,
        }
    },
    {
        selector : ".final",
        style : {
            "border-width": "10px",
            "border-color" : "#87acac",
            "border-style" : "double",
        }
    },
    {
        selector : ".pathEdge",
        style : {
            color: "#fff",
            "text-outline-color" : "#000",
            "text-outline-width" : "8px",
            "line-color": "#72986a",
            "target-arrow-color" : "#72986a",
            width: 4,
            "transition-property": "line-color",
            "transition-duration": 0.3
        }
    },
    {
        selector : ".pathNode",
        style: {
            backgroundColor: "#72986a",
            "border-color" : "#008000",
            color: "#fff",
            "transition-property": "background-color",
            "transition-duration" : 0.3,
            "transition-delay" : 1,
            "transition-timing-function": "ease-in-out-quint",
        }
    },
    {
        selector : ".invalidState",
        style: {
        backgroundColor: "#B71C1C",
        "border-color" : "#B71C1C",
        color: "#fff",
        "transition-property": "background-color",
        "transition-duration": 0.3
       }
    },
    {
        selector : ".invalidPath",
        style: {
            color: "#fff",
            "text-outline-color" : "#000",
            "text-outline-width" : "4px",
            "line-color": "#B71C1C",
            "target-arrow-color" : "#B71C1C",
            width: 4,
            "transition-property": "line-color",
            "transition-duration": 0.3
        }
    },
    {
        selector : ".selectedNode",
        style: {
            backgroundColor : "#7f22fe",
            color: "#fff",
            
        }
    },
    {
        selector : ".selectedEdge",
        style: {
            color: "#fff",
            "text-outline-color" : "#000",
            "text-outline-width" : "4px",
            "line-color": "#7f22fe",
            "target-arrow-color" : "#7f22fe",
            width: 4,
            "transition-property": "line-color",
            "transition-duration": 0.3
        }
    },
]