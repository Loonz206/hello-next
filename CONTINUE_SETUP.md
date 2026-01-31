# Continue Setup Quick Reference

## ✅ What Was Created

Your project now has a complete Continue AI setup mirroring your existing `.github` agent instructions.

### Directory Structure

Continue IDE configuration with 8 auto-synced rule files:

```
hello-next/
├── .continue/
│   ├── rules/
│   │   ├── 01-code-quality.md
│   │   ├── 02-lint-standards.md
│   │   ├── 03-testing.md
│   │   ├── 04-react.md
│   │   ├── 05-api-patterns.md
│   │   ├── 06-documentation.md
│   │   ├── 07-package-management.md
│   │   └── 08-research.md
│   │   └── coding-rules.md              ← Additional coding guidelines
│   ├── prompts/                         ← Custom slash commands (manually maintained)
│   │   ├── generate-unit-test.md
│   │   ├── create-feature-docs.md
│   │   ├── refactor-component.md
│   │   ├── create-api-hook.md
│   │   ├── add-e2e-test.md
│   │   └── fix-code-quality.md
│   ├── README.md                        ← Continue setup documentation
│   └── environment.json                 ← Environment variables
├── .continuerc.json                     ← Workspace configuration
├── scripts/sync-continue.js             ← Auto-sync script
├── CONTINUE_SYNC_GUIDE.md               ← Detailed sync procedures
└── .github/agents/                      ← Source of truth for rules
    ├── quality-standards.agent.md
    ├── lint.agent.md
    ├── test.agent.md
    ├── react.agent.md
    ├── api.agent.md
    ├── docs.agent.md
    ├── package.agent.md
    └── research.agent.md
```

### Files Created

| File                                       | Purpose                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `scripts/sync-continue.js`                 | Automation script to sync agents → Continue rules (run `npm run sync:continue`) |
| `CONTINUE_SYNC_GUIDE.md`                   | Detailed procedures for maintaining agent-to-rule synchronization               |
| `.continuerc.json`                         | Workspace-level config for Continue (models, rules, docs)                       |
| `.continue/README.md`                      | Setup guide and troubleshooting for Continue                                    |
| `.continue/environment.json`               | Environment variables for API keys                                              |
| `.continue/rules/01-code-quality.md`       | Code quality standards from `.github/agents/quality-standards.agent.md`         |
| `.continue/rules/02-lint-standards.md`     | Lint standards from `.github/agents/lint.agent.md`                              |
| `.continue/rules/03-testing.md`            | Testing standards from `.github/agents/test.agent.md`                           |
| `.continue/rules/04-react.md`              | React patterns from `.github/agents/react.agent.md`                             |
| `.continue/rules/05-api-patterns.md`       | API patterns from `.github/agents/api.agent.md`                                 |
| `.continue/rules/06-documentation.md`      | Documentation standards from `.github/agents/docs.agent.md`                     |
| `.continue/rules/07-package-management.md` | Package standards from `.github/agents/package.agent.md` (NEW)                  |
| `.continue/rules/08-research.md`           | Research tools from `.github/agents/research.agent.md` (NEW)                    |
| `.continue/prompts/*.md`                   | 6 custom slash commands for common development tasks                            |

## 🚀 Getting Started

### Step 1: Install Continue Extension

In VS Code:

1. Open Extensions (`Cmd+Shift+X` on Mac, `Ctrl+Shift+X` on Windows)
2. Search: "Continue"
3. Install official **Continue** extension by `continue.dev`
4. Restart VS Code

### Step 2: Set API Key

Choose your AI provider and set the API key:

## Option A: Anthropic Claude (Recommended)

```bash
# macOS/Linux
export ANTHROPIC_API_KEY="sk-ant-..."

# Or add to ~/.zshrc or ~/.bashrc to persist
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
source ~/.zshrc

# Windows
set ANTHROPIC_API_KEY=sk-ant-...
```

