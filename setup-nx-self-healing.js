#!/usr/bin/env node

/**
 * Nx Self-Healing Setup Script
 * This script helps configure Nx Self-Healing CI for your monorepo
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class NxSelfHealingSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.nxJsonPath = path.join(this.projectRoot, 'nx.json');
    this.packageJsonPath = path.join(this.projectRoot, 'package.json');
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m',
    };
    console.log(
      `${colors[type]}[${type.toUpperCase()}] ${message}${colors.reset}`
    );
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...');

    // Check if nx.json exists
    if (!fs.existsSync(this.nxJsonPath)) {
      throw new Error(
        "nx.json not found. This doesn't appear to be an Nx workspace."
      );
    }

    // Check if package.json exists
    if (!fs.existsSync(this.packageJsonPath)) {
      throw new Error('package.json not found.');
    }

    // Check if Nx is installed
    try {
      execSync('npx nx --version', { stdio: 'pipe' });
      this.log('Nx is installed ✓', 'success');
    } catch (error) {
      throw new Error('Nx is not installed. Please install Nx first.');
    }

    this.log('Prerequisites check passed ✓', 'success');
  }

  async connectToNxCloud() {
    this.log('Connecting to Nx Cloud...');

    try {
      // Check if already connected
      const nxJson = JSON.parse(fs.readFileSync(this.nxJsonPath, 'utf8'));

      if (
        nxJson.nxCloudAccessToken ||
        (nxJson.tasksRunnerOptions &&
          nxJson.tasksRunnerOptions.default &&
          nxJson.tasksRunnerOptions.default.runner === 'nx-cloud')
      ) {
        this.log('Already connected to Nx Cloud ✓', 'success');
        return;
      }

      // Connect to Nx Cloud
      this.log('Running: npx nx connect-to-nx-cloud');
      execSync('npx nx connect-to-nx-cloud', { stdio: 'inherit' });
      this.log('Connected to Nx Cloud ✓', 'success');
    } catch (error) {
      this.log(`Failed to connect to Nx Cloud: ${error.message}`, 'error');
      throw error;
    }
  }

  async updateNxConfiguration() {
    this.log('Updating Nx configuration for self-healing...');

    try {
      const nxJson = JSON.parse(fs.readFileSync(this.nxJsonPath, 'utf8'));

      // Ensure tasksRunnerOptions exists
      if (!nxJson.tasksRunnerOptions) {
        nxJson.tasksRunnerOptions = {};
      }

      if (!nxJson.tasksRunnerOptions.default) {
        nxJson.tasksRunnerOptions.default = {
          runner: 'nx-cloud',
        };
      }

      // Add self-healing configuration
      if (!nxJson.tasksRunnerOptions.default.options) {
        nxJson.tasksRunnerOptions.default.options = {};
      }

      // Configure caching and self-healing
      nxJson.tasksRunnerOptions.default.options = {
        ...nxJson.tasksRunnerOptions.default.options,
        cacheableOperations: ['build', 'lint', 'test', 'e2e'],
        parallel: 3,
        selfHealing: {
          enabled: true,
          autoApplyFixes: false, // Start with manual approval
          retryFailedTasks: true,
          maxRetries: 3,
        },
      };

      // Write updated configuration
      fs.writeFileSync(this.nxJsonPath, JSON.stringify(nxJson, null, 2));
      this.log('Nx configuration updated ✓', 'success');
    } catch (error) {
      this.log(`Failed to update Nx configuration: ${error.message}`, 'error');
      throw error;
    }
  }

  async createGitHubWorkflow() {
    this.log('Creating GitHub Actions workflow...');

    const workflowDir = path.join(this.projectRoot, '.github', 'workflows');
    const workflowPath = path.join(workflowDir, 'ci.yml');

    // Create .github/workflows directory if it doesn't exist
    if (!fs.existsSync(workflowDir)) {
      fs.mkdirSync(workflowDir, { recursive: true });
    }

    const workflowContent = `name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Set up Nx SHAs
        uses: nrwl/nx-set-shas@v4

      - name: Run affected tasks
        run: |
          npx nx affected -t lint test build --parallel=3
          npx nx affected -t e2e --parallel=1

      - name: Upload coverage reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-reports
          path: coverage/

  self-healing-report:
    runs-on: ubuntu-latest
    needs: main
    if: failure()
    steps:
      - name: Generate Self-Healing Report
        run: |
          echo "Self-healing analysis will be available in Nx Cloud dashboard"
          echo "Check https://cloud.nx.app for automated fix suggestions"
`;

    fs.writeFileSync(workflowPath, workflowContent);
    this.log('GitHub Actions workflow created ✓', 'success');
  }

  async createSelfHealingConfig() {
    this.log('Creating self-healing configuration...');

    const configPath = path.join(this.projectRoot, 'nx-cloud.config.ts');

    const configContent = `import { NxCloudConfig } from '@nrwl/nx-cloud';

const config: NxCloudConfig = {
  selfHealing: {
    enabled: true,
    rules: [
      {
        name: 'retry-flaky-tests',
        condition: 'test-failure',
        action: 'retry',
        maxRetries: 3,
        description: 'Automatically retry flaky tests up to 3 times'
      },
      {
        name: 'update-snapshots',
        condition: 'snapshot-mismatch',
        action: 'suggest-update',
        autoApply: false,
        description: 'Suggest snapshot updates for mismatched tests'
      },
      {
        name: 'dependency-resolution',
        condition: 'dependency-conflict',
        action: 'suggest-resolution',
        autoApply: false,
        description: 'Suggest dependency conflict resolutions'
      },
      {
        name: 'lint-auto-fix',
        condition: 'lint-error',
        action: 'auto-fix',
        autoApply: true,
        description: 'Automatically fix auto-fixable lint errors'
      }
    ],
    notifications: {
      slack: {
        enabled: false,
        webhook: process.env.SLACK_WEBHOOK_URL
      },
      email: {
        enabled: true,
        recipients: ['team@example.com']
      }
    }
  },
  distributedTaskExecution: {
    enabled: true,
    maxAgents: 3
  },
  caching: {
    enabled: true,
    readOnly: false
  }
};

export default config;
`;

    fs.writeFileSync(configPath, configContent);
    this.log('Self-healing configuration created ✓', 'success');
  }

  async generateReport() {
    this.log('\n=== Nx Self-Healing Setup Complete ===', 'success');
    this.log('\nNext Steps:');
    this.log('1. Commit and push your changes to trigger CI');
    this.log('2. Visit https://cloud.nx.app to view your dashboard');
    this.log('3. Monitor self-healing activity and approve suggested fixes');
    this.log('4. Configure notification preferences in the dashboard');
    this.log('\nFiles created/modified:');
    this.log('- nx.json (updated with self-healing config)');
    this.log('- .github/workflows/ci.yml (GitHub Actions workflow)');
    this.log('- nx-cloud.config.ts (detailed self-healing rules)');
    this.log('\nFor more information, see: nx-self-healing-setup.md');
  }

  async run() {
    try {
      await this.checkPrerequisites();
      await this.connectToNxCloud();
      await this.updateNxConfiguration();
      await this.createGitHubWorkflow();
      await this.createSelfHealingConfig();
      await this.generateReport();
    } catch (error) {
      this.log(`Setup failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  const setup = new NxSelfHealingSetup();
  setup.run();
}

module.exports = NxSelfHealingSetup;
