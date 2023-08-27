import { TextareaHTMLAttributes, useEffect, useRef } from "react";

import { useField } from "@unform/core";
import { overrideTailwindClasses } from "tailwind-override";

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  containerClassName?: string;
}

export default function Textarea({
  label,
  name,
  containerClassName = "",
  className,
  ...rest
}: ITextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { defaultValue, error, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <div
      className={`flex w-full flex-col ${overrideTailwindClasses(
        containerClassName,
      )}`}
    >
      <label htmlFor={fieldName}>{label}</label>
      <textarea
        ref={textareaRef}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
        className={`flex w-full flex-col h-10 min-h-[4rem] items-center rounded-lg border border-solid border-zinc-300 bg-white p-1 px-2 text-xs leading-normal text-zinc-900 transition placeholder:text-sm placeholder:leading-normal hover:border-zinc-400 focus:border-primary disabled:opacity-60 disabled:hover:border-none disabled:focus:border-none disabled:resize-none ${overrideTailwindClasses(`
        ${className} ${error ? "border-error" : ""}`)}`}
        {...rest}
      />

      {error && <span className="text-error mt-1 font-medium">{error}</span>}
    </div>
  );
}
