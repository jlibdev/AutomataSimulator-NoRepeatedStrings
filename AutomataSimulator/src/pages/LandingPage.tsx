import Header from "../ui/Header";
import { useEffect, useState } from "react";
import { inputStringType } from "../types/AutomatonTypes";
import InputSimulator from "../ui/InputSimulator";
import FAVisualizer from "../ui/FAVisualizer";
import { ElementDefinition } from "cytoscape";
import { getAllCombinations } from "../utils/combinatorics";
import { generateFAElements } from "../utils/state_generator";

const LandingPage = () => {
  const [inputString, setInputString] = useState<Array<inputStringType>>([]);
  const [elements, setElements] = useState<Array<ElementDefinition>>([]);
  const [combinations, setCombinations] = useState<Array<string>>([]);

  const handle_input_change = (value: string) => {
    const stringArray = value.split("");

    const inputStrings: Array<inputStringType> = [];

    stringArray.forEach((stringElement) => {
      inputStrings.push({
        input: stringElement,
        is_repeated: inputStrings.some(
          (string) => string.input == stringElement
        ),
      });
    });

    setCombinations(getAllCombinations([...new Set(value)].join("")));
    setInputString(inputStrings);
  };

  useEffect(() => {
    setElements(generateFAElements(combinations));
  }, [combinations]);

  return (
    <div className="bg-background h-screen w-screen flex flex-col gap-5">
      <Header />
      <InputSimulator
        handle_input_change={handle_input_change}
        inputString={inputString}
      />
      <FAVisualizer elements={elements}></FAVisualizer>
    </div>
  );
};

export default LandingPage;
