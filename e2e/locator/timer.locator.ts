import { CIRCLE_RADIUS } from "@/constants";
import type { Locator, Page } from "@playwright/test";

export class TimerPage {
  readonly page: Page;

  // Constant
  readonly circumference = 2 * Math.PI * CIRCLE_RADIUS;

  // Locators
  readonly startButton: Locator;
  readonly pauseButton: Locator;
  readonly resetButton: Locator;
  readonly timerInputDisplay: Locator;
  readonly timerInputButton: Locator;
  readonly countdownCirclePath: Locator;
  readonly timerIncrementButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.startButton = page.getByTestId("start-button");
    this.resetButton = page.getByTestId("reset-button");
    this.pauseButton = page.getByTestId("pause-button");
    this.timerInputDisplay = page.getByTestId("timer-input-display");
    this.timerInputButton = page.getByTestId("timer-input-button");
    this.countdownCirclePath = page
      .getByTestId("countdown-circle")
      .locator("circle")
      .nth(1);
    this.timerIncrementButton = page.getByTestId("timer-increment-button");
  }

  async goto() {
    this.page.goto("/");
  }

  async setTimer(str: string) {
    await this.timerInputButton.click();
    await this.page.keyboard.type(str);
    await this.page.click("body");
  }

  async getDisplayValue() {
    return (await this.timerInputDisplay.textContent()) || "";
  }

  async getCountdownCircleStrokeOffset() {
    const offset =
      (await this.countdownCirclePath.getAttribute("stroke-dashoffset")) ?? "0";
    return +offset;
  }

  async getIncrementButtonByValue(value: string) {
    return await this.timerIncrementButton.and(
      this.page.locator(`[data-value="${value}"]`)
    );
  }
}
