import { ElementDefinition } from "cytoscape";
import { isSubset, stringDifference } from "./sets";

export function generateFAElements(combinations : Array<string>){
    const pos_increment = 100;
    let x_pos = 0;
    let y_pos = 0; 
    let prev_len = 0;
    let states: Array<ElementDefinition> = [{data: {id: "initial", label : "q0", state: "initial"}, position : {x: 0, y : 0}}]

    let transitions: Array<ElementDefinition> = []

    combinations.forEach((state, index)=>{

        if (prev_len !== state.length) {
            x_pos += pos_increment;
            y_pos = 0;
        }

        states.push({data:{ id: state , label: "q" + (index+1), state: "final"},position: {x: x_pos, y: y_pos}})

        if(state.length === 1){
            transitions.push({data : {source: "initial" , target: state , label:  state.charAt(state.length - 1)}})
        }else{
            const layers = combinations.filter((combination)=>(combination.length == state.length -1))

            layers.forEach(layer=>{
                if(isSubset(layer, state)){
                    console.log(layer , state , stringDifference(layer, state))
                    transitions.push({data : {source: layer , target: state , label: stringDifference(state, layer)}})
                }
            })
        }

        y_pos += pos_increment
        prev_len = state.length
    })

    return [...states, ...transitions];
}
