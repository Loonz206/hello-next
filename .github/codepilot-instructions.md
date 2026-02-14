# 🧭 Copilot Instructions: hello-next Project

This document provides **assertive, action-oriented guidance** for using Copilot agents in the hello-next project.

---

## 🎯 Quick Navigation

**This project uses specialized custom Copilot agents for different development tasks.**

VS Code automatically detects custom agents in `.github/agents/` folder (max 120 chars).

**START WITH THIS WORKFLOW**:

1. Select an agent from the Copilot agents dropdown
2. Or invoke agents as subagents from other agents
3. Follow agent-specific instructions

---

## Custom Agents Overview

The development workflow is managed by 6 custom agents stored in `.github/agents/`:

1. **[📊 Quality Standards](./agents/quality-standards.agent.md)** - Shared foundation for all agents
2. **[🔍 Lint Agent](./agents/lint.agent.md)** - ESLint, SonarJS, Prettier on file changes
3. **[✅ Test Agent](./agents/test.agent.md)** - Jest and Cypress test coverage
4. **[📝 Docs Agent](./agents/docs.agent.md)** - Markdown writing and linting
5. **[🌐 API Agent](./agents/api.agent.md)** - React Query data fetching patterns
6. **[⚛️ React Agent](./agents/react.agent.md)** - React/Next.js best practices

All agents are available as subagents through the `agents` field in their frontmatter.

---

## 🏗️ Agent Architecture & Abstraction Layers

The agent system is organized into 5 tiers with a support layer for reusable skills and patterns:

### Tier Structure

**Tier 1**: Entry Point

- **Research Agent** - Intelligent routing and context analysis

**Tier 2**: Parallel Validation (simultaneous)

- **Lint Agent** - Code quality, formatting, syntax
- **React Agent** - Component patterns, hooks, accessibility
- **API Agent** - Data fetching, React Query patterns

**Tier 3a**: Sequential Testing (depends on Tier 2)

- **Test Agent** - Unit tests, E2E tests, coverage enforcement

**Tier 3b**: Optional Deep-Dive Analysis (user-requested)

- **Architecture Agent** - Module structure, dependencies, scalability
- **Performance Agent** - Bundle size, render performance, metrics

**Tier 4**: Implementation & Final

- **Refactoring Agent** - Applies improvements, loop-back validation
- **Documentation Agent** - Updates docs, feature documentation

**Post-Deployment**: Monitoring

- **Technical Debt Agent** - Summary analysis, improvement roadmap
- **Package Agent** - Dependency review, security audits
- **Quality Standards Agent** - Foundation principles (reference-only)

[→ Read Complete Tier Architecture](./.github/agents/_schema/execution-tiers.md)

### Reusable Skills Library

To reduce duplication and context consumption, shared skills are maintained in the **`_shared/` directory**:

- **quickstart-template.md** - Standard 3-step quick start pattern (all agents)
- **eslint-sonarchecks.md** - ESLint & SonarSource rules reference (Lint, React, Quality Standards)
- **testing-frameworks.md** - Jest, React Testing Library, Cypress reference (Test, Refactoring)
- **npm-commands-reference.md** - Centralized npm script definitions (all agents)
- **typescript-strict.md** - TypeScript strict mode patterns (Lint, React, Quality Standards)

Agents reference these via `!include()` syntax to embed shared content without duplication.

[→ Read Shared Skills Documentation](./.github/agents/README.md)

### Execution Patterns

Standard patterns documented in **`_templates/` directory**:

- **parallel-execution.md** - How Tier 2 agents run simultaneously
- **sequential-gating.md** - How Tier 3a gates depend on Tier 2
- **optional-deepdive.md** - How Tier 3b agents are user-triggered
- **loop-back-validation.md** - How Tier 4 validations iterate

### Schema Definitions

Structure and validation rules in **`_schema/` directory**:

- **agent-frontmatter-schema.yaml** - Standard YAML frontmatter (name, description, agents, handoffs)
- **execution-tiers.md** - Complete 5-tier architecture definition

---

## 🚀 Getting Started

### 1. Open Copilot Chat

Click the Copilot icon or press `Cmd+Shift+/` (macOS) / `Ctrl+Shift+/` (Windows/Linux)

### 2. Select an Agent

Click the agents dropdown to see all available custom agents in `.github/agents/`:

- **Lint Agent** - Fix code quality issues
- **Test Agent** - Write and run tests
- **React Agent** - Review component patterns
- **API Agent** - Implement data fetching
- **Docs Agent** - Document features
- **Quality Standards** - Review standards

