#!/usr/bin/env node

/**
 * Nx Self-Healing Troubleshooting and Fix Script
 * This script diagnoses and fixes common issues preventing self-healing from working
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SelfHealingTroubleshooter {
  constructor() {
    this.projectRoot = process.cwd();
    this.issues = [];
    this.fixes = [];
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

  async diagnoseIssues() {
    this.log('🔍 Diagnosing self-healing issues...');

    // Check 1: Nx Cloud connection
    await this.checkNxCloudConnection();

    // Check 2: Self-healing configuration
    await this.checkSelfHealingConfig();

    // Check 3: Test failures
    await this.analyzeTestFailures();

    // Check 4: Cache issues
    await this.checkCacheIssues();

    return this.issues;
  }

  async checkNxCloudConnection() {
    try {
      const nxJson = JSON.parse(fs.readFileSync('nx.json', 'utf8'));
      const nxCloudJson = fs.existsSync('nx-cloud.json')
        ? JSON.parse(fs.readFileSync('nx-cloud.json', 'utf8'))
        : null;

      if (!nxJson.nxCloudId && !nxCloudJson?.nxCloudId) {
        this.issues.push({
          type: 'connection',
          severity: 'high',
          message: 'No Nx Cloud ID found',
          fix: 'Run: npx nx connect-to-nx-cloud',
        });
      } else {
        this.log('✅ Nx Cloud connection configured', 'success');
      }

      if (!nxJson.tasksRunnerOptions?.default?.runner === 'nx-cloud') {
        this.issues.push({
          type: 'runner',
          severity: 'high',
          message: 'Nx Cloud runner not configured',
          fix: 'Update nx.json with nx-cloud runner',
        });
      }
    } catch (error) {
      this.issues.push({
        type: 'config',
        severity: 'high',
        message: `Configuration error: ${error.message}`,
        fix: 'Check nx.json syntax',
      });
    }
  }

  async checkSelfHealingConfig() {
    try {
      const nxCloudJson = fs.existsSync('nx-cloud.json')
        ? JSON.parse(fs.readFileSync('nx-cloud.json', 'utf8'))
        : null;

      const nxJson = JSON.parse(fs.readFileSync('nx.json', 'utf8'));

      const selfHealingConfig =
        nxCloudJson?.tasksRunnerOptions?.default?.options?.selfHealing ||
        nxJson?.tasksRunnerOptions?.default?.options?.selfHealing;

      if (!selfHealingConfig?.enabled) {
        this.issues.push({
          type: 'self-healing',
          severity: 'medium',
          message: 'Self-healing not enabled',
          fix: 'Enable self-healing in configuration',
        });
      } else {
        this.log('✅ Self-healing is enabled', 'success');
      }
    } catch (error) {
      this.log(
        `❌ Error checking self-healing config: ${error.message}`,
        'error'
      );
    }
  }

  async analyzeTestFailures() {
    this.log('🧪 Analyzing test failures...');

    try {
      // Check component-pantry test specifically
      const testFile =
        'libs/component-pantry/src/lib/component-pantry/component-pantry.spec.ts';
      const componentFile =
        'libs/component-pantry/src/lib/component-pantry/component-pantry.ts';

      if (fs.existsSync(testFile) && fs.existsSync(componentFile)) {
        // Run the specific failing test to get error details
        try {
          execSync(
            'npx nx test component-pantry --testNamePattern="should create"',
            { stdio: 'pipe' }
          );
          this.log('✅ component-pantry test is now passing', 'success');
        } catch (error) {
          const errorOutput =
            error.stdout?.toString() || error.stderr?.toString() || '';

          if (
            errorOutput.includes('Cannot find module') ||
            errorOutput.includes('import')
          ) {
            this.issues.push({
              type: 'import',
              severity: 'high',
              message:
                'Import/module resolution error in component-pantry test',
              fix: 'Fix import statements and module configuration',
              details: errorOutput,
            });
          } else if (
            errorOutput.includes('Template parse errors') ||
            errorOutput.includes('templateUrl')
          ) {
            this.issues.push({
              type: 'template',
              severity: 'medium',
              message: 'Template file missing or invalid',
              fix: 'Create or fix component template file',
              details: errorOutput,
            });
          } else {
            this.issues.push({
              type: 'test',
              severity: 'medium',
              message: 'Generic test failure in component-pantry',
              fix: 'Review test configuration and component setup',
              details: errorOutput,
            });
          }
        }
      }
    } catch (error) {
      this.log(`❌ Error analyzing tests: ${error.message}`, 'error');
    }
  }

  async checkCacheIssues() {
    try {
      // Check if cache might be corrupted
      const cacheDir = path.join(this.projectRoot, 'node_modules', '.cache');
      if (fs.existsSync(cacheDir)) {
        this.log('📦 Cache directory exists', 'info');

        // Suggest cache clear as a potential fix
        this.fixes.push({
          type: 'cache',
          action: 'Clear Nx cache',
          command: 'npx nx reset',
        });
      }
    } catch (error) {
      this.log(`❌ Error checking cache: ${error.message}`, 'error');
    }
  }

  async applyFixes() {
    this.log('🔧 Applying automatic fixes...');

    for (const issue of this.issues) {
      switch (issue.type) {
        case 'template':
          await this.fixTemplateIssue();
          break;
        case 'import':
          await this.fixImportIssue();
          break;
        case 'cache':
          await this.clearCache();
          break;
        default:
          this.log(`⚠️  Manual fix required for: ${issue.message}`, 'warning');
          this.log(`   Fix: ${issue.fix}`, 'info');
      }
    }
  }

  async fixTemplateIssue() {
    const templatePath =
      'libs/component-pantry/src/lib/component-pantry/component-pantry.html';

    if (!fs.existsSync(templatePath)) {
      this.log('🔧 Creating missing template file...', 'info');

      const templateContent = `<div class="component-pantry">
  <h2>Component Pantry</h2>
  <p>Welcome to the component pantry!</p>
</div>`;

      fs.writeFileSync(templatePath, templateContent);
      this.log('✅ Template file created', 'success');
    }
  }

  async fixImportIssue() {
    this.log('🔧 Checking component imports...', 'info');

    const componentPath =
      'libs/component-pantry/src/lib/component-pantry/component-pantry.ts';

    if (fs.existsSync(componentPath)) {
      let content = fs.readFileSync(componentPath, 'utf8');

      // Ensure standalone component is properly configured
      if (!content.includes('standalone: true')) {
        content = content.replace(
          '@Component({',
          '@Component({\n  standalone: true,'
        );

        fs.writeFileSync(componentPath, content);
        this.log('✅ Added standalone: true to component', 'success');
      }
    }
  }

  async clearCache() {
    this.log('🔧 Clearing Nx cache...', 'info');

    try {
      execSync('npx nx reset', { stdio: 'inherit' });
      this.log('✅ Cache cleared successfully', 'success');
    } catch (error) {
      this.log(`❌ Failed to clear cache: ${error.message}`, 'error');
    }
  }

  async testSelfHealing() {
    this.log('🧪 Testing self-healing functionality...', 'info');

    try {
      // Run the failing test again to see if self-healing kicks in
      execSync('npx nx test component-pantry --verbose', { stdio: 'inherit' });
      this.log('✅ Tests are now passing!', 'success');
    } catch (error) {
      this.log(
        '❌ Tests still failing. Check Nx Cloud dashboard for self-healing suggestions.',
        'warning'
      );
      this.log('   Dashboard: https://cloud.nx.app', 'info');
    }
  }

  async generateReport() {
    this.log('\n📊 Self-Healing Diagnostic Report', 'info');
    this.log('================================', 'info');

    if (this.issues.length === 0) {
      this.log(
        '✅ No issues found! Self-healing should be working.',
        'success'
      );
    } else {
      this.log(`Found ${this.issues.length} issue(s):`, 'warning');

      this.issues.forEach((issue, index) => {
        this.log(
          `\n${index + 1}. ${issue.message}`,
          issue.severity === 'high' ? 'error' : 'warning'
        );
        this.log(`   Severity: ${issue.severity}`, 'info');
        this.log(`   Fix: ${issue.fix}`, 'info');
        if (issue.details) {
          this.log(`   Details: ${issue.details.substring(0, 200)}...`, 'info');
        }
      });
    }

    this.log('\n🔧 Recommended Actions:', 'info');
    this.log('1. Commit the configuration changes', 'info');
    this.log('2. Push to trigger CI pipeline', 'info');
    this.log('3. Monitor Nx Cloud dashboard for self-healing activity', 'info');
    this.log('4. Review and approve suggested fixes', 'info');

    this.log('\n📱 Useful Commands:', 'info');
    this.log('- Check Nx Cloud status: npx nx-cloud status', 'info');
    this.log('- Run affected tests: npx nx affected:test', 'info');
    this.log('- Clear cache: npx nx reset', 'info');
    this.log('- View dashboard: https://cloud.nx.app', 'info');
  }

  async run() {
    try {
      await this.diagnoseIssues();
      await this.applyFixes();
      await this.testSelfHealing();
      await this.generateReport();
    } catch (error) {
      this.log(`❌ Troubleshooting failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run the troubleshooter if this script is executed directly
if (require.main === module) {
  const troubleshooter = new SelfHealingTroubleshooter();
  troubleshooter.run();
}

module.exports = SelfHealingTroubleshooter;
