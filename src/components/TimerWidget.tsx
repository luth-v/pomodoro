import { useTimer } from "@/contexts/timer";
import { Button } from "./Button";

export function TimerWidget() {
  const timerContext = useTimer();

  return (
    <div className="flex flex-col gap-4 text-neutral-400 text-lg">
      <Button
        className="p-2 py-3 rounded-lg"
        data-testid="timer-increment-button"
        data-value="30"
        onClick={() => timerContext.handleIncrementTimer(30)}
      >
        +0:30
      </Button>
      <Button
        className="p-2 py-3 rounded-lg"
        data-testid="timer-increment-button"
        data-value="60"
        onClick={() => timerContext.handleIncrementTimer(60)}
      >
        +1:00
      </Button>
      <Button
        className="p-2 py-3 rounded-lg"
        data-testid="timer-increment-button"
        data-value="300"
        onClick={() => timerContext.handleIncrementTimer(300)}
      >
        +5:00
      </Button>
    </div>
  );
}
