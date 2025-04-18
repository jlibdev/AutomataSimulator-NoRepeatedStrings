import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import NoRepeatingChracterAutomaton from "@/ui/NoRepeatingCharacterAutomaton";
import { isStringValid } from "@/utils/Validators";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(true);

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  useEffect(() => {
    setIsValidInput(isStringValid(userInput));
  }, [userInput]);

  return (
    <div className="flex flex-col items-center w-screen h-screen justify-between gap-5 mt-5">
      <div className="flex flex-col">
        <TypographyH1>Automaton Simulator</TypographyH1>
        <TypographyH2 className="text-muted-foreground text-sm flex justify-between">
          <span>Automata project</span>
          <span>BETA</span>
        </TypographyH2>
      </div>
      <div className="flex flex-col gap-5 min-w-[500px] h-full justify-center">
        <NoRepeatingChracterAutomaton
          handleInputChange={handleInputChange}
          isValidInput={isValidInput}
          setUserInput={setUserInput}
          userInput={userInput}
        />
      </div>
    </div>
  );
};

export default HomePage;
