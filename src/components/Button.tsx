import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function Button({ onClick, className, children, ...props }: ButtonProp) {
  return (
    <button
      className={cn(
        "p-6 border border-neutral-800 hover:bg-neutral-800",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
