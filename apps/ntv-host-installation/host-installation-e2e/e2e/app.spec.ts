import { test, expect } from '@playwright/test';
import { AppPage } from '../support/app.po';

test.describe('host-installation-e2e', () => {
  let appPage: AppPage;

  test.beforeEach(async ({ page }) => {
    appPage = new AppPage(page);
    await page.goto('/');
  });

  test('should display page title', async () => {
    // Check that the page loads and displays the main title
    const pageTitle = appPage.getPageTitle();
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText(/Create a Host/);
  });
});
