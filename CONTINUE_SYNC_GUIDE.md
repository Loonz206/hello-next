# Continue IDE & Copilot Agents Sync Guide

## Overview

This guide explains how to keep **Continue IDE rules** in sync with **Copilot agents** in the hello-next project.

- **Source of Truth**: `.github/agents/*.agent.md` (Copilot agents)
- **Synced Target**: `.continue/rules/NN-*.md` (Continue IDE rules)
- **Sync Automation**: `npm run sync:continue`

---

## Quick Start

### Automatic Sync (Most Common)

```bash
# Sync all agents to Continue rules
npm run sync:continue
```

This generates/updates all `.continue/rules/NN-*.md` files and updates `.continuerc.json`.

### Manual Trigger

**When to run**:

- After adding a new agent to `.github/agents/`
- After updating agent descriptions or core content
- Before committing changes to `.github/agents/`
- When troubleshooting sync issues

**Steps**:

```bash
# 1. Make changes to .github/agents/*.agent.md files
# 2. Run sync
npm run sync:continue

# 3. Verify output (look for ✅ checkmarks)
# 4. Commit the updated .continue/rules/ files
git add .continue/rules/
git add .continuerc.json
git commit -m "chore: sync Continue rules from agents"
```

---

## Agent-to-Rule Mapping

The sync script uses this predefined mapping:

| .github/agents File          | →   | .continue/rules File       | Applies To                                   |
| ---------------------------- | --- | -------------------------- | -------------------------------------------- |
| `quality-standards.agent.md` | →   | `01-code-quality.md`       | `**/*.ts`, `**/*.tsx`, `**/*.js`, `**/*.jsx` |
| `lint.agent.md`              | →   | `02-lint-standards.md`     | `**/*.ts`, `**/*.tsx`, `**/*.js`, `**/*.jsx` |
| `test.agent.md`              | →   | `03-testing.md`            | `**/*.test.ts`, `**/*.spec.ts`, etc.         |
| `react.agent.md`             | →   | `04-react.md`              | `**/*.tsx`, component files                  |
| `api.agent.md`               | →   | `05-api-patterns.md`       | API/data fetching files                      |
| `docs.agent.md`              | →   | `06-documentation.md`      | `**/*.md` files                              |
| `package.agent.md`           | →   | `07-package-management.md` | `package.json`, `.npmrc`, etc.               |
| `research.agent.md`          | →   | `08-research.md`           | `**/*` (all files)                           |

---

## Step-by-Step: Adding a New Agent

### 1. Create New Agent File

Create `.github/agents/my-new-agent.agent.md`:

```markdown
---
name: My New Agent
description: Description of what this agent does
tools: [search, web/fetch]
agents: []
target: vscode
handoffs: []
---

# My New Agent

## Overview

...
```

### 2. Add Mapping (for automation)

Edit `scripts/sync-continue.js`:

```javascript
const AGENT_MAPPING = {
  // ... existing mappings ...
  "my-new-agent.agent.md": {
    num: "09", // Next available number
    name: "my-new-feature",
    globs: ["**/*.ts", "**/*.tsx"], // Glob patterns this rule applies to
  },
};
```

### 3. Run Sync

```bash
npm run sync:continue
```

Output should show:

```
✅ Synced: my-new-agent.agent.md → 09-my-new-feature.md
```

### 4. Verify Results

Check that `.continue/rules/09-my-new-feature.md` was created:

```bash
ls -la .continue/rules/ | grep 09
```

Check that `.continuerc.json` updated:

```bash
grep -A 2 "My New Feature" .continuerc.json
```

### 5. Document the Agent

Update the agent file with:

- Clear frontmatter (name, description, tools, agents, target)
- Comprehensive sections with best practices
- Shell commands and code examples
- Links to resources

### 6. Document in Docs Agent (Optional)

If the new agent relates to documentation, add a reference in `.github/agents/docs.agent.md`:

```markdown
## Continue Commands for [My New Agent]

The sync script automatically mirrors this agent to `.continue/rules/09-my-new-feature.md`.

When new features are needed:

1. Update this agent
2. Run `npm run sync:continue`
3. Continue rules auto-update
```

### 7. Commit Changes

```bash
git add .github/agents/my-new-agent.agent.md
git add .continue/rules/09-my-new-feature.md
git add .continuerc.json
git add scripts/sync-continue.js  # If you updated mapping
git commit -m "feat: add my-new-agent with Continue sync"
```

---

## Step-by-Step: Updating an Existing Agent

### 1. Edit Agent File

Modify `.github/agents/lint.agent.md` with new content or updated sections.

