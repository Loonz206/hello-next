# Continue AI Configuration

This directory contains configuration and rules for [Continue](https://continue.dev), an open-source AI coding assistant integrated with VS Code.

## Structure

```
.continue/
├── rules/                       ← AI instruction rules
│   ├── 01-code-quality.md       ← SonarSource and TypeScript standards
│   ├── 02-lint-standards.md     ← ESLint and Prettier formatting
│   ├── 03-testing.md            ← Jest and Cypress testing standards
│   ├── 04-react.md              ← React & Next.js best practices
│   ├── 05-api-patterns.md       ← React Query and API integration
│   └── 06-documentation.md      ← Markdown and documentation standards
├── prompts/                     ← Custom slash commands
│   ├── generate-unit-test.md
│   ├── create-feature-docs.md
│   ├── refactor-component.md
│   ├── create-api-hook.md
│   ├── add-e2e-test.md
│   └── fix-code-quality.md
└── environment.json             ← Environment variables
```

## Quick Start

### 1. Install Continue Extension

In VS Code:

1. Open Extensions (`Cmd+Shift+X`)
2. Search for "Continue"
3. Install the official Continue extension by `continue.dev`

### 2. Configure API Keys

Continue needs an API key to use with Claude or other models.

**Option A: Using Anthropic Claude (Recommended)**

```bash
# Add to ~/.continue/config.yaml or set environment variable
export ANTHROPIC_API_KEY="sk-ant-..."
```

**Option B: Using OpenAI**

```bash
export OPENAI_API_KEY="sk-..."
```

### 3. Start Using Continue

- Press `Cmd+Shift+L` (Mac) or `Ctrl+Shift+L` (Windows/Linux) to open Continue chat
- Use custom commands: type `/` in the Continue chat to see available prompts
- Or use inline editing: Select code and press `Cmd+I` to edit selected code

## Rules System

The 6 rule files automatically guide Continue's AI behavior:

| Rule                     | Purpose                                 | Applies To                 |
| ------------------------ | --------------------------------------- | -------------------------- |
| **01-code-quality.md**   | SonarSource rules, TypeScript standards | All `.ts` and `.tsx` files |
| **02-lint-standards.md** | ESLint, Prettier, formatting            | Code files                 |
| **03-testing.md**        | Jest and Cypress standards              | Test files                 |
| **04-react.md**          | React hooks, components, accessibility  | React files                |
| **05-api-patterns.md**   | React Query, API integration            | Data fetching code         |
| **06-documentation.md**  | Markdown formatting, docs structure     | Markdown files             |

Rules are automatically loaded in order (01 → 06) and applied based on glob patterns.

## Custom Prompts

Use slash commands to trigger specific workflows:

- `/generate-unit-test` - Generate unit tests for a component
- `/create-feature-docs` - Create feature documentation
- `/refactor-component` - Refactor component to best practices
- `/create-api-hook` - Generate React Query hooks
- `/add-e2e-test` - Create Cypress E2E tests
- `/fix-code-quality` - Fix linting and quality issues

## Configuration Files

### .continuerc.json

Workspace-level configuration that specifies:

- Default AI models (Claude 3.5 Sonnet for chat)
- Autocomplete model (Claude 3.5 Haiku for performance)
- Rules to load from `.continue/rules/`
- Documentation sources to include
- Telemetry settings

### environment.json

Stores environment variables used by Continue:

- `ANTHROPIC_API_KEY` - API key for Claude models
- `NODE_ENV` - Set to "development"

## Synchronization with .github Instructions

The Continue rules mirror the agent instructions in `.github/`:

- `.github/code-quality-standards.md` → `.continue/rules/01-code-quality.md`
- `.github/lint-agent.md` → `.continue/rules/02-lint-standards.md`
- `.github/test-agent.md` → `.continue/rules/03-testing.md`
- `.github/react-agent.md` → `.continue/rules/04-react.md`
- `.github/api-agent.md` → `.continue/rules/05-api-patterns.md`
- `.github/docs-agent.md` → `.continue/rules/06-documentation.md`

When updating `.github` instructions, also update the corresponding `.continue/rules/` file to keep them in sync.

## Usage Examples

### Generate Tests

1. Open a component file
2. Open Continue chat (`Cmd+Shift+L`)
3. Type `/generate-unit-test`
4. Continue generates comprehensive Jest tests

### Create API Hook

1. Open Continue chat
2. Type `/create-api-hook`
3. Describe the endpoint
4. Continue generates a React Query hook following project standards

### Fix Code Quality Issues

1. Select problematic code
2. Press `Cmd+I` to edit with Continue
3. Type `/fix-code-quality`
4. Continue fixes ESLint, TypeScript, and accessibility issues

## Integration with VS Code

- **Tab Autocomplete**: Uses Claude 3.5 Haiku for fast suggestions
- **Chat**: Uses Claude 3.5 Sonnet for comprehensive responses
- **Edit Mode**: Select code + `Cmd+I` to refactor in place
- **Rules Applied**: Automatically included in all AI suggestions

## Local Development with Continue CLI

To test Continue workflows locally before deployment:

```bash
# Install Continue CLI (optional)
npm install -g @continuedev/cli

# Run in interactive TUI mode
continue dev

# Or use in your CI/CD pipeline
continue run --workflow my-workflow
```

## Next Steps

1. ✅ Continue extension installed
2. ✅ `.continue/rules/` configured
3. ✅ `.continuerc.json` set up
4. 📋 Add API key to environment
5. 🚀 Start using Continue slash commands
6. 📝 Create GitHub workflows for automated PR reviews (optional)

## Resources

- [Continue Documentation](https://docs.continue.dev)
- [Continue GitHub](https://github.com/continuedev/continue)
- [hello-next Project Agents](../.github/AGENTS.md)
- [React Query Docs](https://tanstack.com/query/latest)
- [Next.js Docs](https://nextjs.org/docs)

## Troubleshooting

### Continue not loading rules

- Verify `.continuerc.json` exists in workspace root
- Check that `.continue/rules/` directory exists
- Restart VS Code after changes

### API key not working

- Verify `ANTHROPIC_API_KEY` is set in environment
- Test with: `echo $ANTHROPIC_API_KEY`
- Restart Continue extension after setting env var

### Rules not applying to my code

- Check glob patterns in rule frontmatter
- Rules only apply to files matching patterns
- Use `alwaysApply: true` for universal rules

## Contributing

When adding new development standards to `.github/` instructions:

1. Update the corresponding `.continue/rules/` file
2. Test with Continue CLI locally
3. Commit both files together
4. Update this README if needed
