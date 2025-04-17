import { ElementDefinition } from "cytoscape";


export function generateFAElements(combinations : Array<string>){
    let elements: Array<ElementDefinition> = [{data: {id: "initial", label : "q0", state: "initial"}, position : {x: 0, y : 0}}]

    let x = 50;
    let y = 50;
    combinations.forEach((state, index)=>{
        elements.push({data:{ id: state , label: "q" + (index+1), state: "final"},position: {x: x, y: y}})
        x+=50
        y+=50
    })

    return elements;
}
