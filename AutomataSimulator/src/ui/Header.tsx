import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { AutomatonActionProps } from "./AutomatonAction";

interface HeaderProps extends AutomatonActionProps {}

const Header = ({}: HeaderProps) => {
  return (
    <header className="shadow-sm flex justify-around h-[10%] md:h-[7%] items-center">
      <title>Automaton Simulator</title>
      <section className="w-fit">
        <TypographyH1 className="lg:text-2xl text-2xl">
          Automaton Simulator
        </TypographyH1>
        <TypographyH2 className="text-muted-foreground text-sm flex justify-between border-none">
          <span className="text-primary">Automata project</span>
          <span>BETA</span>
        </TypographyH2>
      </section>
      <section className="w-fit flex justify-center items-center"></section>
    </header>
  );
};

export default Header;
