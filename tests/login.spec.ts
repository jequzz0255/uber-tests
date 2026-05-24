import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UberLoginPage } from '../pages/UberLoginPage';

test('Logowanie - błędny numer telefonu', async ({ page }) => {
  const loginPage = new UberLoginPage(page);

  await loginPage.goto();
  await loginPage.clickLogin();
  await loginPage.enterPhone('+48000000000');
  await loginPage.clickForward();

  await expect(page.getByPlaceholder('Enter phone number or email')).toBeVisible();
});

test('Logowanie - puste pole telefonu', async ({ page }) => {
  const loginPage = new UberLoginPage(page);

  await loginPage.goto();
  await loginPage.clickLogin();
  await loginPage.clickForward();

  await expect(page.getByPlaceholder('Enter phone number or email')).toBeVisible();
});

test('Edge case - bardzo długi string', async ({ page }) => {
  const loginPage = new UberLoginPage(page);
  const longString = faker.string.alpha(500); // 500 losowych znaków

  await loginPage.goto();
  await loginPage.clickLogin();
  await loginPage.enterPhone(longString);
  await loginPage.clickForward();

  await expect(page.getByPlaceholder('Enter phone number or email')).toBeVisible();
});

test('Edge case - znaki specjalne', async ({ page }) => {
  const loginPage = new UberLoginPage(page);
  const specialChars = '!@#$%^&*()_+[]{}|;<>?,./`~';

  await loginPage.goto();
  await loginPage.clickLogin();
  await loginPage.enterPhone(specialChars);
  await loginPage.clickForward();

  await expect(page.getByPlaceholder('Enter phone number or email')).toBeVisible();
});

test('Edge case - XSS injection', async ({ page }) => {
  const loginPage = new UberLoginPage(page);
  const xssPayload = '<script>alert("xss")</script>';

  await loginPage.goto();
  await loginPage.clickLogin();
  await loginPage.enterPhone(xssPayload);
  await loginPage.clickForward();

  // Strona nie powinna wykonać skryptu ani się posypać
  await expect(page.getByPlaceholder('Enter phone number or email')).toBeVisible();
});

test('Edge case - losowy fake numer z Fakera', async ({ page }) => {
  const loginPage = new UberLoginPage(page);
  const fakePhone = faker.phone.number(); // np. +1-234-567-8901

  await loginPage.goto();
  await loginPage.clickLogin();
  await loginPage.enterPhone(fakePhone);
  await loginPage.clickForward();

  await expect(page.getByPlaceholder('Enter phone number or email')).toBeVisible();
});