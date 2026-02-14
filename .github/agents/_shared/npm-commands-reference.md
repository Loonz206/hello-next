# NPM Commands Reference

Centralized reference for all npm scripts used across agents.

---

## Code Quality Pipeline

### Formatting & Linting

```bash
npm run format               # Auto-fix all linting issues (Prettier + ESLint)
npm run format:check        # Check if files are formatted correctly
npm run lint                # Run ESLint validation
npm run lint -- --fix       # Auto-fix ESLint issues
npm run lint:md             # Lint markdown files
npm run lint:md:fix         # Fix markdown linting issues
npm run check-format        # Verify formatting consistency
npm run validate            # Run format + lint checks in parallel
```

**Success Criteria**:

- No ESLint errors (warnings OK for non-blocking rules)
- Pickle consistency matches project standards
- All markdown files follow documentation standards

---

## Testing Pipeline

### Unit Tests (Jest)

```bash
npm run test                              # Run all tests (once)
npm run test -- --watch                   # Run tests in watch mode (development)
npm run test -- --coverage                # Run tests with coverage report (alias: npm run coverage)
npm run coverage                          # Generate coverage report with >80% threshold check
npm run test -- src/components            # Test specific folder
npm run test -- Button.test.tsx            # Test specific file
npm run test -- --testNamePattern="login" # Run tests matching pattern
npm run test -- -u                        # Update snapshots
```

**Success Criteria**:

- All tests pass (0 failures)
- Coverage ≥ 80% for: lines, branches, functions, statements
- Watch mode refreshes immediately on save

### E2E Tests (Cypress)

```bash
npm run e2e:test            # Run Cypress E2E tests (headless)
npm run e2e:open            # Open Cypress interactive test runner (GUI)
npm run e2e:debug           # Run with verbose debugging output
npm run e2e:ci              # Run in CI environment (strict mode)
```

**Success Criteria**:

- All E2E tests pass
- Critical user workflows validated
- Accessibility checks pass (cypress-axe)

---

## Build & Optimization

### Development Build

```bash
npm run dev                 # Start Next.js development server
npm run build               # Build optimized production bundle
npm run start               # Start production server (requires build first)
npm run build -- --debug    # Build with verbose output
```

### Bundle Analysis

```bash
npm run analyze             # Analyze bundle size with webpack-bundle-analyzer
npm run analyze:legacy      # Analyze bundle for legacy browser support
npm run lighthouse          # Run Lighthouse performance audit
npm run lighthouse -- --headless  # Run without interactive browser
```

**Success Criteria**:

- Build completes without errors
- No critical performance regressions
- Core Web Vitals scores acceptable
- Bundle size within threshold

---

## Type Safety

### TypeScript

```bash
npm run tsc                 # Run TypeScript type checking (no compilation)
npm run tsc -- --noEmit     # Check types without writing files
npm run tsc:watch           # Watch mode for type checking
npm run type-check          # Alias for tsc --noEmit
```

**Success Criteria**:

- Zero type errors
- All TypeScript strict mode rules pass
- Generic types properly inferred

---

## Git Hooks & Pre-Commit

### Husky Hooks

```bash
npm run prepare              # Install Husky git hooks (runs automatically after npm install)
npm run husky install       # Manual Husky installation
```

### Lint-Staged (Pre-commit Validation)

**Automatic on `git commit`**:

- Stages only changed files
- Runs: `npm run format && npm run lint`
- Prevents commits with failing checks

**Manual trigger**:

```bash
npm run lint-staged         # Manually run lint-staged on staged files
```

---

## Sync & Update

### Continuous Integration

```bash
npm run sync:continue       # Sync agents to Continue IDE rules (updates .continue/rules/*.md)
npm run ci                  # Full CI pipeline: lint + test + build
npm audit                   # Check for vulnerable dependencies
npm audit fix               # Auto-fix vulnerable dependencies
npm update --save           # Update dependencies (safe updates)
npm outdated                # List outdated packages
```

### Dependency Management

```bash
npm install                 # Install dependencies from package-lock.json
npm install --save package-name         # Install + add to package.json
npm install --save-dev package-name     # Install as dev dependency
npm uninstall package-name              # Remove dependency
npm list                    # Show installed packages tree
npm list --depth=0          # Show only top-level packages
npm search keyword          # Search npm registry
```

---

## Common Workflows

### After Git Pull

```bash
npm install                 # Install new/updated dependencies
npm run validate            # Quick validation: lint + format check
npm run test                # Run tests to verify nothing broke
npm run build               # Build to catch any compilation errors
```

### Before Committing Code

```bash
npm run format              # Auto-fix formatting
npm run lint -- --fix       # Auto-fix linting issues
npm run test -- Button.test.tsx  # Test what you changed
npm run type-check          # Quick type validation
# Git will run Husky pre-commit hooks automatically
```

### Debugging Test Failures

```bash
npm run test -- Button.test.tsx --watch     # Watch mode for single file
npm run coverage                             # Full coverage report
npm run test -- --verbose                    # Detailed test output
npm run test -- --bail                       # Stop on first failure
```

### Performance Investigation

```bash
npm run build               # Build production bundle
npm run analyze             # View bundle composition
npm run lighthouse          # Run Lighthouse audit
open coverage/lcov-report/index.html        # View test coverage
```

### Preparing for Pull Request

```bash
npm run format              # Auto-fix all formatting
npm run lint -- --fix       # Auto-fix linting
npm run test -- --coverage  # Full test + coverage run
npm run build               # Final production build check
npm run type-check          # Verify no type errors
```

---

## Troubleshooting

### "npm run X" not found

1. Check `package.json` scripts section
2. Verify spelling: `npm run` (not `npm` alone)
3. Try `npm install` to ensure dependencies installed
4. Clear npm cache: `npm cache clean --force`

### Tests hang or timeout

```bash
npm run test -- --testTimeout=30000  # Increase timeout to 30s
npm run test -- --bail               # Stop on first failure
npm run test -- --runInBand          # Disable parallel execution
```

### Build fails with TypeScript errors

```bash
npm run tsc                 # See all type errors
npm run lint -- --fix       # Fix linting issues
npm run format              # Format code
npm run build               # Retry build
```

### Node modules issues

```bash
rm -rf node_modules package-lock.json
npm install                 # Clean reinstall
```

---

## Reference Table

| Task                | Command                                | When to Use                        |
| ------------------- | -------------------------------------- | ---------------------------------- |
| **Quick Start**     | `npm run validate`                     | Before committing, quick check     |
| **Pre-commit**      | `npm run format && npm run lint --fix` | Automatic with Husky               |
| **Testing**         | `npm run coverage`                     | Before pull request                |
| **Build Check**     | `npm run build`                        | CI/CD validation, pre-merge        |
| **Type Check**      | `npm run tsc`                          | Continuous development             |
| **E2E Tests**       | `npm run e2e:test`                     | Release validation, critical paths |
| **Performance**     | `npm run analyze`                      | Before deployment                  |
| **Full Validation** | `npm run ci`                           | Final pre-merge check              |
