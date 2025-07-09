import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
});

test.skip('drag and drop', async ({ page }) => {
    // Locate the elements to be dragged and dropped
    const source = page.locator('#column-a');
    const target = page.locator('#column-b');

    // Perform drag and drop action
    await source.dragTo(target);

    // Verify the result of the drag and drop action
    await expect(source).toHaveText('B');
    await expect(target).toHaveText('A');
});