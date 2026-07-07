export class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async createOrReuseEndpoint(name) {
    const endpoint = this.page.getByText(name);

    if ((await endpoint.count()) > 0) {
      await endpoint.first().click();

      return;
    }

    await this.page.locator("#channel").fill(name);

    await this.page.getByRole("button", { name: "Create Mock Server" }).click();

    await this.page.waitForLoadState("networkidle");
  }
}
