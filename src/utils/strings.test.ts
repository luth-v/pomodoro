import { describe, expect, test } from "bun:test";
import { formatTime, timeToSeconds, secondsToTime } from "./strings";

describe("formatTime", () => {
  describe("without remainder adjustment", () => {
    test("formats full 6-digit string correctly", () => {
      expect(formatTime("023015")).toBe("02:30:15");
    });

    test("formats another full 6-digit string", () => {
      expect(formatTime("120000")).toBe("12:00:00");
    });

    test("pads shorter string with leading zeros", () => {
      expect(formatTime("123")).toBe("00:01:23");
    });

    test("pads single digit string", () => {
      expect(formatTime("5")).toBe("00:00:05");
    });

    test("pads two digit string", () => {
      expect(formatTime("45")).toBe("00:00:45");
    });

    test("pads three digit string", () => {
      expect(formatTime("130")).toBe("00:01:30");
    });

    test("pads four digit string", () => {
      expect(formatTime("1530")).toBe("00:15:30");
    });

    test("pads five digit string", () => {
      expect(formatTime("11530")).toBe("01:15:30");
    });

    test("handles empty string", () => {
      expect(formatTime("")).toBe("00:00:00");
    });

    test("handles all zeros", () => {
      expect(formatTime("000000")).toBe("00:00:00");
    });

    test("handles max single digit hours", () => {
      expect(formatTime("095959")).toBe("09:59:59");
    });

    test("handles double digit hours", () => {
      expect(formatTime("235959")).toBe("23:59:59");
    });
  });

  describe("with remainder adjustment", () => {
    test("adjusts overflow seconds into minutes", () => {
      expect(formatTime("000065", true)).toBe("00:01:05");
    });

    test("adjusts overflow minutes into hours", () => {
      expect(formatTime("006500", true)).toBe("01:05:00");
    });

    test("adjusts both overflow seconds and minutes", () => {
      expect(formatTime("026065", true)).toBe("03:01:05");
    });

    test("handles 90 seconds overflow", () => {
      expect(formatTime("000090", true)).toBe("00:01:30");
    });

    test("handles 90 minutes overflow", () => {
      expect(formatTime("009000", true)).toBe("01:30:00");
    });

    test("no adjustment needed when values are normal", () => {
      expect(formatTime("023015", true)).toBe("02:30:15");
    });

    test("handles large overflow", () => {
      // 0h 99m 99s = 5940 + 99 = 6039 seconds = 1h 40m 39s
      expect(formatTime("009999", true)).toBe("01:40:39");
    });

    test("handles zero input with adjustment", () => {
      expect(formatTime("000000", true)).toBe("00:00:00");
    });

    test("handles max normal time with adjustment", () => {
      expect(formatTime("235959", true)).toBe("23:59:59");
    });
  });
});

describe("timeToSeconds", () => {
  describe("with colon-separated format (h:mm:ss)", () => {
    test("converts 1 minute to 60 seconds", () => {
      expect(timeToSeconds("0:01:00")).toBe(60);
    });

    test("converts 1 hour 30 minutes to seconds", () => {
      expect(timeToSeconds("1:30:00")).toBe(5400);
    });

    test("converts zero time", () => {
      expect(timeToSeconds("0:00:00")).toBe(0);
    });

    test("converts 1 second", () => {
      expect(timeToSeconds("0:00:01")).toBe(1);
    });

    test("converts 59 seconds", () => {
      expect(timeToSeconds("0:00:59")).toBe(59);
    });

    test("converts 1 minute 30 seconds", () => {
      expect(timeToSeconds("0:01:30")).toBe(90);
    });

    test("converts 10 hours", () => {
      expect(timeToSeconds("10:00:00")).toBe(36000);
    });

    test("converts 23:59:59", () => {
      expect(timeToSeconds("23:59:59")).toBe(86399);
    });

    test("converts 2:30:45", () => {
      expect(timeToSeconds("2:30:45")).toBe(9045);
    });

    test("converts double digit hours with leading zero", () => {
      expect(timeToSeconds("02:30:15")).toBe(9015);
    });
  });

  describe("without colon format (numeric string)", () => {
    test("converts 13000 to 5400 seconds", () => {
      expect(timeToSeconds("13000")).toBe(5400);
    });

    test("converts padded 6-digit string", () => {
      expect(timeToSeconds("023015")).toBe(9015);
    });

    test("converts short string with padding", () => {
      expect(timeToSeconds("100")).toBe(60);
    });

    test("converts single digit", () => {
      expect(timeToSeconds("5")).toBe(5);
    });

    test("converts two digits", () => {
      expect(timeToSeconds("30")).toBe(30);
    });

    test("converts three digits (1 min 30 sec)", () => {
      expect(timeToSeconds("130")).toBe(90);
    });

    test("converts four digits", () => {
      expect(timeToSeconds("1530")).toBe(930);
    });

    test("converts 10000 (1 hour)", () => {
      expect(timeToSeconds("10000")).toBe(3600);
    });

    test("converts empty string to 0", () => {
      expect(timeToSeconds("")).toBe(0);
    });

    test("converts all zeros", () => {
      expect(timeToSeconds("000000")).toBe(0);
    });
  });
});

