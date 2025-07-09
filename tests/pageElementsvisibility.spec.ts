import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
});

test.skip('check visibility of elements', async ({ page }) => {
    // Get the list of elements
    const numberOfElements = 5
    const elements = page.locator('ul li');
    const count = await elements.count();
    
    // Check if the elements are visible
    //await expect(elements).toBeVisible();
    await expect(count).toBe(numberOfElements);
});

test.skip('check the visibility of gallery after multiple reloads', async ({ page }) => {
    const galleryButton = page.locator('text=Gallery');
    const numberOfTries = 5;

    for (let i = 0; i < numberOfTries; i++) {
        console.log(`🔁 Attempt ${i + 1}`);

        try {
            await expect(galleryButton).toBeVisible({ timeout: 5000 });
        } catch {
            throw new Error(`❌ Gallery button not visible before reload #${i + 1}`);
        }

        await page.reload();

        try {
            await expect(galleryButton).toBeVisible({ timeout: 5000 });
        } catch {
            throw new Error(`❌ Gallery button not visible after reload #${i + 1}`);
        }
    }
});