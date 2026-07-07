import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import { HttpCalloutPage } from "../pages/HttpCalloutPage.js";
import { triggerCallout } from "../utils/api.js";

test("HTTP Callout End To End", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const callout = new HttpCalloutPage(page);

  // Login
  await login.login(process.env.EMAIL, process.env.PASSWORD);

  // Create or reuse endpoint
  await dashboard.createOrReuseEndpoint(process.env.ENDPOINT_NAME);

  // Create the new Callout rule
  await callout.createRule(process.env.SOURCE, process.env.DESTINATION);

  // --------------------------------------------
  // Open the endpoint in a new browser tab
  // --------------------------------------------

  const endpointUrl = `https://${process.env.ENDPOINT_NAME}.free.beeceptor.com/http-callout-source`;

  const endpointTab = await page.context().newPage();

  await endpointTab.goto(endpointUrl);

  // Read JSON from the page
  const responseText = await endpointTab.locator("body").textContent();

  console.log("Endpoint Response:", responseText);

  const responseJson = JSON.parse(responseText);

  // Verify JSON
  expect(responseJson).toEqual({
    success: true,
    message: "called from beeceptor - callout succeeded",
  });

  // Close the tab
  await endpointTab.close();
});
