import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/exit_intent');
})

test('check exit intent popup visibility', async ({ page }) => {
    // Check if the exit intent popup is visible
    const exitIntentPopup = page.locator('#exit-intent-popup');
    
    // Wait for the popup to appear
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await expect(exitIntentPopup).toBeVisible({ timeout: 5000 });
    
    // Verify the content of the popup
    await expect(exitIntentPopup.locator('h3')).toHaveText('Wait! Before you go...');
});