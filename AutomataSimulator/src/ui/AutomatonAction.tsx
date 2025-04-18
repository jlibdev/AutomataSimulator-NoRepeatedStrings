import { Toggle } from "@/components/ui/toggle";
import { Dispatch, SetStateAction } from "react";

export interface AutomatonActionProps {
  outputToggle: boolean;
  setOutputToggle: Dispatch<SetStateAction<boolean>>;
}

const AutomatonActions = ({
  outputToggle,
  setOutputToggle,
}: AutomatonActionProps) => {
  return (
    <div className="mt-2">
      <Toggle
        className="min-w-[100px]"
        variant={"outline"}
        onPressedChange={() => setOutputToggle(!outputToggle)}
        pressed={outputToggle}
      >
        Output
      </Toggle>
    </div>
  );
};

export default AutomatonActions;
