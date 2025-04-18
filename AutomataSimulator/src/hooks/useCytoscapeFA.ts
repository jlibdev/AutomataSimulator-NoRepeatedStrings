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
        if (!containerRef.current) return;

        if (instanceRef.current) instanceRef.current.destroy();

        const cy = cytoscape({
            container: containerRef.current,
            layout: { name: layoutName },
            elements: [...states, ...transitions],
            style: styleSheet,
          });
      
        instanceRef.current = cy;

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

        cy.on("drag", "node", function (evt) {
          const node = evt.target;
    
          if (node.id() == "initial") {
            cy.getElementById("initial_arrow").position({
              x: node.position().x - 155,
              y: node.position().y,
            });
          }
        });

        return () => cy.destroy();
    },[])
   
    return instanceRef;
    }