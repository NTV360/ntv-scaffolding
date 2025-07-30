import { Page, Locator } from '@playwright/test';

export class AppPage {
  constructor(private page: Page) {}

  /**
   * Get the page title element
   */
  getPageTitle(): Locator {
    return this.page.locator('h2');
  }

  /**
   * Custom login method
   */
  async login(email: string, password: string): Promise<void> {
    console.log('Custom command example: Login', email, password);
    // Add your actual login implementation here
    // For example:
    // await this.page.fill('[data-testid="email"]', email);
    // await this.page.fill('[data-testid="password"]', password);
    // await this.page.click('[data-testid="login-button"]');
  }
}