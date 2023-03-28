import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3002/');
  await page.getByRole('button').click();
  await page.getByRole('link', { name: 'EVENTS' }).click();
  await page.getByRole('heading', { name: 'Tagalog for beginners' }).click();
  await page.getByText('07.05.2023 at 18:00').click();
  await page.locator('.card-actions > .btn').first().click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('lily');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
});
