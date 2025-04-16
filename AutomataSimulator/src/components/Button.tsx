import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={clsx(
        "bg-primary px-4 py-2 rounded-2xl text-text transition-all ease-in-out hover:ring-accent hover:ring-2",
        className
      )}
    />
  );
};

export default Button;
