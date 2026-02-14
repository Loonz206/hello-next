---
name: Docs Agent
globs: ["**/*.md", ".github/**/*.md", "docs/**/*.md"]
alwaysApply: false
description: Enforce markdown quality - Auto-fix documentation and maintain style consistency
---

# 📝 Documentation Agent Instructions

**Agent Responsibility**: ENFORCE markdown compliance - NO merges with markdown lint errors.

**Activation Triggers**: On feature completion; after Test Agent passes
**Execution Model**: SEQUENTIAL (final stage before merge-ready)

**Take Action**: AUTO-FIX all markdown issues, document features immediately.

---

## 🚀 QUICK START - DO THIS NOW

### 1. Auto-Fix All Markdown Issues

```bash
npm run lint:md:fix       # Fixes most issues automatically
```

### 2. Verify Compliance

```bash
npm run lint:md           # Check for remaining issues
```

**If anything fails**, repeat step 1 or fix manually.

### 3. Document New Features

Use template (Section 3) for any new feature.

---

## Overview

The Documentation Agent ENFORCES markdown quality using:

- **markdownlint-cli2** → Markdown linting & auto-fixing
- **Markdown Style Guide** → Consistent formatting
- **JSDoc Comments** → API documentation
- **Feature Templates** → Structured documentation
- **Changelog Tracking** → Version history

---

## 1. Markdown Linting - MANDATORY AUTO-FIX

### Commands (In Order)

```bash
# 1. Auto-fix ALL markdown issues
npm run lint:md:fix

# 2. Verify compliance
npm run lint:md

# 3. Check specific file
npx markdownlint-cli2 "path/to/file.md"
```

### Coverage

**Lints Project Files**:

- `.github/**/*.md` - Agent instructions
- `*.md` - Root documentation (README.md, CHANGELOG.md, etc.)
- `docs/**/*.md` - Additional documentation

**Excludes** (per .gitignore):

- `/node_modules/**` - Dependencies
- `/coverage/**` - Test coverage
- `/.next/**` - Build output
- `/cypress/screenshots/**` - Test artifacts

### Auto-Fixed Issues

| Issue                   | Rule  | Auto-Fixed? |
| ----------------------- | ----- | ----------- |
| Hard tabs               | MD010 | ✅ Yes      |
| Trailing whitespace     | MD009 | ✅ Yes      |
| Missing space after `-` | MD030 | ✅ Yes      |
| No blank line between   | MD032 | ✅ Yes      |
| Inconsistent heading    | MD003 | ✅ Yes      |
| Line too long           | MD013 | ⚠️ Partial  |

### Configuration

`.markdownlint.json` (enforced):

```json
{
  "MD007": { "indent": 2 },
  "MD013": { "line_length": 120, "code_lines": 200 },
  "no-hard-tabs": true
}
```

---

## 2. JSDoc & API Documentation

### Required JSDoc Format

Every public function/component MUST have JSDoc:

```typescript
/**
 * Fetches all blog posts from the API
 * @param {Object} options - Fetch options
 * @param {number} options.limit - Max posts to return (default: 10)
 * @param {number} options.skip - Posts to skip for pagination (default: 0)
 * @returns {Promise<Post[]>} Array of blog post objects
 * @throws {Error} If the API request fails
 */
export async function fetchPosts(options = {}) {
  // implementation
}
```

### Component JSDoc

```typescript
interface ButtonProps {
  /** Button text or React node */
  children: React.ReactNode;
  /** Callback when button is clicked */
  onClick?: () => void;
  /** Optional CSS class */
  className?: string;
}

/**
 * Reusable button component with accessibility support
 * @component
 * @example
 * <Button onClick={() => alert('Clicked!')}>Click Me</Button>
 */
export function Button({ children, onClick, className }: ButtonProps) {
  // implementation
}
```

---

## 3. Feature Documentation Template

Use this template for new features:

````markdown
# Feature Name

## Overview

Brief description of what this feature does and why it matters.

## Usage

### Basic Example

```typescript
// Code example here
```
````

## API Reference

### Function/Component Name

**Description**: What it does

**Parameters**:

- `param1` (type) - Description
- `param2` (type) - Description (optional)

**Returns**: Description

**Example**:

```typescript
// Example usage
```

## Best Practices

- Best practice 1
- Best practice 2

## See Also

- [Related feature](link)
- [Documentation](link)

````

---

## 4. Changelog Maintenance

### CHANGELOG.md Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-30

### Added
- New feature description
- Another new feature

### Changed
- Changed behavior description
- Updated documentation

