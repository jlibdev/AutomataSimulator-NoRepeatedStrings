import { styleSheet } from "@/cytoscape/style";
import cytoscape, { Core, ElementDefinition } from "cytoscape";
import { useEffect, useRef } from "react";

interface useCytoscapeFATypes {
    containerRef: React.RefObject<HTMLDivElement | null>,
    states: ElementDefinition[],
    transitions: ElementDefinition[],
    layoutName: "preset"| "circle" | "concentric" | "cose" | "grid" | "random",
}

export const useCytoscapeFA = (
   { containerRef,
    states,
    transitions,
    layoutName = "preset" 
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
    
          console.log(node);
        });

        return () => cy.destroy();
    },[])
   
    return {cy: instanceRef.current};
    }