import { expect, test } from '@playwright/test';

test('create event test', async ({ page }) => {
  await page.goto('http://localhost:3000/create');
  await expect(page).toHaveURL('http://localhost:3000/create');
  await expect(
    page.getByRole('heading', { name: 'HOST YOUR EVENT' }),
  ).toBeVisible();
  await expect(page.locator('h3')).toHaveText('HOST YOUR EVENT');
});
