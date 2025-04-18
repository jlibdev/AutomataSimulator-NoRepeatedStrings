import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyMuted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

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
  return (
    <section className="flex flex-col gap-2">
      <Label htmlFor="userInput">Input String</Label>
      <section className="grid grid-cols-6 gap-2">
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
        <Button variant={"ghost"} onClick={() => setUserInput("")}>
          Clear
        </Button>
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
      </section>
    </section>
  );
};

export default NoRepeatingChracterAutomaton;
