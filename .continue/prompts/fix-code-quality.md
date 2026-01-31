---
name: Fix Code Quality Issues
description: Resolve linting, formatting, or SonarSource rule violations
---

# Fix Code Quality Issues

Analyze the selected code and fix quality issues to meet project standards.

Issues to identify and fix:

- **SonarSource violations**: Check against `.continue/rules/01-code-quality.md`
- **ESLint errors**: Run ESLint rules from `.eslintrc.json`
- **TypeScript issues**: Fix type errors and ensure strict mode compliance
- **Performance**: Remove unnecessary re-renders, unnecessary effects, etc.
- **Security**: Remove hardcoded secrets, fix XSS vulnerabilities, sanitize inputs
- **Accessibility**: Add missing ARIA attributes, alt text, labels
- **Testing**: Ensure code is testable (pure functions, proper DI)

Common fixes:

- Add missing return types
- Fix useEffect dependency arrays
- Extract functions for complexity reduction
- Remove unused variables and imports
- Add error handling
- Convert hardcoded values to constants
- Add accessibility attributes

Process:

1. Identify specific violations
2. Explain why they violate standards
3. Provide corrected code
4. Ensure TypeScript, ESLint, Prettier pass
5. Verify related tests still work

Reference standards:

- Code Quality: `.continue/rules/01-code-quality.md`
- Lint Standards: `.continue/rules/02-lint-standards.md`
- React Patterns: `.continue/rules/04-react.md`
