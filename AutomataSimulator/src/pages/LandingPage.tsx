import Header from "../ui/Header";
import { useState } from "react";
import { inputStringType } from "../types/AutomatonTypes";
import InputSimulator from "../ui/InputSimulator";

const LandingPage = () => {
  const [inputString, setInputString] = useState<Array<inputStringType>>([]);
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

    setInputString(inputStrings);
  };

  return (
    <div className="bg-background h-screen w-screen flex flex-col gap-5">
      <Header />
      <InputSimulator
        handle_input_change={handle_input_change}
        inputString={inputString}
      />
    </div>
  );
};

export default LandingPage;
