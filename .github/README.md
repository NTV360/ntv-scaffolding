# CI/CD Configuration

This directory contains GitHub Actions workflows for the ntv-scaffolding project.

## Workflows

### CI Workflow (`ci.yml`)

The main CI workflow runs on every push and pull request to `main` and `development` branches. It includes:

- **Caching Strategy**: Multiple layers of caching for optimal performance

  - Node.js dependencies (`node_modules`)
  - Nx build cache (`.nx/cache`)
  - npm cache via `setup-node` action

- **Nx Cloud Integration**: Distributed caching and execution for faster builds
- **Parallel Execution**: Runs linting, testing, and building in parallel where possible
- **Affected Projects**: Only runs tasks on projects affected by changes

## Cache Optimization

To maximize cache hit rates:

1. **Consistent Dependencies**: Keep `package-lock.json` stable
2. **Incremental Changes**: Make smaller, focused commits
3. **Nx Cloud**: Leverages distributed caching across all CI runs
4. **Parallel Jobs**: Reduces overall CI time while maintaining cache efficiency

## Expected Cache Performance

With this setup, you should see:

- **Cache Hit Rate**: 60-90% for typical development workflows
- **Time Saved**: 2-5 minutes per CI run (depending on project size)
- **Build Performance**: Significantly faster builds for unchanged code

## Monitoring

Monitor your cache performance in:

- Nx Cloud dashboard (linked to your project)
- GitHub Actions workflow logs
- Cache hit/miss statistics in workflow summaries