## Option B: OpenAI

```bash
export OPENAI_API_KEY="sk-..."
```

### Step 3: Reload VS Code

- Close and reopen VS Code to load the API key
- Continue should now be ready to use

## 💡 Using Continue

### Open Continue Chat

- **Keyboard**: `Cmd+Shift+L` (Mac) or `Ctrl+Shift+L` (Windows/Linux)
- **Command Palette**: `Cmd+Shift+P` → search "Continue: Open Chat"

### Use Slash Commands

Type `/` in the Continue chat to see available commands:

```
/generate-unit-test        Generate unit tests for a component
/create-feature-docs       Create comprehensive documentation
/refactor-component        Refactor to best practices
/create-api-hook          Generate React Query hooks
/add-e2e-test             Create E2E test workflows
/fix-code-quality         Fix linting and quality issues
```

### Inline Editing

1. Select code in editor
2. Press `Cmd+I` (Mac) or `Ctrl+I` (Windows)
3. Type your request (e.g., "add error handling" or "make this async")
4. Press Enter or click "Accept"

## 📋 Rules System

All rules files are automatically loaded in order (01 → 08) and applied to your code:

| Rule                     | Applies To          | Purpose                                 |
| ------------------------ | ------------------- | --------------------------------------- |
| 01-code-quality.md       | `.ts`, `.tsx` files | SonarSource rules, TypeScript standards |
| 02-lint-standards.md     | Code files          | ESLint, Prettier, formatting            |
| 03-testing.md            | Test files          | Jest, Cypress, coverage standards       |
| 04-react.md              | React files         | Hooks, components, accessibility        |
| 05-api-patterns.md       | API code            | React Query, data fetching              |
| 06-documentation.md      | Markdown files      | Documentation standards                 |
| 07-package-management.md | `package.json`      | Dependencies, versioning, npm scripts   |
| 08-research.md           | All project files   | Code analysis and research tools        |

Rules apply automatically based on glob patterns and `alwaysApply` settings. All rule files are generated from `.github/agents/` through the sync script.

## 🔄 Synchronization with `.github`

The rules automatically mirror your existing `.github/` agent instructions through an automated sync process.

### Current Rule Mappings

```
.github/agents/quality-standards.agent.md  →  .continue/rules/01-code-quality.md
.github/agents/lint.agent.md               →  .continue/rules/02-lint-standards.md
.github/agents/test.agent.md               →  .continue/rules/03-testing.md
.github/agents/react.agent.md              →  .continue/rules/04-react.md
.github/agents/api.agent.md                →  .continue/rules/05-api-patterns.md
.github/agents/docs.agent.md               →  .continue/rules/06-documentation.md
.github/agents/package.agent.md            →  .continue/rules/07-package-management.md
.github/agents/research.agent.md           →  .continue/rules/08-research.md
```

### Automatic Sync Script

When you update `.github/agents/` files or add new agents, run:

```bash
npm run sync:continue
```

This command:

1. ✅ Reads all `.github/agents/*.agent.md` files
2. ✅ Generates/updates `.continue/rules/NN-*.md` files
3. ✅ Updates `.continuerc.json` rules array
4. ✅ Maintains consistent numbering and glob patterns

**Expected output**:

```
🔄 Syncing .continue/rules with .github/agents...

✅ Synced: quality-standards.agent.md → 01-code-quality.md
✅ Synced: lint.agent.md → 02-lint-standards.md
✅ Synced: test.agent.md → 03-testing.md
✅ Synced: react.agent.md → 04-react.md
✅ Synced: api.agent.md → 05-api-patterns.md
✅ Synced: docs.agent.md → 06-documentation.md
✅ Synced: package.agent.md → 07-package-management.md
✅ Synced: research.agent.md → 08-research.md

✨ Sync complete! 8 rule(s) created/updated.
```

### When to Run Sync

