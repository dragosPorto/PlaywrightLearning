import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
});

// Test for HTTP Basic Authentication
// This test will navigate to a page that requires HTTP Basic Authentication
test.skip('login with valid credentials', async ({ browser }) => {
    // Create a new context with HTTP authentication
    const context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });
    const page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/basic_auth');
    
        // Check if the login was successful by asserting the presence of a success message
        await expect(page.locator('text=Congratulations!')).toBeVisible();
        console.log('Login successful with valid credentials');
    
        await context.close();
    });