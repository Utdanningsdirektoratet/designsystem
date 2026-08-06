import { expect, test } from 'playwright/test';

// Keep this list in sync with the routes in src/app/
const routes = ['/', '/article', '/dashboard', '/form', '/page', '/table'];

for (const route of routes) {
  test(`smoke: ${route} renders without errors`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBe(200);

    const main = page.locator('main');
    await expect(main).toBeVisible();
    await expect(main).not.toBeEmpty();

    // Ensure no Next.js error overlay is present
    await expect(page.locator('#__next_error__')).toHaveCount(0);
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
  });
}
