import clsx from "clsx";
import { InputHTMLAttributes } from "react";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={clsx(
        "border px-4 py-2 rounded-2xl border-secondary text-sm focus:ring-accent focus:border-accent",
        className
      )}
    />
  );
};

export default Input;
