import { expect } from "@playwright/test";
import { BASE_URL } from "../utils/constants.js";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    await this.page.goto(BASE_URL);

    // replace with actual selector
    await this.page.locator("#email").fill(email);

    await this.page.locator("#password").fill(password);

    await this.page
      .getByRole("button", { name: "Sign in", exact: true })
      .click();

    await this.page.waitForLoadState("networkidle");
  }
}
