# Nx Self-Healing Examples and Use Cases

## Common Self-Healing Scenarios

### 1. Flaky Test Detection and Resolution

**Problem**: Tests that pass/fail intermittently

```bash
# Example flaky test output
FAIL apps/ntv-host-installation/host-installation/src/app/app.spec.ts
  ● AppComponent › should create
    Expected false to be true
```

**Self-Healing Action**:

- Automatically retries the test up to 3 times
- Marks test as flaky if it passes on retry
- Suggests test stabilization improvements

### 2. Dependency Conflicts

**Problem**: Package version conflicts

```bash
npm ERR! peer dep missing: @angular/core@^17.0.0
```

**Self-Healing Action**:

- Analyzes dependency tree
- Suggests compatible version ranges
- Proposes package.json updates

### 3. Lint Auto-Fixes

**Problem**: Fixable linting errors

```bash
ERROR: Missing semicolon (semi)
ERROR: Trailing comma required (comma-dangle)
```

**Self-Healing Action**:

- Automatically applies ESLint --fix
- Commits fixes with descriptive message
- Continues CI pipeline

### 4. Build Cache Issues

**Problem**: Stale cache causing build failures

```bash
ERROR: Module not found: Can't resolve './component'
```

**Self-Healing Action**:

- Clears affected cache entries
- Rebuilds dependencies
- Retries build process

## Implementation Examples for Your Project

### Component Library Self-Healing

```typescript
// libs/component-pantry/self-healing.config.ts
export const componentLibraryRules = {
  'storybook-build-failure': {
    condition: (error: string) => error.includes('Storybook build failed'),
    action: 'clear-storybook-cache',
    autoApply: true,
  },
  'component-test-failure': {
    condition: (error: string) => error.includes('Component should render'),
    action: 'retry-with-fresh-dom',
    maxRetries: 2,
  },
};
```

### Host Installation App Self-Healing

```typescript
// apps/ntv-host-installation/self-healing.config.ts
export const hostInstallationRules = {
  'e2e-timeout': {
    condition: (error: string) => error.includes('Timeout'),
    action: 'increase-timeout',
    parameters: { timeout: 30000 },
  },
  'angular-build-error': {
    condition: (error: string) => error.includes('ng build failed'),
    action: 'clear-angular-cache',
    autoApply: true,
  },
};
```

## Self-Healing Workflow Examples

### 1. Automated Test Retry Workflow

```yaml
# .github/workflows/self-healing-tests.yml
name: Self-Healing Tests

on:
  workflow_run:
    workflows: ['CI']
    types: [completed]
    branches: [main]

jobs:
  analyze-failures:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Analyze Test Failures
        run: |
          npx nx run-many -t test --verbose --maxWorkers=1

      - name: Apply Self-Healing Fixes
        run: |
          npx nx run workspace:self-heal --dry-run=false
```

### 2. Dependency Update Self-Healing

```typescript
// tools/self-healing/dependency-updater.ts
export class DependencyUpdater {
  async healDependencyConflicts() {
    const conflicts = await this.detectConflicts();

    for (const conflict of conflicts) {
      const resolution = await this.suggestResolution(conflict);

      if (resolution.confidence > 0.8) {
        await this.applyResolution(resolution);
        console.log(`Auto-resolved: ${conflict.package}`);
      } else {
        await this.createPullRequest(resolution);
        console.log(`PR created for: ${conflict.package}`);
      }
    }
  }
}
```

## Monitoring and Alerts

### Dashboard Metrics to Track

1. **Self-Healing Success Rate**

   - Percentage of issues automatically resolved
   - Time saved by automation

2. **Common Failure Patterns**

   - Most frequent CI failures
   - Trending issues over time

3. **Manual Intervention Required**
   - Issues that need human review
   - Complex conflicts requiring decisions

### Alert Configuration

```typescript
// nx-cloud.config.ts - Alert settings
export const alertConfig = {
  selfHealingFailure: {
    threshold: 3, // Alert after 3 consecutive failures
    channels: ['slack', 'email'],
    severity: 'high',
  },
  unusualFailurePattern: {
    threshold: 5, // Alert if same error occurs 5+ times
    channels: ['slack'],
    severity: 'medium',
  },
};
```

## Best Practices

### 1. Gradual Rollout

```bash
# Start with manual approval
nx.json: "autoApplyFixes": false

# After confidence builds, enable auto-fixes for safe operations
nx.json: "autoApplyFixes": true, "safeOperationsOnly": true
```

### 2. Test Self-Healing Rules

```bash
# Test your self-healing configuration
npx nx run workspace:test-self-healing --dry-run

# Validate rules against historical failures
npx nx run workspace:validate-healing-rules --since=30days
```

### 3. Monitor Impact

```bash
# Generate self-healing report
npx nx run workspace:self-healing-report --format=json

# Track metrics over time
npx nx run workspace:healing-metrics --period=weekly
```

## Troubleshooting Common Issues

### Issue: Self-Healing Not Triggering

**Solution**:

```bash
# Check Nx Cloud connection
npx nx reset
npx nx connect-to-nx-cloud

# Verify configuration
cat nx.json | grep -A 10 "selfHealing"
```

### Issue: Too Many Auto-Fixes

**Solution**:

```json
{
  "selfHealing": {
    "enabled": true,
    "autoApplyFixes": false,
    "requireApproval": ["dependency-updates", "config-changes"]
  }
}
```

### Issue: Missing Failure Context

**Solution**:

```typescript
// Enhanced error reporting
export const errorReporting = {
  includeStackTrace: true,
  includeBuildLogs: true,
  includeEnvironmentInfo: true,
  maxLogLines: 100,
};
```

## Integration with Your Current Workflow

### For Component Development

```bash
# Self-healing for component library
nx affected:test --with-self-healing
nx affected:lint --auto-fix
nx affected:build --retry-on-failure
```

### For Application Development

```bash
# Self-healing for host installation app
nx e2e host-installation-e2e --with-healing
nx build host-installation --optimize-on-failure
```

### For CI/CD Pipeline

```bash
# Full pipeline with self-healing
nx affected -t lint test build e2e --parallel=3 --with-self-healing
```

This comprehensive self-healing setup will help maintain your CI/CD pipeline health automatically while learning from patterns specific to your ntv-scaffolding project.
