import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface AutomataSelectorProps {
  selectedAutomata: string;
  setSelectedAutomata: Dispatch<SetStateAction<string>>;
}
const AutomataSelector = ({
  selectedAutomata,
  setSelectedAutomata,
}: AutomataSelectorProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Select
        onValueChange={(value) => setSelectedAutomata(value)}
        defaultValue="norepeatingcharacter"
        value={selectedAutomata}
      >
        <SelectTrigger className="w-full mt-2 border-none">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="No Repeating Character">
            {"No Repeating Character [0-9]"}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AutomataSelector;
