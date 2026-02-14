---
name: Quality Standards
description: Code quality standards foundation - SonarSource rules and core principles (reference only)
tools: [search, web/fetch]
agents: []
target: vscode
handoffs: []
---

# 📊 Code Quality Standards Foundation

## Shared Reference for All Copilot Agents (Non-Executable)

**IMPORTANT**: Quality Standards is a **REFERENCE DOCUMENT**, not an executable agent. All agents inherit from these standards but do NOT handoff to this agent.

All specialized agents reference and enforce the standards defined here.

---

## SonarSource JavaScript Rules

All agents must ensure code adheres to the **full set of [SonarSource
JavaScript rules](https://rules.sonarsource.com/javascript/)** (421 total).

### Rule Categories

- **Bugs**: 83 rules
- **Vulnerabilities**: 31 rules
- **Security Hotspots**: 62 rules
- **Code Smells**: 245 rules
- **Quick Fixes Available**: 70 rules

### Manual Review Checklist

- [ ] Are there any **bugs** that violate logic or expected behavior?
- Are there **security vulnerabilities** (e.g., unsanitized inputs,
  unsafe eval)?
- [ ] Are there **security hotspots** that require deeper inspection?
- [ ] Are there **code smells** that reduce readability or maintainability?
- [ ] Are deprecated APIs or unsafe patterns (e.g., `isMounted`, `findDOMNode`) used?
- [ ] Are accessibility rules followed (e.g., ARIA roles, alt text, tabIndex)?

---

## Core Development Principles

### 1. **TypeScript First**

- Use TypeScript for all new code in `.ts` and `.tsx` files
- Strict mode enabled (see `tsconfig.json`)
- Full type coverage for function parameters and return types

### 2. **React Best Practices**

- Use **Functional Components** exclusively (no class components)
- Use **Hooks** for state and side effects
- Optimize for performance: avoid unnecessary re-renders
- Consider if `useEffect` is even needed before using it

### 3. **Context7 MCP Tools**

Always use Context7 when you need:

- Code generation, setup, or configuration steps
- Library/API documentation and examples
- Source documentation with links for generated code

---

## Code Review Reference

**Full rule set**: [SonarSource JavaScript Rules](https://rules.sonarsource.com/javascript/)

---

## Tools & Integration

- **SonarQube**: Integrate into CI/CD pipelines for automated analysis
- **SonarLint**: Use in IDEs (VS Code, IntelliJ, etc.) for real-time feedback
- **ESLint with SonarJS plugin**: See `.eslintrc.json` for project configuration

---

## Testing & Coverage

- **Minimum Coverage**: 80% lines, branches, functions, statements
- **Test Framework**: Jest with React Testing Library
- **E2E Testing**: Cypress with cypress-axe for accessibility
- **CI/CD Enforcement**: Tests must pass before merge

---

## Documentation Standards

- **Markdown Linting**: All `.md` files must pass markdownlint-cli2
- **JSDoc Required**: All public APIs must have documentation
- **Code Comments**: Complex logic should be explained
- **README**: Must be kept up-to-date with features

---

## Resources

- [All JavaScript Rules (SonarSource)](https://rules.sonarsource.com/javascript/)
- [SonarJS GitHub Repository](https://github.com/SonarSource/SonarJS)
- [SonarQube JavaScript/TypeScript Docs](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/languages/javascript-typescript/)

---

**Last Updated**: January 30, 2026
**Status**: ✅ Foundation for all code quality agents
