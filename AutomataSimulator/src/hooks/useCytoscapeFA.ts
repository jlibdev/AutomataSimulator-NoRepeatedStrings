import { styleSheet } from "@/cytoscape/style";
import cytoscape, { Core, ElementDefinition } from "cytoscape";
import { useEffect, useRef } from "react";

interface useCytoscapeFATypes {
    containerRef: React.RefObject<HTMLDivElement | null>,
    states: ElementDefinition[],
    transitions: ElementDefinition[],
    layoutName: "preset"| "circle" | "concentric" | "cose" | "grid" | "random",
    handleNodeSelect : (id : string , label: string) => void
}

export const useCytoscapeFA = (
   { containerRef,
    states,
    transitions,
    layoutName = "preset",
    handleNodeSelect
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
          const node = evt.target;
          handleNodeSelect(node.data().id , node.data().label)
        });

        cy.on("drag", "node", function (evt) {
          const node = evt.target;
    
          if (node.id() == "initial") {
            cy.getElementById("initial_arrow").position({
              x: node.position().x - 45,
              y: node.position().y,
            });
          }
        });

        return () => cy.destroy();
    },[])
   
    return instanceRef;
    }