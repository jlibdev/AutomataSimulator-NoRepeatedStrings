import Header from "../ui/Header";
import { useState } from "react";
import Input from "../components/Input";
import { inputStringType } from "../types/AutomatonTypes";
import clsx from "clsx";

const LandingPage = () => {
  const [inputString, setInputString] = useState<Array<inputStringType>>();

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
      <div className="flex flex-col items-center gap-2">
        <Input
          placeholder="Enter string [0-9]"
          type="number"
          min="0"
          max="9"
          className="min-w-2xl"
          onChange={(e) => handle_input_change(e.target.value)}
        />
        <section className="flex">
          {inputString?.map((character) => (
            <span
              className={clsx(
                character.is_repeated && "text-red-600 scale-110 font-bold"
              )}
            >
              {character.input}
            </span>
          ))}
        </section>
        <section>
            
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
