import { ElementDefinition } from "cytoscape";
import { isSubset, stringDifference } from "./sets";

export function normalizeElementPositions(states: Array<ElementDefinition>) {
  let prev_len = 0;
  let current_y = 0;
  let current_x = 0;

  const positions = states.map(state => state.position?.y).filter((y): y is number => y !== undefined);

  if (positions.length === 0) return;

  const maxY = Math.max(...positions);

  const uniqueXPositions = Array.from(new Set(states.map(state => state.position?.x).filter(x => x !== undefined)));
  const maxX = uniqueXPositions.length > 0 ? Math.max(...uniqueXPositions) : 0;


  const x_increment = maxX ? maxX / (uniqueXPositions.length + 1) : 0;

  states.forEach((state) => {
    if (!state.position) return;

    const idLength = state.data?.id?.length ?? 1;

    if (state.data.id === "initial") {
      state.position.y = maxY / 2;
      return;
    }

    if (prev_len !== idLength) {
      const countSameLength = states.filter(s => s.data?.id?.length === idLength).length;
      const y_increment = maxY / (countSameLength + 1);
      current_y = y_increment;
    }

    state.position.y = current_y;
    if(state.data.id != "initial_arrow"){
      state.position.x = current_x;
    }
    

    current_x += x_increment;

    current_y += maxY / (states.filter(s => s.data?.id?.length === idLength).length + 1);

    prev_len = idLength;
  });
}

  


export function generateFAElements(combinations : Array<string>){
  // Initial state spacing
    const pos_increment = 1000;
    
    let x_pos = 0;
    let y_pos = 0; 
    let prev_len = 0;

    // List of states , the initial state is already initialized, and additonal state of arrow that points to the initial state

    // id : unique identifier for the node , will use the combination for that node
    // position : coordinates of placement in graph
    // classes : Styles that will be added to this node
    let states: Array<ElementDefinition> = [
      {
        data: {id: "initial", label : "q0"},
        position : {x: 0, y : 0}, 
        classes: "initial final"
      },
      {
        data : {id: "initial_arrow"}, position : {x: -155 , y: 0}, grabbable : false
      }
     ]

    //  Initialize transitions list
    let transitions: Array<ElementDefinition> = []

    // Iterate over all the combinations
    combinations.forEach((state, index)=>{

      // X layering of each node with specific length
      // Eg . all nodes with combination of len 1 (0,1,2...etc) will be on one layer and (01,02,03...) will be on another
        if (prev_len !== state.length) { 
            x_pos += pos_increment;
            y_pos = 0;
        }

        // Add the state to the states array
        // id : combination string
        // label q + current index + 1
        // position will be the positions value
        // classes : since in this model all states are final then class of final is also added
        states.push({data:{ id: state , label: "q" + (index+1)} , position: {x: x_pos, y: y_pos}, classes: "final"})

        if(state.length === 1){
          // if the lenth of the combination is one then it is the first layer that the initial state connects to
          // adds transition that has source node of initial state 
          // target node that is the current state/node
          // and label of first and only character of this state in this iteration which is 0 or 1 or 2 or .... 9
            transitions.push({data : {id : "initial" + " - " + state, source: "initial" , target: state , label: state.charAt(state.length - 1)}})
        }else{
          // This is for combination of len > 1
          // Layers : From the combinations , get all combination with len that is less than 1 of current combination len
          // e.g if current combination is 012 then it will get combinations 01 02 and 12
            const layers = combinations.filter((combination)=>(combination.length == state.length -1))

          // Iterates over the layers
            layers.forEach(layer=>{
              // then if the layer is a subset of the current state then we add it to the transiton array
              // Source : layer
              // target : current combination / state
              // label/input : the string difference between state and layer
                // e.g: 012
                // 012 - 01  : input/label = 2
                // 012 - 02 : input/label =  1
                // 0123 - 12 : input/label = 0 
                if(isSubset(layer, state)){
                    transitions.push({data : {id : layer + " - " + state , source: layer , target: state , label: stringDifference(state, layer)}})
                }
            })
        }

        y_pos += pos_increment
        prev_len = state.length

    })

    // Normalizes the positions so that X and Y spacing is relatively equal
    normalizeElementPositions(states)

    return {states : states , transitions : transitions};
}
