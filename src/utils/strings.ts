/**
 * Return numeric string into time-formatted string
 * @param str - Text to be formatted, should have length of 6
 * @param shouldAdjustRemainder - Should adjust the format from seconds into hourly ( default = false )
 * @example
 * - formatTime("023015") // returns "02:30:15"
 * - formatTime("123") // returns "00:01:23"
 * - formatTime("026065", true) // returns "03:01:05"
 */
export const formatTime = (str: string, shouldAdjustRemainder = false) => {
  const padStr = str.padStart(6, "0");
  return padStr.replace(/(\d{1,})(\d{2})(\d{2})/, (_, h, m, s) => {
    if (shouldAdjustRemainder) {
      let totalSeconds = +h * 3600 + +m * 60 + +s;
      return secondsToTime(totalSeconds);
    }

    return `${h}:${m}:${s}`;
  });
};

/**
 * Convert a string in time format (h:mm:ss or hmmss) into seconds
 * @param timeStr - Time string formatted in h:mm:ss
 * @example
 * - timeToSeconds("0:01:00") // returns 60
 * - timeToSeconds("1:30:00") // returns 5400
 * - timeToSeconds("13000") // returns 5400
 */
export const timeToSeconds = (timeStr: string) => {
  if (timeStr.includes(":")) {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h! * 3600 + m! * 60 + s!;
  }

  const padStr = timeStr.padStart(5, "0");
  const match = padStr.match(/(\d{1,})(\d{2})(\d{2})/);
  const [, h, m, s] = match || ["", "0", "0", "0"];
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
};

/**
 * Convert a number from seconds into time format (h:mm:ss)
 * @param n - Total second
 * @param separator - Time format separator ( default = ":" )
 * @example
 * - secondToTime(60) // returns "0:01:00"
 * - secondToTime(5400) // returns "1:30:00"
 */
export const secondsToTime = (n: number, separator = ":") => {
  const hours = Math.floor(n / 3600);
  const minutes = Math.floor((n % 3600) / 60);
  const seconds = n % 60;
  return (
    `${("" + hours).padStart(2, "0")}${separator}` +
    `${("" + minutes).padStart(2, "0")}${separator}` +
    `${("" + seconds).padStart(2, "0")}`
  );
};
