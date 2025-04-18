import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="shadow-sm p-2 flex justify-around items-center">
      <title>Automaton Simulator</title>
      <section id="web_name" className="flex flex-col">
        <h1 className="text-text font-bold">AUTOMATON SIMULATOR</h1>
        <p className="text-primary text-sm">
          Strings with no repeated character
        </p>
      </section>
      <section id="actions" className="flex gap-5">
        <Button>Enter</Button>
        <Button>Enter</Button>
        <Button>Enter</Button>
        <Button>Enter</Button>
        <Button>Enter</Button>
        <Button>Enter</Button>
      </section>
    </header>
  );
};

export default Header;