describe("secondsToTime", () => {
  describe("with default separator", () => {
    test("converts 60 seconds to 0:01:00", () => {
      expect(secondsToTime(60)).toBe("00:01:00");
    });

    test("converts 5400 seconds to 1:30:00", () => {
      expect(secondsToTime(5400)).toBe("01:30:00");
    });

    test("converts 0 seconds", () => {
      expect(secondsToTime(0)).toBe("00:00:00");
    });

    test("converts 1 second", () => {
      expect(secondsToTime(1)).toBe("00:00:01");
    });

    test("converts 59 seconds", () => {
      expect(secondsToTime(59)).toBe("00:00:59");
    });

    test("converts 90 seconds to 1 min 30 sec", () => {
      expect(secondsToTime(90)).toBe("00:01:30");
    });

    test("converts 3600 seconds to 1 hour", () => {
      expect(secondsToTime(3600)).toBe("01:00:00");
    });

    test("converts 3661 seconds to 1:01:01", () => {
      expect(secondsToTime(3661)).toBe("01:01:01");
    });

    test("converts 9015 seconds to 2:30:15", () => {
      expect(secondsToTime(9015)).toBe("02:30:15");
    });

    test("converts 86399 seconds to 23:59:59", () => {
      expect(secondsToTime(86399)).toBe("23:59:59");
    });

    test("converts 36000 seconds to 10:00:00", () => {
      expect(secondsToTime(36000)).toBe("10:00:00");
    });

    test("handles values over 24 hours", () => {
      expect(secondsToTime(90000)).toBe("25:00:00");
    });
  });

  describe("with custom separator", () => {
    test("uses dot separator", () => {
      expect(secondsToTime(3661, ".")).toBe("01.01.01");
    });

    test("uses dash separator", () => {
      expect(secondsToTime(5400, "-")).toBe("01-30-00");
    });

    test("uses space separator", () => {
      expect(secondsToTime(90, " ")).toBe("00 01 30");
    });

    test("uses empty string separator", () => {
      expect(secondsToTime(3661, "")).toBe("010101");
    });

    test("uses multi-character separator", () => {
      expect(secondsToTime(3661, " : ")).toBe("01 : 01 : 01");
    });
  });
});

describe("roundtrip conversions", () => {
  test("timeToSeconds and secondsToTime are inverse operations", () => {
    const times = ["00:00:00", "00:01:00", "01:30:00", "02:30:15", "23:59:59"];
    for (const time of times) {
      const seconds = timeToSeconds(time);
      const result = secondsToTime(seconds);
      expect(result).toBe(time);
    }
  });

  test("secondsToTime and timeToSeconds are inverse operations", () => {
    const secondsValues = [0, 1, 60, 90, 3600, 5400, 9015, 86399];
    for (const secs of secondsValues) {
      const time = secondsToTime(secs);
      const result = timeToSeconds(time);
      expect(result).toBe(secs);
    }
  });

  test("formatTime without adjustment matches secondsToTime for valid times", () => {
    // For valid time values (no overflow), formatTime should match secondsToTime
    expect(formatTime("023015")).toBe(secondsToTime(timeToSeconds("02:30:15")));
    expect(formatTime("010000")).toBe(secondsToTime(3600));
  });
});
