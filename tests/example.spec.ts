import { test, expect } from '@playwright/test';

test('Strona Ubera się ładuje', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Uber/);
  console.log('Strona załadowana poprawnie');
});
