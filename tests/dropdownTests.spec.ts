import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/dropdown');
})

test('select option 1 from dropdown', async ({ page }) => {
    // Select option 1 from the dropdown
    await page.selectOption('select#dropdown', '1');
    
    // Verify that option 1 is selected
    const selectedOption = await page.$eval('select#dropdown', select => (select as HTMLSelectElement).value);
    expect(selectedOption).toBe('1');
});

test('select option 2 from dropdown', async ({ page }) => {
    // Select option 2 from the dropdown
    await page.selectOption('select#dropdown', '2');
    
    // Verify that option 2 is selected
    const selectedOption = await page.$eval('select#dropdown', select => (select as HTMLSelectElement).value);
    expect(selectedOption).toBe('2');
});

test('selected option resets after page refresh', async ({ page }) => {
    // Select option 1 from the dropdown
    await page.selectOption('select#dropdown', '1');
    
    // Verify that option 1 is selected
    const selectedOptionBeforeRefresh = await page.$eval('select#dropdown', select => (select as HTMLSelectElement).value);
    expect(selectedOptionBeforeRefresh).toBe('1');
    
    // Refresh the page
    await page.reload();
    
    // Verify that no option is selected after refresh
    const selectedOptionAfterRefresh = await page.$eval('select#dropdown', select => (select as HTMLSelectElement).value);
    expect(selectedOptionAfterRefresh).toBe('');
});