### 2. Run Sync

```bash
npm run sync:continue
```

Output:

```
✅ Synced: lint.agent.md → 02-lint-standards.md
```

### 3. Verify Changes

Compare old and new rule files:

```bash
git diff .continue/rules/02-lint-standards.md
```

### 4. Commit

```bash
git add .github/agents/lint.agent.md
git add .continue/rules/02-lint-standards.md
git commit -m "docs: update lint agent and sync to Continue"
```

---

## Troubleshooting

### Issue: Sync script not found

**Error**: `Cannot find module 'scripts/sync-continue.js'`

**Fix**:

```bash
# Verify file exists
ls -la scripts/sync-continue.js

# Make executable (macOS/Linux)
chmod +x scripts/sync-continue.js
```

## Issue: Rule file not created

**Error**: `ℹ️  Unmapped agent: my-agent.agent.md`

**Fix**:

1. Check agent filename matches `AGENT_MAPPING` in `scripts/sync-continue.js`
2. Add mapping if new agent:

   ```javascript
   'my-agent.agent.md': { num: '09', name: 'my-agent', globs: ['**/*.ts'] }
   ```

3. Re-run sync

### Issue: .continuerc.json not updating

**Error**: `.continuerc.json` rules array unchanged after sync

**Fix**:

1. Verify `.continuerc.json` exists:

   ```bash
   test -f .continuerc.json && echo "File exists"
   ```

2. Check for JSON syntax errors:

   ```bash
   cat .continuerc.json | jq empty
   ```

3. Manually restore from backup and re-run sync:

   ```bash
   git checkout .continuerc.json
   npm run sync:continue
   ```

### Issue: Rule file content is wrong

**Error**: `.continue/rules/06-documentation.md` missing sections from `docs.agent.md`

**Fix**:

1. Verify agent file frontmatter is valid YAML:

   ```bash
   head -15 .github/agents/docs.agent.md
   ```

2. Check that frontmatter ends with `---` on its own line

3. Re-run sync with verbose output:

   ```bash
   npm run sync:continue 2>&1 | grep -E "(✅|⚠️|❌)"
   ```

4. If still broken, manually edit `.continue/rules/06-documentation.md`

---

## Pre-commit Hook Setup (Optional)

To automatically run sync before commits:

```bash
# Create/update .husky/pre-commit
echo '#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Sync Continue rules before commit
npm run sync:continue' > .husky/pre-commit

chmod +x .husky/pre-commit
```

Then agents → Continue rules sync automatically on every commit.

---

## CI/CD Integration (Optional)

To ensure sync is always current in CI:

**GitHub Actions** (`.github/workflows/sync-continue.yml`):

```yaml
name: Sync Continue Rules

on:
  push:
    paths:
      - ".github/agents/**"
      - "scripts/sync-continue.js"

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
      - run: npm run sync:continue
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: sync Continue rules from agents"
          file_pattern: ".continue/rules/** .continuerc.json"
```

---

## FAQ

### Q: What happens if I manually edit a `.continue/rules/` file?

**A**: Your manual edits will be overwritten the next time you run `npm run sync:continue`. Always edit the source `.github/agents/*.agent.md` file instead, then sync.

### Q: Can I have rules that don't sync from agents?

**A**: Yes! Files like `.continue/rules/coding-rules.md` that don't have an agent can be manually maintained. Only mapped agents get auto-synced.

### Q: How do I know if sync succeeded?

**A**: Run:

```bash
npm run sync:continue
```

Look for output:

- ✅ = Synced successfully
- ⚠️ = Warning (check error details)
- ❌ = Error (fix and re-run)
- ℹ️ = Info (unmapped agent, add to mapping)

### Q: Do I need to commit `.continue/rules/` files?

**A**: Yes! The `.continue/rules/` files should be committed so all developers have the same Continue setup.

### Q: What if sync introduces unintended changes?

**A**: Review the diff:

```bash
git diff .continue/rules/
```

If changes are wrong:

1. Revert the generated files: `git checkout .continue/rules/`
2. Fix the source agent file
3. Re-run sync

---

## Related Documentation

- [Codepilot Instructions](./.github/codepilot-instructions.md) - Main guide for all agents
- [Docs Agent](./.github/agents/docs.agent.md) - Documentation standards
- [Continue Setup](./CONTINUE_SETUP.md) - Initial Continue IDE setup
- [Sync Script](./scripts/sync-continue.js) - Implementation details

---

**Last Updated**: February 9, 2026
**Version**: 1.0
**Status**: ✅ Complete sync workflow established
