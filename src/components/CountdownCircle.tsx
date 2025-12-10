/**
 * A circular progress indicator
 *
 * @param progress - Progress value between 0 and 1
 * - 0 = empty circle (no progress)
 * - 1 = full circle (100% progress)
 */

import { CIRCLE_RADIUS } from "@/constants";
import { cn } from "@/utils/cn";

interface CountdownCircleProp {
  progress: number;
  glow?: boolean;
  className?: string;
}

export function CountdownCircle({
  progress,
  glow = false,
  className = "",
}: CountdownCircleProp) {
  const radius = CIRCLE_RADIUS;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const offset = circumference - circumference * clampedProgress;

  return (
    <svg
      className="absolute -rotate-90 rotate-x-180"
      viewBox="0 0 100 100"
      data-testid="countdown-circle"
    >
      {glow && (
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeLinecap="round"
        className={cn("stroke-neutral-900 stroke-1")}
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={cn("stroke-neutral-900 stroke-1", className)}
        filter="url(#glow)"
      />
    </svg>
  );
}
