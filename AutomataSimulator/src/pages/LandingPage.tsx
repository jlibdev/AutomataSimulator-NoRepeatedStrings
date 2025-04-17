import Header from "../ui/Header";
import { useEffect, useState } from "react";
import { inputStringType } from "../types/AutomatonTypes";
import InputSimulator from "../ui/InputSimulator";
import FAVisualizer from "../ui/FAVisualizer";
import { ElementDefinition } from "cytoscape";
import { getAllCombinations } from "../utils/combinatorics";
import { generateFAElements } from "../utils/state_generator";
import { getValidString } from "../utils/Validators";

const LandingPage = () => {
  const [inputString, setInputString] = useState<Array<inputStringType>>([]);
  const [validUserInput, setValidUserInput] = useState<Array<string>>([]);
  const [elements, setElements] = useState<{
    states: Array<ElementDefinition>;
    transitions: Array<ElementDefinition>;
  }>({ states: [], transitions: [] });
  const [combinations, setCombinations] = useState<Array<string>>([]);

  const handle_input_change = (value: string) => {
    const stringArray = value.split("");

    const validInput = getValidString(stringArray);

    setValidUserInput(validInput);

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
      <div className="flex flex-col w-full h-full p-5">
        <div className="bg-slate-800 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="bg-slate-600 px-10 flex items-center h-[5%] text-white">
            Hello
          </div>
          <FAVisualizer
            inputString = {inputString}
            userInput={validUserInput}
            states={elements.states}
            transistions={elements.transitions}
          />
          <div className="bg-slate-600 px-10 flex items-center h-[5%] text-white">
            Hello
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
