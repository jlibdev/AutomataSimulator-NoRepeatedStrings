import Header from "../ui/Header";
import { useEffect, useState } from "react";
import { inputStringType } from "../types/AutomatonTypes";
import InputSimulator from "../ui/InputSimulator";
import FAVisualizer from "../ui/FAVisualizer";
import { ElementDefinition } from "cytoscape";
import { getAllCombinations } from "../utils/combinatorics";
import { generateFAElements } from "../utils/state_generator";
import { getValidString } from "../utils/Validators";
import { getAllCharacterFromMax } from "../utils/sets";

const LandingPage = () => {
  const [inputString, setInputString] = useState<Array<inputStringType>>([]);

  const [validUserInput, setValidUserInput] = useState<Array<string>>([]);

  const [elements, setElements] = useState<{
    states: Array<ElementDefinition>;
    transitions: Array<ElementDefinition>;
  }>({ states: [], transitions: [] });

  const [combinations, setCombinations] = useState<Array<string>>([]);

  const [isFullModel, setIsFullModel] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [isFocusing, setIsFocusing] = useState<boolean>(false);

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

    if (!isFullModel) {
      setCombinations(
        getAllCombinations(getAllCharacterFromMax([...new Set(value)].join("")))
      );
    }
    setInputString(inputStrings);
  };

  useEffect(() => {
    setElements(generateFAElements(combinations));
  }, [inputString, isFullModel]);

  useEffect(() => {
    setCombinations(getAllCombinations(getAllCharacterFromMax("09")));
  }, [isFullModel]);

  return (
    <div className="bg-background h-screen w-screen flex flex-col gap-5">
      <Header />
      <InputSimulator
        handle_input_change={handle_input_change}
        inputString={inputString}
      />
      <div className="flex flex-col w-full h-full p-5">
        <h1 className="font-display font-bold text-2xl">Visualization</h1>
        <FAVisualizer
          isFullModel={isFullModel}
          setIsFullModel={setIsFullModel}
          inputString={inputString}
          userInput={validUserInput}
          states={elements.states}
          transistions={elements.transitions}
        />
      </div>
    </div>
  );
};

export default LandingPage;