### 3. Use Agents as Subagents

Agents can invoke other agents as subagents. Use the `#tool:agent` syntax or ask the current agent to "hand off to [agent name]".

Example: While in Lint Agent, ask "move to Test Agent after linting passes"

### 4. Install Dependencies

```bash
npm install
```

The following packages were added:

- `@tanstack/react-query@^5.28.0` - Server state management
- `@tanstack/react-query-devtools@^5.28.0` - React Query debugging
- `markdownlint-cli2@^0.13.0` - Markdown linting

### 5. Run Quality Checks

```bash
npm run validate          # Lint + format check
npm run test              # Jest unit tests
npm run e2e:test          # Cypress E2E tests
npm run lint:md           # Markdown linting
```

---

## 📋 Development Workflow

### Standard Pipeline

```
Code → Lint Agent → Test Agent → Docs Agent → Merge
```

### Parallel Execution (Performance)

```
Lint Agent ──┐
React Agent ─┤→ Test Agent → Docs Agent
API Agent ───┘
```

---

## ✅ Before Committing

**Run this command - NEVER commit without passing all checks:**

```bash
npm run validate && npm run test && npm run lint:md
```

**What happens**:

- `npm run validate` → ESLint + Prettier check (fails if issues found)
- `npm run test` → Jest tests (must pass)
- `npm run lint:md` → Markdown linting (must pass)

**If checks fail**, run auto-fixes:

```bash
npm run format && npm run lint:md:fix && npm run test
```

Husky pre-commit hook automatically runs `npm run lint`.

---

## 🤖 Continue IDE Integration

### Setup Continue

1. Install [Continue Extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue) in VS Code
2. Create `.continuerc.json` in project root with models and rules (already created)
3. Install Anthropic API key in `.continue/environment.json`

### Continue Folder Structure

```
.continue/
├── rules/                    ← AI instruction rules (synced from .github/agents/)
│   ├── 01-code-quality.md        ← From quality-standards.agent.md
│   ├── 02-lint-standards.md      ← From lint.agent.md
│   ├── 03-testing.md             ← From test.agent.md
│   ├── 04-react.md               ← From react.agent.md
│   ├── 05-api-patterns.md        ← From api.agent.md
│   ├── 06-documentation.md       ← From docs.agent.md
│   ├── 07-package-management.md  ← From package.agent.md
│   └── 08-research.md            ← From research.agent.md
├── prompts/                  ← Custom slash commands (manually maintained)
│   ├── generate-unit-test.md
│   ├── create-feature-docs.md
│   ├── refactor-component.md
│   ├── create-api-hook.md
│   ├── add-e2e-test.md
│   └── fix-code-quality.md
├── README.md                 ← Continue setup documentation
└── environment.json          ← API keys for Continue
```

### Keeping Continue & Agents Synchronized

**Automatic Sync Workflow**:

When new agents are added to `.github/agents/` or existing agents are updated:

```bash
# Run this command to sync all agents to Continue rules
npm run sync:continue
```

**What the sync does**:

1. ✅ Reads all `.github/agents/*.agent.md` files
2. ✅ Generates corresponding `.continue/rules/NN-*.md` files
3. ✅ Updates `.continuerc.json` rules array
4. ✅ Preserves mapping: quality-standards → code-quality, lint → lint-standards, etc.

**Automated sync triggers** (optional - currently manual):

- Pre-commit hook via Husky (can enable in `.husky/pre-commit`)
- CI/CD pipeline check (add to GitHub Actions)
- Local watch script (run during development)

**Detailed guide**: See [CONTINUE_SYNC_GUIDE.md](../CONTINUE_SYNC_GUIDE.md) for step-by-step procedures.

## Using Continue with Agents

**In Continue Chat, reference agent instructions:**

- `@docs .github/agents/quality-standards.agent.md` - Code quality standards
- `@docs .github/agents/lint.agent.md` - Linting guidelines
- `@docs .github/agents/test.agent.md` - Testing guidelines
- `@docs .github/agents/react.agent.md` - Component patterns
- `@docs .github/agents/api.agent.md` - API integration patterns
- `@docs .github/agents/docs.agent.md` - Documentation standards

**Use custom commands:**

- `@lint-fix` - Auto-fix all code issues
- `@test-all` - Run coverage tests
- `@markdown-fix` - Fix markdown files

---

## 📚 Core Principles

### TypeScript First

- Use TypeScript for all `.ts` and `.tsx` files
- Strict mode enabled in tsconfig.json
- Full type coverage

