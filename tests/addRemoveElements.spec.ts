import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    // Navigate to the page before each test
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
})

test.skip('add an element', async ({ page }) => {
    // Click the "Add Element" button
    await page.getByRole('button', { name: 'Add Element' }).click();
    
    // Expect the new element to be visible
    const newElement = page.getByRole('button', { name: 'Delete' });
    await expect(newElement).toBeVisible();
    // Expect the count of delete buttons to be 1
    const deleteButtons = await page.getByRole('button', { name: 'Delete' }).count();
    expect(deleteButtons).toBe(1);

});
test.skip('remove an element', async ({ page }) => {
    // Click the "Add Element" button to add an element first
    await page.getByRole('button', { name: 'Add Element' }).click();
    
    // Click the "Delete" button to remove the element
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Expect the delete button to be hidden after removal
    const deleteButton = page.getByRole('button', { name: 'Delete' });
    await expect(deleteButton).toBeHidden();
    
    // Expect the count of delete buttons to be 0
    const deleteButtonsCount = await page.getByRole('button', { name: 'Delete' }).count();
    expect(deleteButtonsCount).toBe(0);
});

test.skip('add multiple elements and remove one', async ({ page }) => {
    // Add two elements
    await page.getByRole('button', { name: 'Add Element' }).click();
    await page.getByRole('button', { name: 'Add Element' }).click();
    
    // Expect the count of delete buttons to be 2
    const deleteButtonsCount = await page.getByRole('button', { name: 'Delete' }).count();
    expect(deleteButtonsCount).toBe(2);
    
    // Remove one element
    await page.getByRole('button', { name: 'Delete' }).first().click();
    
    // Expect the count of delete buttons to be 1
    const remainingDeleteButtonsCount = await page.getByRole('button', { name: 'Delete' }).count();
    expect(remainingDeleteButtonsCount).toBe(1);
});

test.skip('add multiple elements and remove all', async ({ page }) => {
    // Add three elements
    const number = 3;
    for (let i = 0; i < number; i++) {
    await page.getByRole('button', { name: 'Add Element' }).click();
}

    const deleteButtonsCount = await page.getByRole('button', { name: 'Delete' }).count();
    expect(deleteButtonsCount).toBe(number);

    for (let i = 0; i < number; i++) {
        // Click the "Delete" button to remove each element
        await page.getByRole('button', { name: 'Delete' }).first().click();
    }
    // Expect all delete buttons to be removed
    const remainingDeleteButtonsCount = await page.getByRole('button', { name: 'Delete' }).count();
    expect(remainingDeleteButtonsCount).toBe(0);
})

