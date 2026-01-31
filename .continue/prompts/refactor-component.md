---
name: Refactor Component
description: Refactor a React component to follow best practices
---

# Refactor React Component

Refactor the selected component to adhere to React and Next.js best practices.

Guidelines:

- Convert to functional component if class-based
- Use React Hooks (useState, useEffect, useCallback, useMemo)
- Ensure correct `useEffect` dependency arrays (no stale closures)
- Apply performance optimizations (React.memo, useMemo, useCallback) where beneficial
- Use TypeScript for all props and return types
- Follow folder structure: Component.tsx, Component.test.tsx, Component.types.ts, index.ts
- Add accessibility attributes (ARIA roles, labels, alt text)
- Use semantic HTML elements
- Optimize for keyboard navigation

After refactoring:

1. Ensure TypeScript strict mode passes
2. All ESLint rules pass: `npm run lint`
3. Code is properly formatted: `npm run format`
4. Unit tests still pass: `npm run test`
5. Component is exported via barrel export (index.ts)

Reference standards:

- React patterns: `.continue/rules/04-react.md`
- Code quality: `.continue/rules/01-code-quality.md`