### React Best Practices

- **Functional Components Only** - No class components
- **Hooks Architecture** - Use useState, useEffect, useCallback, useMemo
- **Performance Optimized** - Use React.memo, useMemo, useCallback judiciously
- **Accessible** - WCAG 2.1 AA compliance, semantic HTML, ARIA labels

### SonarSource Rules (421 total)

Compliance with all rules covering:

- **83 Bugs** - Logic errors, type mismatches
- **31 Vulnerabilities** - Security risks
- **62 Security Hotspots** - Potential security concerns
- **245 Code Smells** - Maintainability issues

### Context7 MCP Tools

Always use Context7 when you need:

- Code generation or configuration
- Library/API documentation
- Example code with source links

---

## 🔗 Key Resources

- **[SonarSource Rules](https://rules.sonarsource.com/javascript/)** - Full rule reference
- **[React Documentation](https://react.dev/)** - React best practices
- **[Next.js Documentation](https://nextjs.org/)** - Next.js features
- **[React Query Docs](https://tanstack.com/query/latest)** - Data fetching patterns

---

## 📚 Agent Reference

For detailed instructions, see agent files in `.github/agents/`:

- **[Lint Agent](./agents/lint.agent.md)** - Format, lint, and TypeScript checks
- **[Test Agent](./agents/test.agent.md)** - Jest and Cypress testing
- **[React Agent](./agents/react.agent.md)** - Component and hook patterns
- **[API Agent](./agents/api.agent.md)** - React Query setup and patterns
- **[Docs Agent](./agents/docs.agent.md)** - Markdown and documentation
- **[Quality Standards](./agents/quality-standards.agent.md)** - SonarSource rules

---

## 🤖 Using Custom Agents

### Select Agent from Dropdown

1. Open Copilot Chat (Cmd+Shift+/ or Ctrl+Shift+/)
2. Click the agents dropdown (currently shows "Chat")
3. Select any agent from `.github/agents/` folder

### Subagent Workflow

Agents can invoke other agents as subagents:

**Lint Agent** can call → Test Agent, React Agent, API Agent
**Test Agent** can call → React Agent
**Docs Agent** is standalone
**API Agent** can call → React Agent
**React Agent** can call → Lint Agent, API Agent
**Quality Standards** is reference-only

### Example Workflow

1. **Start with Lint Agent** - "Fix all linting issues in this file"
2. **Hand off to Test Agent** - Agent suggests next steps
3. **Then React Agent** - Review component patterns
4. **Finally Docs Agent** - Document the changes

---

## 📞 Need Help?

### Linting Issues

See [Lint Agent](./agents/lint.agent.md) for:

- ESLint configuration
- Prettier formatting
- Pre-commit checks
- SonarSource compliance

### Test Coverage

See [Test Agent](./agents/test.agent.md) for:

- Jest unit testing patterns
- Cypress E2E testing
- Component testing examples
- Mock strategies

### API Integration

See [API Agent](./agents/api.agent.md) for:

- React Query setup
- Query and mutation hooks
- Error handling
- Pagination patterns

### Component Development

See [React Agent](./agents/react.agent.md) for:

- Functional component patterns
- Hooks best practices
- Performance optimization
- Accessibility guidelines

### Documentation

See [Docs Agent](./agents/docs.agent.md) for:

- Markdown style guide
- Feature documentation template
- API documentation
- Changelog format

---

## 🎓 Code Review Checklist

Use this when reviewing code:

- [ ] Follows SonarSource rules (see [Quality Standards](./agents/quality-standards.agent.md))
- [ ] Passes lint checks: `npm run lint`
- [ ] Has test coverage: `npm run test`
- [ ] Components are functional (see [React Agent](./agents/react.agent.md))
- [ ] Hooks have correct dependencies (see [React Agent](./agents/react.agent.md))
- [ ] Accessibility guidelines followed (see [React Agent](./agents/react.agent.md))
- [ ] API patterns use React Query (see [API Agent](./agents/api.agent.md))
- [ ] Documentation is complete (see [Docs Agent](./agents/docs.agent.md))
- [ ] Markdown files are lint-clean: `npm run lint:md`

---

## 📝 Summary

This project uses **custom VS Code agents** to ensure code quality, test coverage, documentation, and best practices. Each agent is stored in `.github/agents/` with a `.agent.md` extension and can work together as subagents.

**To get started**: Open Copilot Chat and select an agent from the dropdown!

---

**Happy coding! 🚀**
