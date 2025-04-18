import { TypographyH1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { getRepeatingCharacters } from "@/utils/Validators";
import { useEffect, useState } from "react";

interface OutputSimulatorProps {
  inputString: string;
  isValidInput: boolean;
}
const OutputSimulator = ({
  inputString,
  isValidInput,
}: OutputSimulatorProps) => {
  const [inputArray, setInputArray] = useState<Array<string>>([]);

  const [repeating, setRepeating] = useState<Array<string>>([]);

  useEffect(() => {
    setInputArray(inputString.split(""));
    setRepeating(getRepeatingCharacters(inputString));
  }, [inputString]);

  return (
    <div className=" w-full flex items-center text-2xl flex-col gap-5 p-10">
      <TypographyH1
        className={cn(
          "transition-all",
          isValidInput ? "text-red-500" : "text-green-500"
        )}
      >
        {isValidInput ? "INVALID" : "VALID"}
      </TypographyH1>
      <div
        className={cn(
          "flex gap-2 w-full flex-wrap justify-center items-end",
          isValidInput ? "text-black" : "text-green-500"
        )}
      >
        {inputArray.map((character, index) => (
          <TypographyH1
            key={index}
            className={cn(
              "transition-all",
              repeating.includes(character) && "text-red-500 mb-2"
            )}
          >
            {character}
          </TypographyH1>
        ))}
        {inputArray.length == 0 && (
          <TypographyH1 className="text-green-400">EMPTY STRING</TypographyH1>
        )}
      </div>
    </div>
  );
};

export default OutputSimulator;
