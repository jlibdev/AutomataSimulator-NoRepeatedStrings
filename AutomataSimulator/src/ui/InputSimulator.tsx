import Input from "../components/Input";
import clsx from "clsx";
import { Check, X } from "lucide-react";
import { inputStringType } from "../types/AutomatonTypes";

const InputSimulator = ({
  inputString,
  handle_input_change,
}: {
  inputString: Array<inputStringType>;
  handle_input_change: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Input
        placeholder="Enter string [0-9]"
        type="number"
        min="0"
        className="min-w-2xl"
        step="1"
        onKeyDown={(e) => {
          if ([".", "e", "+", "-"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => handle_input_change(e.target.value)}
      />

      <section className="flex gap-2">
        {inputString?.map((character) => (
          <span
            className={clsx(
              "text-xl",
              character.is_repeated && "text-red-600 scale-110 font-bold"
            )}
          >
            {character.input}
          </span>
        ))}
      </section>
      <section>
        {inputString?.some((inputs) => inputs.is_repeated == true) ? (
          <section className="flex items-center gap-2">
            <section className="bg-red-500 rounded-full p-1 w-fit">
              <X color="white" />
            </section>
            <span className="text-text font-bold">STRING REJECTED</span>
          </section>
        ) : (
          <section className="flex items-center gap-2">
            <section
              className={clsx(
                "bg-green-600 rounded-full p-1 w-fit",
                (inputString ?? "").length == 0 && "bg-lime-500"
              )}
            >
              <Check color="white" />
            </section>
            <span className="text-text font-bold">
              {(inputString ?? "").length > 0
                ? "STRING ACCEPTED"
                : "STRING ACCEPTED : EMPTY"}
            </span>
          </section>
        )}
      </section>
    </div>
  );
};

export default InputSimulator;
