# Nx Self-Healing CI Implementation Guide

## Overview

This guide explains how to implement Nx Self-Healing CI for the ntv-scaffolding monorepo.

## Current Project Structure

- **Apps**: `apps/ntv-host-installation/`
- **Libraries**: `libs/component-pantry/`
- **E2E Tests**: `apps/ntv-host-installation/host-installation-e2e/`

## Step 1: Connect to Nx Cloud

```bash
# Connect your workspace to Nx Cloud
npx nx connect-to-nx-cloud

# This will:
# - Create an nx-cloud.json configuration file
# - Add your workspace to Nx Cloud
# - Enable distributed task execution and caching
```

## Step 2: Configure CI Pipeline

### For GitHub Actions (.github/workflows/ci.yml):

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci

      - uses: nrwl/nx-set-shas@v4

      # Run affected tasks with Nx Cloud
      - run: npx nx affected -t lint test build e2e --parallel=3
```

## Step 3: Self-Healing Features

### Automatic Capabilities:

1. **Flaky Test Detection**: Identifies and re-runs flaky tests automatically
2. **Dependency Resolution**: Suggests fixes for dependency conflicts
3. **Configuration Issues**: Detects and proposes fixes for common config problems
4. **Build Failures**: Analyzes build errors and suggests solutions

### Manual Configuration Options:

#### Enable Advanced Self-Healing in nx.json:

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx-cloud",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "accessToken": "your-access-token",
        "selfHealing": {
          "enabled": true,
          "autoApplyFixes": false,
          "notificationChannels": ["slack", "email"]
        }
      }
    }
  }
}
```

## Step 4: Monitoring and Alerts

### Set up notifications for:

- CI failures and auto-fixes
- Performance degradation
- Flaky test patterns
- Dependency vulnerabilities

## Step 5: Best Practices for Your Project

### For Component Library (`libs/component-pantry`):

```bash
# Ensure proper testing setup
nx test component-pantry
nx lint component-pantry
nx build component-pantry
```

### For Host Installation App:

```bash
# Run comprehensive checks
nx affected:test
nx affected:lint
nx affected:build
nx affected:e2e
```

## Step 6: Advanced Configuration

### Custom Healing Rules:

```typescript
// nx-cloud.config.ts
export default {
  selfHealing: {
    rules: [
      {
        name: 'retry-flaky-tests',
        condition: 'test-failure',
        action: 'retry',
        maxRetries: 3,
      },
      {
        name: 'update-snapshots',
        condition: 'snapshot-mismatch',
        action: 'update-snapshots',
        autoApply: false,
      },
    ],
  },
};
```

## Monitoring Dashboard

Access your Nx Cloud dashboard to:

- View self-healing activity
- Monitor CI performance
- Review suggested fixes
- Configure notification preferences

## Expected Benefits for Your Project

1. **Reduced CI Downtime**: Automatic resolution of common issues
2. **Faster Development**: Less time spent on CI maintenance
3. **Better Code Quality**: Proactive identification of issues
4. **Cost Optimization**: Efficient resource usage through intelligent caching

## Next Steps

1. Connect to Nx Cloud: `npx nx connect-to-nx-cloud`
2. Set up CI pipeline with the provided configuration
3. Monitor the dashboard for self-healing activity
4. Configure notifications and alerts
5. Review and approve suggested fixes

## Troubleshooting

### Common Issues:

- **Access Token**: Ensure your Nx Cloud access token is properly configured
- **Permissions**: Verify CI has necessary permissions for auto-fixes
- **Network**: Check firewall settings for Nx Cloud connectivity

### Support Resources:

- [Nx Cloud Documentation](https://nx.dev/ci/intro/ci-with-nx)
- [Self-Healing CI Guide](https://nx.dev/ci/features/self-healing-ci)
- [Community Support](https://github.com/nrwl/nx/discussions)
