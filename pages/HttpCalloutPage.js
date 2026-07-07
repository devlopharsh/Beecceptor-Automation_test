import { expect } from "@playwright/test";

export class HttpCalloutPage {
  constructor(page) {
    this.page = page;
  }

  async createRule(source, destination) {
    await this.page.locator('a[data-bs-target=".allRules"]').click();

    await this.page
      .getByRole("button", {
        name: "Toggle Dropdown",
      })
      .click();

    await this.page
      .getByRole("link", {
        name: /New Callout Rule/i,
      })
      .click();

    await this.page.getByPlaceholder("e.g. /api/path").fill(source);

    await this.page
      .locator("#targetEndpoint")
      .filter({
        visible: true,
      })
      .fill(destination);

    await this.page
      .getByRole("textbox", { name: "Description" })
      .fill(
        "this is the automated test api that is being created by the playwright script",
      );

    await this.page.locator("#saveV2Callout").click();

    await this.page.waitForLoadState("networkidle");
  }
}
