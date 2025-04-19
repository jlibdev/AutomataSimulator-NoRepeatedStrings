import { Core } from "cytoscape";

export function getPath(cy : Core | null,userInput: string, targetNode : string){
  // Return an empty array if there is no valid instance of the cytoscape ref
    if (!cy) return [];

    // tag or validator that checks if our target node has been found
    let isTargetReached = false

    // All the paths that we took . Added by default the initial state beause by default we are at the initial state
    const paths = ['initial'];

    // Added the label of the initial state also
    const labels : Array<string> = ['q0'];

    // Track the current index at which character we are at from the inputString
    let current_index = 0

    // Iterates over all the nodes from our model
    cy.nodes().forEach((node) => {
        if (node.id() == targetNode){
            isTargetReached = true
        }
        if(!isTargetReached){

        // Get all the outgoing edges of our node or the edges that points to other edges
        const outgoingEdges = node.outgoers('edge');
        
        // Iterate over the found outgoing edges
        outgoingEdges.forEach((edge) => {
        const label = edge.data().label;
        const sourceId = edge.source().id();
      // Check if the label(signifies the input needed to move from that edge) is equal to the character in the string we are currently at
        if (
            label === userInput.charAt(current_index) &&
            sourceId === paths[current_index]
          ) {
            // If true then add that to the array of paths and labels
            paths.push(edge.target().id());
            labels.push(edge.target().data().label)
            current_index++;
          }
        });
        }
      });
    // Returns that labels
    return labels;
}