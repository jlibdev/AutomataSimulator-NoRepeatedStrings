import { Core } from "cytoscape";

export function getPath(cy : Core | null,userInput: string, targetNode : string){
    if (!cy) return [];

    let isTargetReached = false

    const paths = ['initial'];

    const labels : Array<string> = ['q0'];

    let current_index = 0

    cy.nodes().forEach((node) => {
        if (node.id() == targetNode){
            isTargetReached = true
        }
        if(!isTargetReached){
        const outgoingEdges = node.outgoers('edge');
        
        outgoingEdges.forEach((edge) => {
        const label = edge.data().label;
        const sourceId = edge.source().id();
      
        if (
            label === userInput.charAt(current_index) &&
            sourceId === paths[current_index]
          ) {
            paths.push(edge.target().id());
            labels.push(edge.target().data().label)
            current_index++;
          }
        });
        }
      });
      
    return labels;
}