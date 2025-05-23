import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import VisualizerSheet from "./VisualizerSheet";

interface NoRepeatingChracterAutomatonProps {
  userInput: string;
  handleInputChange: (value: string) => void;
  isValidInput: boolean;
  setUserInput: Dispatch<SetStateAction<string>>;
}
const NoRepeatingChracterAutomaton = ({
  userInput,
  handleInputChange,
  isValidInput,
  setUserInput,
}: NoRepeatingChracterAutomatonProps) => {
  
  // State for keeping track if the user wants to see the full model
  const [isFullModel, setisFullModel] = useState<boolean>(false);

  return (
    <section className="flex flex-col gap-2 w-full">
      <Label htmlFor="userInput">Input String:</Label>
      <section className="flex flex-col gap-2">
        <Input
          id="userInput"
          placeholder="e.g. 0123456789"
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          type="number"
          maxLength={500}
          onKeyDown={(e) => {
            if ([".", "e", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className={cn(
            "col-span-5",
            isValidInput ? "border-red-500" : "border-green-500"
          )}
        />
        <section className="col-span-5 flex justify-end">
          {isValidInput ? (
            <Label htmlFor="userInput" className="text-red-500">
              Invalid Input
            </Label>
          ) : (
            <Label htmlFor="userInput" className="text-green-500">
              Valid Input
            </Label>
          )}
        </section>
        <section className="flex gap-2 flex-wrap">
          <VisualizerSheet
            userInput={userInput}
            isFullModel={isFullModel}
          ></VisualizerSheet>
          <Button
            onClick={() => setisFullModel(!isFullModel)}
            variant={isFullModel ? "default" : "outline"}
            className="w-full md:w-fit"
          >
            Full Model
          </Button>
          <Button
            variant={isValidInput ? "destructive" : "ghost"}
            onClick={() => setUserInput("")}
            className="w-full md:w-fit"
          >
            Clear
          </Button>
        </section>
      </section>
    </section>
  );
};

export default NoRepeatingChracterAutomaton;
