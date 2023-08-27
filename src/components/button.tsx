import { ButtonHTMLAttributes, ReactNode } from "react";

import { overrideTailwindClasses } from "tailwind-override";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...rest
}: IButtonProps) {
  return (
    <button
      className={`flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm leading-[14px] bg-zinc-600 text-400 hover:brightness-50 duration-300 ${overrideTailwindClasses(
        className,
      )}`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
