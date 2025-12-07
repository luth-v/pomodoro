import { DEFAULT_TIMER, SUBTRACTOR } from "@/constants";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

interface TimerContextType {
  timer: number;
  countdown: number;
  countdownState: "idle" | "running" | "pause" | "finish";
  intervalRef: RefObject<NodeJS.Timeout | null>;
  progress: number;

  startCountdown: () => void;
  pauseCountdown: () => void;
  resetCountdown: () => void;
  handleSetTimer: (value: number) => void;
  handleIncrementTimer: (increment: number) => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [countdown, setCountdown] = useState<number>(timer);
  const [countdownState, setCountdownState] = useState<
    "idle" | "running" | "pause" | "finish"
  >("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progress = countdown / timer;

  const startCountdown = () => {
    if (countdownState === "running") return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev * 1000 - SUBTRACTOR;
        if (newCountdown <= 0) {
          finishCountdown();
          return 0;
        }
        return parseFloat("" + newCountdown) / 1000;
      });
    }, SUBTRACTOR);

    intervalRef.current = interval;
    setCountdownState("running");
  };

  const pauseCountdown = () => {
    clearInterval(intervalRef.current!);
    setCountdownState("pause");
  };

  const finishCountdown = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setCountdownState("finish");
  };

  const resetCountdown = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setCountdown(timer);
    setCountdownState("idle");
  };

  const handleSetTimer = (value: number) => {
    if (countdownState === "pause" && value === timer) return;

    resetCountdown();
    setTimer(value);
    setCountdown(value);
  };

  const handleIncrementTimer = (increment: number) => {
    setTimer((prev) => prev + increment);
    setCountdown((prev) => prev + increment);
  };

  const value: TimerContextType = {
    timer,
    countdown,
    countdownState,
    intervalRef,
    progress,

    startCountdown,
    pauseCountdown,
    resetCountdown,
    handleSetTimer,
    handleIncrementTimer,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be used within a TimerProvider");
  return context;
}
