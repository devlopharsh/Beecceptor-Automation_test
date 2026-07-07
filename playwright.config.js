import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({

    use: {

        headless: false,

        viewport: {
            width: 1440,
            height: 900
        },

        screenshot: "only-on-failure",

        video: "retain-on-failure",

        trace: "retain-on-failure"

    }

});