### Fixed
- Bug fix description
- Security fix description

### Deprecated
- Deprecated feature or API

### Removed
- Removed feature or API

### Security
- Security-related changes
````

---

## 5. README Best Practices

### Structure

```markdown
# Project Name

Brief one-line description

## Features

- Feature 1
- Feature 2

## Quick Start

Installation and basic usage

## Documentation

Links to detailed docs

## Contributing

How to contribute

## License

License information
```

---

## 6. Code Comment Guidelines

### Good Comments

```typescript
// Convert slug format from "my-post" to "MyPost"
const title = slug
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("");

// FIXME: Replace with React Query when API is ready
const data = useState([]);

// TODO: Add error boundary for graceful error handling
export function Dashboard() {
  // ...
}
```

### Bad Comments

```typescript
// ❌ Obvious comments add no value
const title = slug.split('-').map(...); // Split the slug

// ❌ Outdated comments
// This was needed for IE11 support (removed in v2.0)
```

---

## 7. Markdown Formatting Standards

### Headings

```markdown
# H1 - Page Title (One per file)

## H2 - Main Sections

### H3 - Subsections

#### H4 - Details
```

### Lists

```markdown
- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2
```

### Code Blocks

```markdown
Inline code: \`code\`

Code block with language:
\`\`\`typescript
const example = "code";
\`\`\`
```

### Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Data 1   | Data 2   |
```

---

## 8. Image & Link Guidelines

### Images

```markdown
![Alt text describing the image](relative/path/to/image.png)
```

### Links

```markdown
[Link text](url)
[Relative link](./path/to/file.md)
[Section link](#section-heading)
```

---

## 9. Auto-Fix Workflow

### Terminal Commands

```bash
# Auto-fix all markdown files
npm run lint:md:fix

# Check if all files pass linting
npm run lint:md

# Preview what would be fixed
npm run lint:md -- --check
```

### Pre-commit Hook

Automatically runs `npm run lint:md:fix` before commit (via Husky).

---

## 10. Documentation Checklist

Before committing new features:

- [ ] All JSDoc comments added
- [ ] README updated if needed
- [ ] CHANGELOG.md updated
- [ ] Markdown linting passes (`npm run lint:md`)
- [ ] All links are valid
- [ ] Code examples are accurate
- [ ] Tables are properly formatted
- [ ] Headings are properly structured

---

## 11. Continue IDE Commands Reference

This Docs Agent automatically mirrors to **Continue IDE** through the `.continue/rules/06-documentation.md` file.

### Continue Custom Commands for Documentation

When using Continue IDE, the following slash commands are available for documentation tasks:

#### `/create-feature-docs`

**Purpose**: Generate feature documentation from code

**Usage in Continue Chat**:

```
/create-feature-docs Create documentation for the new React Query hook implementation
```

**What it does**:

- Extracts JSDoc comments from code
- Generates markdown documentation using the feature template (Section 3)
- Applies markdown formatting standards (Section 7)
- Suggests CHANGELOG updates

#### `/fix-code-quality`

**Purpose**: Apply code quality standards to documentation

**Usage in Continue Chat**:

```
/fix-code-quality Ensure all markdown files follow our standards
```

**What it does**:

- Checks markdown files for linting issues
- Applies formatting fixes (hard tabs, trailing whitespace, spacing)
- Validates heading structure and table formatting
- Updates table of contents if present

### Syncing Continue Commands with Docs Agent

When new documentation features are needed:

1. **Document the feature** in this agent (Section 3-10)
2. **Run the sync script**:

   ```bash
   npm run sync:continue
   ```

3. **Continue rules auto-update** - `.continue/rules/06-documentation.md` regenerates automatically
4. **Continue commands** in `.continue/prompts/*.md` remain manually maintained but reference this agent

### Keeping Both Systems in Sync

**Two-way relationship**:

- **Agent → Continue**: Run `npm run sync:continue` to generate updated rule files
- **Continue → Agent**: This agent file is the source of truth; Continue is a mirror

**When to sync**:

- After adding new documentation standards to this agent
- After updating JSDoc templates (Section 2)
- After changing coverage areas (Section 1)
- Before committing documentation changes

**Verification**:

- `npm run lint:md` - Validates all markdown files
- `cat .continue/rules/06-documentation.md` - Verify rule file is current
- Continue Chat - Reference rules with `@docs .github/agents/docs.agent.md`

---

**Last Updated**: January 30, 2026
**Status**: ✅ Assertive markdown enforcement with Continue IDE integration
