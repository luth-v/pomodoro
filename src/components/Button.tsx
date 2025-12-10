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
      className={cn("p-6 hover:bg-white/2 neumorphic-out-sm", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
