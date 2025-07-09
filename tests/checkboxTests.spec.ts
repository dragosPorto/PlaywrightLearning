import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
});

test.skip('check if checkbox was checked', async ({ page }) => {
   await page.locator ('input[type="checkbox"]').first().check();
    const isChecked = await page.locator('input[type="checkbox"]').first().isChecked();
    expect(isChecked).toBe(true);
});

test.skip('check if checkbox was unchecked', async ({ page }) => {
    await page.locator ('input[type="checkbox"]').last().check();
    const isChecked = await page.locator('input[type="checkbox"]').first().isChecked();
    expect(isChecked).toBe(false);
});



