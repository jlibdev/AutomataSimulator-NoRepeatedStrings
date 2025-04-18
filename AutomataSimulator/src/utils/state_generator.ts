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
    const pos_increment = 1000;
    
    let x_pos = 0;
    let y_pos = 0; 
    let prev_len = 0;
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

    let transitions: Array<ElementDefinition> = []

    combinations.forEach((state, index)=>{

        if (prev_len !== state.length) {
            x_pos += pos_increment;
            y_pos = 0;
        }

        states.push({data:{ id: state , label: "q" + (index+1)} , position: {x: x_pos, y: y_pos}, classes: "final"})

        if(state.length === 1){
            transitions.push({data : {id : "initial" + " - " + state, source: "initial" , target: state , label: state.charAt(state.length - 1)}})
        }else{
            const layers = combinations.filter((combination)=>(combination.length == state.length -1))

            layers.forEach(layer=>{
                if(isSubset(layer, state)){
                    transitions.push({data : {id : layer + " - " + state , source: layer , target: state , label: stringDifference(state, layer)}})
                }
            })
        }

        y_pos += pos_increment
        prev_len = state.length

    })


    normalizeElementPositions(states)

    return {states : states , transitions : transitions};
}
