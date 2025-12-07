import { cn } from "@/utils/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("bg-foreground rounded-lg p-4", className)}>
      {children}
    </div>
  );
}
