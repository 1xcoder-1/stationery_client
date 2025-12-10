import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        specPattern: "testing/e2e/**/*.cy.{js,jsx,ts,tsx}",
        supportFile: "testing/support/e2e.ts",
        fixturesFolder: "testing/fixtures",
        videosFolder: "testing/videos",
        screenshotsFolder: "testing/screenshots",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
