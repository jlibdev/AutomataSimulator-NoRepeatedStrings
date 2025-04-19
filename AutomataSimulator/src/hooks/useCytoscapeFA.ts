import { styleSheet } from "@/cytoscape/style";
import cytoscape, { Core, ElementDefinition } from "cytoscape";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface useCytoscapeFATypes {
    containerRef: React.RefObject<HTMLDivElement | null>,
    states: ElementDefinition[],
    transitions: ElementDefinition[],
    layoutName: "preset"| "circle" | "concentric" | "cose" | "grid" | "random",
    setSelectedNode : Dispatch<SetStateAction<string | null>>
}

export const useCytoscapeFA = (
   { containerRef,
    states,
    transitions,
    layoutName = "preset",
    setSelectedNode
  }:useCytoscapeFATypes
  ) =>
    {
    const instanceRef = useRef<Core| null>(null);

    useEffect(()=>{
      // If there is no valid instance of the cytoscape ref div then this will not run
        if (!containerRef.current) return;

      // If instanceRef has already been initialized , then destory old one so that we can store new instance with updates
        if (instanceRef.current) instanceRef.current.destroy();

      // Initializes the cytoscape instance
        const cy = cytoscape({
            container: containerRef.current,
            layout: { name: layoutName },
            elements: [...states, ...transitions],
            style: styleSheet,
          });
      
        instanceRef.current = cy;

        // Node Eevents

        // Onselect of a node add selectedEdge class to outgoing edge of that class as well as selectedNode to target nodes of edges
        cy.on("select", "node", function (evt) {
          const node = evt.target as cytoscape.NodeSingular;
          node.addClass("selectedNode");
          node.outgoers("edge").forEach(edge => {
            const targetNode = edge.target();
            edge.addClass("selectedEdge");
            targetNode.addClass("selectedNode")
          });
          
          setSelectedNode(node.data().id)
        });

        // Unselect event , removes the added classes on select so that the style reverts to normal
        cy.on("unselect", "node", function (evt) {
          const node = evt.target as cytoscape.NodeSingular;;
          node.removeClass("selectedNode");
          node.outgoers("edge").forEach(edge => {
            const targetNode = edge.target();
            edge.removeClass("selectedEdge");
            targetNode.removeClass("selectedNode")
          });

          setSelectedNode(null)
        });


        // Drag event . Cytoscape does not have the initial state indicator so we make our own , this just means that we the position of inital state changes
        // due to being grabbed by user . it will follow it
        cy.on("drag", "node", function (evt) {
          const node = evt.target;
    
          if (node.id() == "initial") {
            cy.getElementById("initial_arrow").position({
              x: node.position().x - 155,
              y: node.position().y,
            });
          }
        });

        // Clean up to prevent memory leaks
        return () => cy.destroy();
    },[])
   
    return instanceRef;
    }