- **Before committing** changes to `.github/agents/` files
- **After adding** new agent files to `.github/agents/`
- **Before merging** a PR that modifies agents
- **During development** if working across both Copilot agents and Continue

### Detailed Sync Guide

For step-by-step instructions on maintaining sync, see:
📖 [CONTINUE_SYNC_GUIDE.md](./CONTINUE_SYNC_GUIDE.md)

Topics covered:

- Adding new agents with automated sync
- Updating existing agents and rules
- Troubleshooting sync issues
- Pre-commit hook setup (optional)
- CI/CD integration (optional)

## 📚 Example Workflows

### Generate Unit Tests

1. Open a component file: `src/components/Button/Button.tsx`
2. Open Continue chat: `Cmd+Shift+L`
3. Type: `/generate-unit-test`
4. Continue generates comprehensive Jest tests with >80% coverage target

### Create an API Hook

1. Open Continue chat: `Cmd+Shift+L`
2. Type: `/create-api-hook`
3. Describe the endpoint: "Create a hook for fetching blog posts"
4. Continue generates a React Query v5 hook following project standards

### Refactor a Component

1. Open component file
2. Select component code
3. Press `Cmd+I` to edit
4. Type: `/refactor-component`
5. Continue refactors to functional component with hooks, accessibility, TypeScript types

### Fix Code Quality Issues

1. Select problematic code
2. Press `Cmd+I`
3. Type: `/fix-code-quality`
4. Continue fixes ESLint violations, TypeScript errors, and accessibility issues

## ⚙️ Configuration

### Workspace Config: `.continuerc.json`

Specifies:

- Default models (Claude 3.5 Sonnet for chat, Haiku for autocomplete)
- All 6 rules files to load
- Documentation sources (React, Next.js, React Query docs)
- Telemetry settings

### Environment Variables: `.continue/environment.json`

Stores:

- `ANTHROPIC_API_KEY` - API key for Claude models
- `NODE_ENV` - Set to "development"

### Rules Frontmatter

Each rule file starts with YAML frontmatter:

```yaml
---
name: Rule Name
globs: ["**/*.ts", "**/*.tsx"] # Files this rule applies to
alwaysApply: true # Always include (vs conditional)
description: "What this rule covers"
---
```

## 🔧 Troubleshooting

### "Continue says it doesn't recognize my rules"

**Solution**:

1. Verify `.continuerc.json` exists in workspace root
2. Check that `.continue/rules/` directory exists with all 6 files
3. Restart VS Code
4. In Continue chat, type `/` to see if commands load

### "API key error: 401 Unauthorized"

**Solution**:

1. Verify API key is valid (get from https://console.anthropic.com/)
2. Check environment variable is set: `echo $ANTHROPIC_API_KEY`
3. Restart VS Code after setting the key
4. Try again

### "Rules not applying to my code"

**Solution**:

1. Check glob patterns in rule file frontmatter
2. Rules only apply to files matching patterns
3. Use `alwaysApply: true` in frontmatter for universal rules
4. Verify file extensions match (`.ts` vs `.tsx` vs `.js`)

## 📖 Documentation

- **Continue Setup**: [`.continue/README.md`](.continue/README.md)
- **Continue Docs**: https://docs.continue.dev
- **Project Agents**: [`.github/AGENTS.md`](.github/AGENTS.md)

## 🎯 Next Steps

- [ ] Install Continue extension in VS Code
- [ ] Set `ANTHROPIC_API_KEY` environment variable
- [ ] Restart VS Code
- [ ] Open Continue chat: `Cmd+Shift+L`
- [ ] Try a slash command: type `/` to see options
- [ ] Generate tests for a component: `/generate-unit-test`
- [ ] Review generated code and iterate with Continue

## 📝 Notes

- Rules are git-tracked and can be versioned like code
- All 6 rules are active by default; customize as needed
- Continue respects your project's TypeScript, ESLint, and Prettier configs
- Works offline after initial setup (rules are local)
