import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/broken_images');
});

test.skip('check for broken images', async ({ page }) => {
    // Get all image elements on the page
    const images = page.locator('img');

    // Check if each image is broken
    const brokenImages = await images.evaluateAll(imgs => {
        return imgs.filter(img => {
            if (img instanceof HTMLImageElement) {
                return !img.complete || img.naturalWidth === 0;
            }
            return false;
        });
    });

    // Assert that there are no broken images
    expect(brokenImages.length).toBe(0);
});

test('check for specific broken image', async ({ page }) => {
    // Check for a specific broken image by its alt text
    const brokenImage = page.locator('img[alt="missing image"]');
    
    // Assert that the image is not visible (i.e., it is broken)
    await expect(brokenImage).not.toBeVisible();
});