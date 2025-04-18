import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import VisualizerContent, { VisualizerContentProps } from "./VisualizerContent";

interface VisualizerSheetProps extends VisualizerContentProps {
  isFullModel : boolean
}

const VisualizerSheet = ({ userInput, isFullModel }: VisualizerSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"default"}>Visualizer</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>VISUALIZER</SheetTitle>
          <SheetDescription>
            Model Visualizer for language : "String with no repeating charaters"
          </SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <VisualizerContent userInput={userInput} isFullModel={isFullModel}></VisualizerContent>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <section className="flex w-full justify-end">
              <Button type="submit">Done</Button>
            </section>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default VisualizerSheet;
