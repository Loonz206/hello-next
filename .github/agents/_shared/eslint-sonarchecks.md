# ESLint Configuration & SonarSource Rules

Reference shared across **Lint Agent**, **React Agent**, and **Quality Standards Agent**.

## SonarSource Rule Coverage

**Total**: 83 Bugs + 245 Code Smells = **328 rules enforced**

| Category          | Rules | Examples                                        |
| ----------------- | ----- | ----------------------------------------------- |
| Bugs              | 83    | Infinite loops, typos in conditions             |
| Vulnerabilities   | 31    | SQL injection, XSS, hardcoded secrets           |
| Security Hotspots | 62    | User input handling, authentication checks      |
| Code Smells       | 245   | Duplicated code, unused variables, long methods |
| Quick Fixes       | 70+   | Auto-fixable rules with one-click solutions     |

---

## ESLint Configuration Files

See `.eslintrc.json`:

- **SonarJS plugin** (328 SonarSource rules)
- **React plugin** with hooks validation
- **TypeScript parser & support** for type-aware linting
- **JSX Accessibility (a11y) rules** (wcag2aa level)
- **Cypress E2E test support** for test file validation

---

## Common ESLint Issues & Fixes

### Unused Imports

```typescript
// ❌ WRONG: Import not used
import { useEffect } from "react";

// ✅ CORRECT: Remove or use
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

// Auto-fixed by: npm run format
```

### Import Ordering

```typescript
// ❌ WRONG: Mixed import order
import { Button } from "@/components";
import React from "react";
import { useState } from "react";

// ✅ CORRECT: Proper import ordering
import React, { useState } from "react";
import { Button } from "@/components";

// Auto-fixed by: npm run format
```

### React Hooks Issues

```typescript
// ❌ WRONG: Missing dependency in useEffect
useEffect(() => {
  console.log(userId);
}, []); // ← userId missing!

// ✅ CORRECT: Include all dependencies
useEffect(() => {
  console.log(userId);
}, [userId]);

// Auto-fixed by: npm run lint --fix
```

### Naming Conventions

```typescript
// ❌ WRONG: Variable names should be camelCase
const UserName = "John";
const TEMP_VALUE = 42;

// ✅ CORRECT: Use camelCase
const userName = "John";
const tempValue = 42;

// ❌ WRONG: Component names not PascalCase
function userProfiles() {}

// ✅ CORRECT: Component names PascalCase
export function UserProfiles() {}

// Auto-fixed by: npm run format
```

### Accessibility (a11y) Issues

```typescript
// ❌ WRONG: Missing alt text on images
<img src="user.jpg" />

// ✅ CORRECT: Always include alt text
<img src="user.jpg" alt="User profile photo" />

// ❌ WRONG: Button without accessible text
<button><span>🔧</span></button>

// ✅ CORRECT: Include aria-label or text
<button aria-label="Settings">⚙️</button>

// Auto-fixed by: npm run lint
```

---

## Prettifying & Formatting

**Prettier** auto-fixes (BEFORE ESLint runs):

- Indentation (spaces/tabs consistency)
- Semicolons (add/remove per config)
- Quote consistency (single vs double)
- Line length formatting (word wrapping)
- Trailing commas (ES5 compatible)

**Run order matters**:

1. `npm run format` (Prettier first)
2. `npm run lint --fix` (ESLint second)
3. `npm run check-format` (Verify formatting)

---

## TypeScript + ESLint Integration

With `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`:

```typescript
// ❌ WRONG: Type errors caught
const values: number[] = ["one", "two"]; // ✗ Type error

// ✓ CORRECT: Type-safe
const values: number[] = [1, 2];

// ❌ WRONG: Unused types
type User = { name: string };
const createUser = (name: string) => ({ name });

// ✓ CORRECT: Use or remove types
type User = { name: string };
const createUser = (name: string): User => ({ name });

// Auto-fixed by: npm run lint --fix (with type-aware plugin)
```

---

## Quick Reference: ESLint Commands

```bash
# See all current issues
npm run lint

# Auto-fix all safe issues
npm run lint -- --fix
npm run format              # Shorter alias

# Check formatting (Prettier)
npm run check-format

# Both together
npm run validate            # lint + format check in parallel

# With specific file/folder
npm run lint -- src/components/
npm run lint -- --ext .tsx src/

# Show only errors (skip warnings)
npm run lint -- --quiet
```

---

## Integration with CI/CD

- **Pre-commit hook** (Husky) runs: `npm run format && npm run lint`
- **GitHub Actions** on pull requests verify all rules pass
- **IDE integration** via VSCode ESLint extension shows issues in real-time
