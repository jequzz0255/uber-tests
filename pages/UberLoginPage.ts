import { Page } from '@playwright/test';

export class UberLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.page
      .getByTestId('responsive-desktop-nav')
      .getByTestId('wcb3-navigation-login')
      .click();
  }

async enterPhone(phone: string) {
  await this.page
    .getByPlaceholder('Enter phone number or email')
    .fill(phone);
}

  async clickForward() {
    await this.page.getByTestId('forward-button').click();
  }

  async enterSmsCode(code: string) {
    const digits = code.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.page.locator(`#PHONE_SMS_OTP-${i}`).fill(digits[i]);
    }
  }
}