import Header from "../ui/Header";
import { useEffect, useState } from "react";
import { inputStringType } from "../types/AutomatonTypes";
import InputSimulator from "../ui/InputSimulator";
import FAVisualizer from "../ui/FAVisualizer";
import { ElementDefinition } from "cytoscape";
import { getAllCombinations } from "../utils/combinatorics";
import { generateFAElements } from "../utils/state_generator";
import { getValidString } from "../utils/Validators";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { getAllCharacterFromMax } from "../utils/sets";
import clsx from "clsx";

const LandingPage = () => {
  const [inputString, setInputString] = useState<Array<inputStringType>>([]);

  const [validUserInput, setValidUserInput] = useState<Array<string>>([]);

  const [elements, setElements] = useState<{
    states: Array<ElementDefinition>;
    transitions: Array<ElementDefinition>;
  }>({ states: [], transitions: [] });

  const [combinations, setCombinations] = useState<Array<string>>([]);

  const [isFullModel, setIsFullModel] = useState<boolean>(false);

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
        <div className="bg-slate-800 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="bg-slate-600 px-5 flex items-center text-white py-2 gap-5 ">
            <button
              type="button"
              className={clsx(
                "rounded-2xl   px-2 font-display min-w-[150px] transition-colors cursor-pall hover:scale-105 ease-in-out duration-300",
                isFullModel
                  ? "bg-primary text-white"
                  : "bg-slate-300 text-black"
              )}
              onClick={() => setIsFullModel(!isFullModel)}
            >
              Full Model
            </button>
            <button
              type="button"
              className="rounded-2xl bg-slate-300 text-black px-2 font-display min-w-[150px] transition-all hover:scale-105 ease-in-out duration-300"
            >
              Auto Trace
            </button>
            <button
              type="button"
              className="rounded-2xl bg-slate-300 text-black px-2 font-display min-w-[150px] transition-all hover:scale-105 ease-in-out duration-300"
            >
              Focus to Current
            </button>
            <button
              type="button"
              className="rounded-2xl bg-slate-300 text-black px-2 font-display min-w-[150px] transition-all hover:scale-105 ease-in-out duration-300"
            >
              Zoom to View
            </button>
          </div>
          <FAVisualizer
            inputString={inputString}
            userInput={validUserInput}
            states={elements.states}
            transistions={elements.transitions}
          />
          <div className="bg-slate-600 px-10 flex items-center text-white gap-5 justify-center py-2">
            <button className="hover:scale-125 transition-transform ease-in-out duration-500">
              <ChevronLeft />
            </button>
            <button className="hover:scale-125 transition-transform ease-in-out duration-500">
              <Play />
            </button>
            <button className="hover:scale-125 transition-transform ease-in-out duration-500">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
