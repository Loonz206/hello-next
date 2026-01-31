---
name: Lint Agent
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
alwaysApply: false
description: Enforce code quality - Auto-fix linting and formatting issues
---

# 🔍 Lint Agent Instructions

**Agent Responsibility**: ENFORCE code quality - NO commits without passing lint checks.

**Activation Triggers**: EVERY `.ts`, `.tsx`, `.js`, `.jsx` file change
**Execution Model**: FIRST in pipeline (runs BEFORE all other agents; parallel with React & API)

**Take Action**: AUTO-FIX all issues, never skip linting.

---

## 🚀 QUICK START - DO THIS NOW

### 1. Auto-Fix All Issues

```bash
npm run format            # Fixes 90% of linting issues automatically
```

### 2. Verify Compliance

```bash
npm run lint              # Check for remaining issues
npm run check-format      # Verify formatting
npm run validate          # Both checks in parallel
```

### 3. TypeScript Check

```bash
npm run tsc               # Catch type errors
```

**If anything fails**, repeat step 1 with `npm run format`.

---

## Overview

The Lint Agent ENFORCES static code analysis using:

- **ESLint** with SonarJS plugin → 83 Bugs + 245 Code Smells caught
- **Prettier** → Auto-formatting for consistency
- **Husky** → Pre-commit enforcement (auto-runs `npm run lint`)
- **Lint-staged** → Stages file validation
- **TypeScript** → Type safety checks

---

## 1. ESLint Configuration & Auto-Fix

### Three Commands (In Order)

```bash
# 1. Auto-fix all safe issues (Prettier + ESLint)
npm run format

# 2. Check format consistency remains
npm run check-format

# 3. Verify lint compliance
npm run lint

# OR all together:
npm run validate          # Parallel execution of format + lint check
```

### What Gets Fixed

**Prettier** auto-fixes:

- Indentation (spaces/tabs)
- Semicolons
- Quote consistency
- Line length formatting
- Trailing commas

**ESLint** auto-fixes:

- Unused imports (removed)
- Import ordering
- Variable naming
- Type safety issues (with TypeScript plugin)
- React hooks issues

### Configuration Files

See `.eslintrc.json`:

- SonarJS plugin (328 SonarSource rules)
- React plugin with hooks validation
- TypeScript parser & support
- JSX Accessibility (a11y) rules
- Cypress E2E test support

### SonarSource Rule Coverage

| Category          | Rules | Examples                                        |
| ----------------- | ----- | ----------------------------------------------- |
| Bugs              | 83    | Infinite loops, typos in conditions             |
| Vulnerabilities   | 31    | SQL injection, XSS, hardcoded secrets           |
| Security Hotspots | 62    | User input handling, authentication checks      |
| Code Smells       | 245   | Duplicated code, unused variables, long methods |
| Quick Fixes       | 70+   | Auto-fixable rules with one-click solutions     |

---

## 2. Common Linting Issues & Fixes

### Unused Imports

```typescript
// ❌ WRONG: Import not used
import { useEffect } from "react";

// ✅ CORRECT: Remove unused import
// Auto-fixed by: npm run format
```

### Naming Conventions

```typescript
// ❌ WRONG: Variable names should be camelCase
const UserName = "John";

// ✅ CORRECT: Use camelCase for variables
const userName = "John";
// Auto-fixed by: npm run format
```

### Inconsistent Quotes

```typescript
// ❌ WRONG: Mix of single and double quotes
const name = "John";
const age = "30";

// ✅ CORRECT: Consistent double quotes (per project config)
const name = "John";
const age = "30";
// Auto-fixed by: npm run format
```

### Missing Semicolons

```typescript
// ❌ WRONG: Missing semicolon
const name = "John";

// ✅ CORRECT: Semicolon added
const name = "John";
// Auto-fixed by: npm run format
```

### Trailing Commas

```typescript
// ❌ WRONG: Missing trailing comma in multi-line
const obj = {
  name: "John",
  age: 30,
};

// ✅ CORRECT: Trailing comma added
const obj = {
  name: "John",
  age: 30,
};
// Auto-fixed by: npm run format
```

---

## 3. React Hook Rules

### useEffect Dependencies

```typescript
// ❌ WRONG: Missing dependency - "count" changes but useEffect doesn't re-run
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log("Count is", count);
  }, []);
}

// ✅ CORRECT: Include all dependencies
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log("Count is", count);
  }, [count]);
}
```

### useState Rules

```typescript
// ❌ WRONG: setState in render (functional component body)
function MyComponent() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Infinite loop!
  return <div>{count}</div>;
}

// ✅ CORRECT: setState in event handlers or effects
function MyComponent() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return <button onClick={increment}>{count}</button>;
}
```

### Custom Hook Rules

