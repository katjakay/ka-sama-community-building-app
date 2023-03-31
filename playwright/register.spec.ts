import { expect, test } from '@playwright/test';

test('login and register test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await expect(
    page.getByRole('heading', { name: 'Welcome back,' }),
  ).toBeVisible();

  await expect(page.getByRole('link', { name: 'Register now' })).toBeVisible();

  await page.getByRole('link', { name: 'Register here' }).click();

  await expect(page).toHaveURL('http://localhost:3000/register');

  await expect(
    page.getByRole('heading', { name: 'Join KA-SAMA!' }),
  ).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'Already a user? Login here' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Login' }).click();

  await expect(page).toHaveURL('http://localhost:3000/login');
});
