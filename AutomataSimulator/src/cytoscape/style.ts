import { StylesheetStyle } from "cytoscape";

export const styleSheet : Array<StylesheetStyle> = [
    {
        selector: "node",
        style: {
          backgroundColor: "#fff",
          color: "#000",
          width: 60,
          height: 60,
          "font-size": "30px",
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
            "font-size": "30px",
        }
    },
    {
        selector : ".initial",
        style : {
            color: "#fff",
            shape: "ellipse",
            backgroundColor: "#008000"
        }
    },
    {
        selector : "#initial_arrow",
        style: {
            shape : "tag",
            width: 20,
            height: 30,
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
            color: "#72986a",
            "line-color": "#72986a",
            "target-arrow-color" : "#72986a"
        }
    },
    {
        selector : ".pathNode",
        style: {
            backgroundColor: "#72986a",
            "border-color" : "#008000",
            color: "#fff"
        }
    },
    {
        selector : ".invalidState",
       style: {
        backgroundColor: "#FF9494",
        "border-color" : "#FF9494",
        color: "#fff"
       }
    }
]