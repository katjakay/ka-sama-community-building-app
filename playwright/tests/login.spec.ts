import { expect, test } from '@playwright/test';

test('test register, login,events flow', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await expect(page).toHaveURL('http://localhost:3000/register');
  await page.locator('[data-test-id="checkout-first-name"]').fill('Dario');
  await page.locator('[data-test-id="checkout-first-name"]').press('Tab');
  await page.locator('[data-test-id="checkout-last-name"]').fill('Loerke');
  await page.locator('[data-test-id="checkout-last-name"]').press('Tab');
  await page.locator('[data-test-id="checkout-email"]').fill('dario@gmail.com');
  await page.locator('[data-test-id="checkout-email"]').press('Tab');
  await page
    .locator('[data-test-id="checkout-address"]')
    .fill('Buchfeldgasse 10');
  await page.locator('[data-test-id="checkout-address"]').press('Tab');
  await page.locator('[data-test-id="checkout-city"]').fill('Vienna');
  await page.locator('[data-test-id="checkout-city"]').press('Tab');
  await page.locator('[data-test-id="checkout-postal-code"]').fill('1080');
  await page.locator('[data-test-id="checkout-postal-code"]').press('Tab');
  await page.locator('[data-test-id="checkout-country"]').fill('Austria');
  await page.locator('[data-test-id="checkout-credit-card"]').click();
  await page
    .locator('[data-test-id="checkout-credit-card"]')
    .fill('123545676345');
  await page.locator('[data-test-id="checkout-expiration-date"]').click();
  await page.locator('[data-test-id="checkout-expiration-date"]').press('Tab');
  await page.locator('[data-test-id="checkout-confirm-order"]').click();
  await expect(page).toHaveURL('http://localhost:3000/checkout');
  await page
    .locator('[data-test-id="checkout-expiration-date"]')
    .fill('2030-01');
  await page.locator('[data-test-id="checkout-confirm-order"]').click();
  await expect(page).toHaveURL('http://localhost:3000/checkout');
  await page.locator('[data-test-id="checkout-security-code"]').click();
  await page.locator('[data-test-id="checkout-security-code"]').fill('123');
  await page.locator('[data-test-id="checkout-confirm-order"]').click();
  await expect(page).toHaveURL('http://localhost:3000/thankyou');
  await page.getByText('Thank you! Your order was placed successfully.');
});
