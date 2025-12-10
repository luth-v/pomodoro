import { DEFAULT_TIMER } from "@/constants";
import test, { expect } from "@playwright/test";
import { TimerPage } from "e2e/locator/timer.locator";

test.describe("Timer", () => {
  test("should start countdown when start button is clicked", async ({
    page,
  }) => {
    const timerPage = new TimerPage(page);

    await timerPage.goto();
    await expect(timerPage.startButton).toBeVisible();
    await expect(timerPage.pauseButton).toBeHidden();
    await expect(timerPage.resetButton).toBeHidden();
    let countdownCircleStrokeOffset =
      await timerPage.getCountdownCircleStrokeOffset();
    await expect(countdownCircleStrokeOffset).toBe(0);

    await timerPage.setTimer("5");
    await expect(await timerPage.getDisplayValue()).toBe(`00:00:05`);

    await timerPage.startButton.click();
    await expect(timerPage.startButton).toBeHidden();
    await expect(timerPage.pauseButton).toBeVisible();
    await expect(timerPage.resetButton).toBeVisible();
    await page.waitForTimeout(100);
    countdownCircleStrokeOffset =
      await timerPage.getCountdownCircleStrokeOffset();
    await expect(countdownCircleStrokeOffset).toBeGreaterThan(0);

    await page.waitForTimeout(7 * 1000);
    await expect(timerPage.pauseButton).toBeHidden();
    await expect(timerPage.resetButton).toBeVisible();
    await expect(await timerPage.getDisplayValue()).toBe("00:00:00");
    countdownCircleStrokeOffset =
      await timerPage.getCountdownCircleStrokeOffset();
    await expect(countdownCircleStrokeOffset).toBe(timerPage.circumference);
  });

  test("should change timer", async ({ page }) => {
    const timerPage = new TimerPage(page);

    await timerPage.goto();
    await expect(await timerPage.getDisplayValue()).toBe(
      `00:00:${DEFAULT_TIMER}`
    );

    await timerPage.setTimer("2530");
    await page.waitForTimeout(100);
    await expect(await timerPage.getDisplayValue()).toBe("00:25:30");
    await timerPage.startButton.click();
    await page.waitForTimeout(100);
    await expect(await timerPage.getDisplayValue()).toBe("00:25:30");
    await timerPage.resetButton.click();

    await timerPage.setTimer("999999");
    await page.waitForTimeout(100);
    await expect(await timerPage.getDisplayValue()).toBe("100:40:39");
    await timerPage.startButton.click();
    await page.waitForTimeout(100);
    await expect(await timerPage.getDisplayValue()).toBe("100:40:39");
    await timerPage.resetButton.click();
  });

  test("should pause the timer and continue", async ({ page }) => {
    const timerPage = new TimerPage(page);

    await timerPage.goto();
    await timerPage.setTimer("10");
    await timerPage.startButton.click();

    await page.waitForTimeout(5 * 1000);
    await timerPage.pauseButton.click();
    await expect(timerPage.pauseButton).toBeHidden();
    await expect(timerPage.startButton).toBeVisible();
    await expect(timerPage.resetButton).toBeVisible();
    await expect(await timerPage.getDisplayValue()).not.toBe(
      `00:00:${DEFAULT_TIMER}`
    );
    await expect(await timerPage.getDisplayValue()).not.toBe("00:00:00");

    await timerPage.setTimer("");
    await expect(await timerPage.getDisplayValue()).not.toBe("00:00:10");

    await timerPage.startButton.click();
    await page.waitForTimeout(5 * 1000);
    await expect(await timerPage.getDisplayValue()).toBe("00:00:00");
  });

  test("should pause the timer and change timer", async ({ page }) => {
    const timerPage = new TimerPage(page);

    await timerPage.goto();
    await timerPage.startButton.click();

    await page.waitForTimeout(2 * 1000);
    await timerPage.pauseButton.click();
    await timerPage.setTimer("2");
    await expect(await timerPage.getDisplayValue()).toBe("00:00:02");
  });

  test("should reset timer", async ({ page }) => {
    const timerPage = new TimerPage(page);

    await timerPage.goto();
    await timerPage.setTimer("3");
    await timerPage.startButton.click();

    await page.waitForTimeout(4 * 1000);
    await timerPage.resetButton.click();
    await page.waitForTimeout(50);
    await expect(await timerPage.getDisplayValue()).toBe("00:00:03");
    await timerPage.startButton.click();

    await page.waitForTimeout(1 * 1000);
    await expect(timerPage.pauseButton).toBeVisible();
    await timerPage.resetButton.click();
    await page.waitForTimeout(50);
    await expect(await timerPage.getDisplayValue()).toBe("00:00:03");
  });

  // test("should increment timer", async ({ page }) => {
  //   const timerPage = new TimerPage(page);

  //   await timerPage.goto();
  //   const incrementButton30 = await timerPage.getIncrementButtonByValue("30");
  //   await expect(incrementButton30).toBeVisible();

  //   await timerPage.setTimer("5");
  //   await page.waitForTimeout(50);
  //   await expect(await timerPage.getDisplayValue()).toBe("00:00:05");

  //   await incrementButton30.click();
  //   await page.waitForTimeout(50);
  //   await expect(await timerPage.getDisplayValue()).toBe("00:00:35");

  //   await timerPage.startButton.click();
  //   await incrementButton30.click();
  //   await incrementButton30.click();
  //   await incrementButton30.click();
  //   await incrementButton30.click();
  //   await page.waitForTimeout(50);
  //   await expect(await timerPage.getDisplayValue()).toMatch(/00\:02\:\d{2}/);
  // });
});
