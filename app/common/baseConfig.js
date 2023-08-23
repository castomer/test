import { defineConfig, devices } from '@playwright/test';
let host = require("os")

export default defineConfig({
  projects: [
    /* Test against branded browsers. */
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // or 'chrome-beta'
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or "msedge-beta" or 'msedge-dev'
    },

    exports.host = `https://data.fundraiseup.com/qa-test-7R58U3/`

  ],


  
});