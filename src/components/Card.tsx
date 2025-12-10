import { cn } from "@/utils/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-4xl p-4 bg-linear-150 from-background from-60% to-foreground neumorphic-out",
        className
      )}
    >
      {children}
    </div>
  );
}
