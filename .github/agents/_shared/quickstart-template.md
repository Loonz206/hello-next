# 🚀 QUICK START - DO THIS NOW

This template is embedded in agent workflows to provide consistent, action-oriented guidance. Replace `[COMMAND]`, `[GOAL]`, `[THRESHOLD]` with agent-specific values.

## Standard 3-Step Pattern

### 1. [First Action - Auto-Fix/Run]

```bash
[PRIMARY_COMMAND]     # [Purpose description]
```

**Expected outcome**: [Success criterion]

### 2. [Second Action - Verify]

```bash
[VERIFICATION_COMMAND]
```

**Expected outcome**: [Success criterion]

### 3. [Third Action - Confirm/Report]

```bash
[FINAL_COMMAND]
```

**Expected outcome**: [Success criterion - if any fails, repeat step 1]

---

## Agent-Specific Examples

### For Lint Agent

- _Step 1_: `npm run format` → Fixes 90% of issues automatically
- _Step 2_: `npm run lint` → Check remaining issues
- _Step 3_: `npm run tsc` → Catch type errors

### For Test Agent

- _Step 1_: `npm run test` → Run all Jest tests
- _Step 2_: `npm run coverage` → Check >80% threshold
- _Step 3_: `npm run e2e:test` → Run Cypress E2E tests

### For React Agent

- _Step 1_: `npm run lint -- --fix` → Auto-fix React issues
- _Step 2_: `npm run test -- src/components` → Test components
- _Step 3_: `npm run validate` → Verify all checks pass

### For API Agent

- _Step 1_: `npm run format` → Format API code
- _Step 2_: `npm run test -- api/` → Test API logic
- _Step 3_: `npm run validate` → Verify API patterns

### For Docs Agent

- _Step 1_: `npm run lint:md` → Lint markdown
- _Step 2_: `npm run lint:md:fix` → Fix markdown issues
- _Step 3_: `npm run validate` → Verify docs

### For Architecture Agent

- _Step 1_: Review module imports with `grep` or IDE search
- _Step 2_: Verify circular dependencies absent
- _Step 3_: Confirm layering (pages → components → utils)

### For Performance Agent

- _Step 1_: `npm run build` → Build optimized bundle
- _Step 2_: `npm run analyze` → Check bundle size
- _Step 3_: `npm run lighthouse` → Run performance audit

### For Refactoring Agent

- _Step 1_: Auto-fix with linting tools
- _Step 2_: Run tests to verify correctness
- _Step 3_: Verify coverage thresholds

### For Package Agent

- _Step 1_: `npm audit` → Identify vulnerabilities
- _Step 2_: `npm update` → Update safe deps
- _Step 3_: `npm run validate` → Verify no breaking changes

### For Technical Debt Agent

- _Step 1_: Collect findings from architecture/performance/test agents
- _Step 2_: Prioritize by impact (severity × frequency)
- _Step 3_: Document improvement roadmap
