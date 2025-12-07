import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { formatTime, timeToSeconds } from "@/utils/strings";
import { cn } from "@/utils/cn";
import { NAVIGATION_KEYS } from "@/constants";

interface TimeInputProp {
  displayValue: string;
  defaultValue?: number;
  className?: string;
  onChange?: (seconds: number) => void;
  onFocus?: () => void;
}

export function TimeInput({
  displayValue,
  defaultValue = 0,
  className = "",
  onChange = () => {},
  onFocus,
}: TimeInputProp) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [hiddenValue, setHiddenValue] = useState<number>(defaultValue);
  const [previewValue, setPreviewValue] = useState<number | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const numericString = e.target.value.replace(/[^\d]/g, "") ?? 0;
    const numericValue =
      numericString.length > 6 ? +numericString.slice(-6) : +numericString;

    setHiddenValue(numericValue);
    setPreviewValue(numericValue);
    inputRef.current!.value = "" + numericValue;
  };

  const handleFocus = () => {
    if (onFocus) onFocus();
    inputRef.current!.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (inputRef.current!.value !== "") {
      inputRef.current!.value = "";
    }
    setIsFocused(false);
  };

  const updateCursorPositionToLast = (e: KeyboardEvent<HTMLInputElement>) => {
    if (NAVIGATION_KEYS.includes(e.key)) {
      setTimeout(() => {
        inputRef.current!.setSelectionRange(999, 999);
      }, 0);
    }
  };

  useEffect(() => {
    if (formatTime("" + previewValue, true) === displayValue) {
      setPreviewValue(null);
    }
  }, [previewValue, displayValue]);

  useEffect(() => {
    if (!isFocused && hiddenValue === previewValue) {
      onChange(timeToSeconds("" + hiddenValue));
    }
  }, [hiddenValue, isFocused]);

  return (
    <div className="w-full relative flex justify-center">
      <div
        className="z-10 text-8xl relative"
        onClick={handleFocus}
        data-testid="timer-input-button"
      >
        <span
          className={cn(
            isFocused && !inputRef.current!.value && "text-gray-500",
            className
          )}
          data-testid="timer-input-display"
        >
          {previewValue !== null ? formatTime("" + previewValue) : displayValue}
        </span>
        {isFocused && (
          <div className="absolute top-0 right-0 w-px h-full bg-white animate-blink" />
        )}
      </div>
      <input
        ref={inputRef}
        className="absolute top-5 opacity-0"
        onChange={handleInput}
        onKeyDown={updateCursorPositionToLast}
        onBlur={handleBlur}
      />
    </div>
  );
}
