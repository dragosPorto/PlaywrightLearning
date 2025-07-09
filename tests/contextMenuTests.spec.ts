import { test, expect } from '@playwright/test';
import { time } from 'console';

test.beforeEach(async ({ page }) => {

    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/context_menu');
})

test('right click shows alert', async ({ page }) => {
  
  const box = page.locator('#hot-spot');
  const dialogPromise = page.waitForEvent('dialog');
  box.click({ button: 'right' });
  const dialog = await dialogPromise;
  
  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toContain('You selected a context menu');
  await dialog.accept();
});