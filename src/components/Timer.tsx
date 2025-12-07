import { CountdownCircle } from "./CountdownCircle";
import { TimeInput } from "./TimeInput";
import { Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";
import { useTimer } from "@/contexts/timer";
import { useEffect, useState } from "react";
import { secondsToTime } from "@/utils/strings";

export function Timer() {
  const timerContext = useTimer();
  const [displayValue, setDisplayValue] = useState(
    secondsToTime(timerContext.timer)
  );

  useEffect(() => {
    let newDisplayValue = Math.ceil(timerContext.countdown);
    if (timerContext.countdownState === "idle") {
      newDisplayValue = timerContext.timer;
    }
    setDisplayValue(secondsToTime(newDisplayValue));
  }, [timerContext.timer, timerContext.countdown, timerContext.countdownState]);

  return (
    <div>
      <div className="aspect-square flex justify-center items-center relative">
        <CountdownCircle
          className={cn({
            "stroke-red-900": timerContext.countdownState === "running",
            "stroke-amber-800": timerContext.countdownState === "pause",
            "fill-black/20": timerContext.countdownState === "finish",
          })}
          progress={timerContext.progress}
        />
        <div className="relative flex flex-col justify-center items-center z-10">
          <TimeInput
            displayValue={displayValue}
            className={cn({
              "text-amber-700": timerContext.countdownState === "pause",
              "text-red-900": timerContext.countdownState === "finish",
            })}
            defaultValue={timerContext.timer}
            onChange={timerContext.handleSetTimer}
            onFocus={
              timerContext.countdownState === "running"
                ? timerContext.pauseCountdown
                : undefined
            }
          />
          <div className="absolute top-40 flex gap-8">
            {timerContext.countdownState === "idle" ? (
              <StartButton onClick={timerContext.startCountdown} />
            ) : timerContext.countdownState === "finish" ? (
              <ResetButton onClick={timerContext.resetCountdown} />
            ) : timerContext.countdownState === "pause" ? (
              <>
                <StartButton onClick={timerContext.startCountdown} />
                <ResetButton onClick={timerContext.resetCountdown} />
              </>
            ) : (
              <>
                <PauseButton onClick={timerContext.pauseCountdown} />
                <ResetButton onClick={timerContext.resetCountdown} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const StartButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    className="p-6 rounded-full"
    onClick={onClick}
    data-testid="start-button"
  >
    <Play className="w-6 h-6" />
  </Button>
);

const ResetButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    className="p-6 rounded-full"
    onClick={onClick}
    data-testid="reset-button"
  >
    <RotateCcw className="w-6 h-6" />
  </Button>
);

const PauseButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    className="p-6 rounded-full"
    onClick={onClick}
    data-testid="pause-button"
  >
    <Pause className="w-6 h-6" />
  </Button>
);
