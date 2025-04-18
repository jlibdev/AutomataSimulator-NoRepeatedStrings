import { TypographyH1 } from "@/components/ui/typography";
import Header from "@/ui/Header";
import NoRepeatingChracterAutomaton from "@/ui/NoRepeatingCharacterAutomaton";
import OutputSimulator from "@/ui/OutputSimulator";
import { isStringValid } from "@/utils/Validators";
import { useEffect, useState } from "react";

const HomePage = () => {
  // States
  const [userInput, setUserInput] = useState<string>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [outputToggle, setOutputToggle] = useState<boolean>(true);

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  useEffect(() => {
    setIsValidInput(isStringValid(userInput));
  }, [userInput]);

  return (
    <div className="h-screen w-screen">
      <Header outputToggle={outputToggle} setOutputToggle={setOutputToggle} />
      <div className="w-full h-[93%] grid grid-cols-2 items-center">
        <div className="flex flex-col gap-2 p-10 border-r justify-center">
          <TypographyH1 className="lg:text-2xl text-2xl">
            {"STRINGS WITH NO REPEATING CHARACTERS"}
          </TypographyH1>
          <NoRepeatingChracterAutomaton
            handleInputChange={handleInputChange}
            isValidInput={isValidInput}
            setUserInput={setUserInput}
            userInput={userInput}
          />
        </div>
        <OutputSimulator
          inputString={userInput}
          isValidInput={isValidInput}
        ></OutputSimulator>
      </div>
    </div>
  );
};

export default HomePage;