```typescript
// ❌ WRONG: Hook called conditionally
function MyComponent({ shouldFetch }) {
  if (shouldFetch) {
    const data = useFetch('/api/data'); // Breaks rules of hooks!
  }
}

// ✅ CORRECT: Hooks always called at top level
function MyComponent({ shouldFetch }) {
  const data = useFetch(shouldFetch ? '/api/data' : null);
  return data ? <div>{data}</div> : null;
}
```

---

## 4. TypeScript Strict Mode

### Type Safety

```typescript
// ❌ WRONG: Any type bypasses type safety
function processData(data: any): any {
  return data.map((x) => x * 2);
}

// ✅ CORRECT: Specify proper types
function processData(data: number[]): number[] {
  return data.map((x) => x * 2);
}
```

### Null/Undefined Safety

```typescript
// ❌ WRONG: Dangerous null access
function getLength(str: string | null) {
  return str.length; // str might be null!
}

// ✅ CORRECT: Handle nullability
function getLength(str: string | null) {
  return str?.length ?? 0; // Optional chaining + nullish coalescing
}
```

### Required Properties

```typescript
// ❌ WRONG: Missing required properties
interface User {
  name: string;
  email: string;
}

const user: User = { name: "John" }; // Missing email!

// ✅ CORRECT: All required properties provided
const user: User = { name: "John", email: "john@example.com" };
```

---

## 5. Accessibility (a11y) Rules

### Button Labels

```typescript
// ❌ WRONG: Button without accessible label
<button><icon /></button>

// ✅ CORRECT: Add aria-label or text label
<button aria-label="Close menu"><icon /></button>
```

### Image Alt Text

```typescript
// ❌ WRONG: Missing alt text
<img src="profile.jpg" />

// ✅ CORRECT: Descriptive alt text
<img src="profile.jpg" alt="User profile picture" />
```

### Form Labels

```typescript
// ❌ WRONG: Input without associated label
<input type="text" placeholder="Name" />

// ✅ CORRECT: Proper label association
<label htmlFor="name">Name</label>
<input id="name" type="text" />
```

---

## 6. Pre-commit Hooks

### Automatic Linting

The repository uses **Husky** + **lint-staged** for automatic checks:

```bash
# Automatically runs on commit (no need to run manually)
git commit -m "Your message"

# Pre-commit hooks will:
# 1. Auto-fix formatting with Prettier
# 2. Run ESLint on staged files
# 3. Run TypeScript type checking
# 4. Run tests (if configured)
```

### Bypassing Hooks (NOT RECOMMENDED)

```bash
# Skip pre-commit checks (dangerous!)
git commit --no-verify

# Should only be used for emergencies, not normal workflow
```

---

## 7. Fix-As-You-Go Workflow

### During Development

```bash
# Watch mode - fixes files as you edit
npm run format -- --watch

# Run linting in watch mode
npm run lint -- --watch
```

### Before Pushing

```bash
# Final checks before push
npm run validate  # Prettier + ESLint + TypeScript all at once
```

---

## 8. Manual Fixes (When Auto-Fix Isn't Enough)

### Common Manual Fixes

| Issue               | Auto-Fix | Manual Fix |
| ------------------- | -------- | ---------- |
| Logic errors        | ❌ No    | Refactor   |
| Variable naming     | ✅ Yes   | n/a        |
| Complex type issues | ❌ No    | Add types  |
| Performance issues  | ❌ No    | Refactor   |
| Security issues     | ⚠️ Some  | Review     |

### Example Manual Fix

```typescript
// ESLint warns: "Function is too complex (complexity: 12)"
function processUserData(user) {
  // Manual refactoring needed - break into smaller functions
}

// Solution: Extract logic into helper functions
function validateUser(user) {
  /* ... */
}
function transformUser(user) {
  /* ... */
}

function processUserData(user) {
  validateUser(user);
  return transformUser(user);
}
```

---

## 9. SonarJS Security Examples

### SQL Injection Prevention

```typescript
// ❌ WRONG: User input directly in query
db.query(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ CORRECT: Use parameterized queries
db.query("SELECT * FROM users WHERE id = ?", [userId]);
```

### XSS Prevention

```typescript
// ❌ WRONG: Unsafe HTML rendering
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ CORRECT: React auto-escapes by default
<div>{userContent}</div>
```

### Hardcoded Secrets

```typescript
// ❌ WRONG: Hardcoded API key
const apiKey = "sk-1234567890";

// ✅ CORRECT: Load from environment variables
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

---

## 10. Linting Checklist

Before committing:

- [ ] Run `npm run format` and commit changes
- [ ] Run `npm run validate` and verify all checks pass
- [ ] No ESLint errors or warnings
- [ ] TypeScript compiles without errors
- [ ] No unused imports or variables
- [ ] Proper types defined (no `any`)
- [ ] React hooks used correctly
- [ ] Accessibility standards met
- [ ] Security rules followed

---

**Last Updated**: January 30, 2026
**Status**: ✅ Assertive enforcement with Copilot integration
