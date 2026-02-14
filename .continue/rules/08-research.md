---
name: Research Agent
globs: ["**/*"]
alwaysApply: true
description: Entry point and intelligent routing - Analyze request, route to appropriate agents
---

# 🔍 Research Agent Instructions

**Agent Responsibility**: Serve as the initial entry point for any user
request. Analyze project context and gather information.

**Activation Triggers**: Start of any work session; new feature request; investigation needed
**Execution Model**: FIRST in workflow (runs before all other agents; routes to appropriate specialized agents)

**Take Action**: Understand the request, analyze project context, provide recommendations for next steps.

---

## 🚀 QUICK START - DO THIS NOW

### 1. Understand the Request

Ask clarifying questions if needed:

- What problem are we solving?
- Which files/features are involved?
- What's the expected outcome?

### 2. Analyze Project Context

```bash
npm run validate          # Check current code quality
npm run test             # Verify tests pass
npm run coverage         # Review code coverage
```

### 3. View Project Structure

Explore relevant files and dependencies:

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - Linting rules
- `jest.config.js` - Test configuration
- `.github/agents/` - Agent instructions

### 4. Recommend Next Steps

Use #tool:web/fetch to research documentation if needed, then suggest which agent to handoff to.

---

## Overview

The Research Agent is your starting point for:

- **Project Understanding**: Gather context about the codebase
- **Request Clarification**: Understand what needs to be done
- **Dependency Analysis**: Review package.json and project configuration
- **Code Investigation**: Explore existing implementations
- **Documentation Research**: Use #tool:web/fetch to find relevant guides
- **Agent Routing**: Direct to the right specialized agent

---

## 1. Initial Discovery

### Analyze the Request

Ask these questions internally to understand scope:

- **What type of work**: Implementation, bug fix, refactor, documentation?
- **Scope**: Single file, module, or cross-project?
- **Dependencies**: Does it require external libraries or internal services?
- **Testing**: Are there existing tests? Do we need comprehensive coverage?
- **Documentation**: Should this be documented? Are there standards?

### Example Analysis

```
User Request: "Add a new blog post feature"

Analysis:
- Type: Implementation (new feature)
- Scope: Multiple files (API integration + React component + tests)
- Dependencies: Contentful CMS, React Query (already in package.json)
- Testing: Need unit tests (components) + E2E tests (user flow)
- Documentation: Need JSDoc + README update

Handoff: Start with Research Agent
├─ Then React Agent (design components)
├─ Then API Agent (integrate with Contentful)
├─ Then Lint Agent (ensure code quality)
├─ Then Test Agent (write comprehensive tests)
└─ Then Docs Agent (document changes)
```

---

## 2. Project Structure Quick Reference

### Key Directories

```
hello-next/
├── .github/
│   └── agents/                 # Custom Copilot agents (this project)
├── pages/                       # Next.js pages and API routes
│   ├── index.tsx               # Home page
│   ├── blog/
│   │   └── [slug].tsx          # Blog post detail page
│   └── api/
│       └── handler.tsx         # API endpoint examples
├── src/
│   ├── components/             # React components
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Layout/
│   │   └── PostList/
│   ├── styles/                 # SCSS stylesheets
│   ├── utils/                  # Utility functions and hooks
│   │   ├── contentfulPosts.tsx # Contentful API integration
│   │   └── ErrorBoundary.tsx   # Error handling
│   └── assets/                 # Static assets
├── cypress/                     # E2E tests
├── __tests__/                  # Unit tests
├── jest.config.js              # Jest configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## 3. Key Technologies & Libraries

### Core Stack

| Technology      | Version | Purpose                       |
| --------------- | ------- | ----------------------------- |
| **Next.js**     | 14.2.13 | React framework with SSR/SSG  |
| **React**       | 18.3.1  | UI library                    |
| **TypeScript**  | 5.6.2   | Type-safe JavaScript          |
| **React Query** | 5.28.0  | Server state management       |
| **Contentful**  | 10.6.21 | Headless CMS for blog content |
| **Sass**        | 1.79.4  | CSS preprocessing             |

### Development Tools

| Tool                      | Purpose                     |
| ------------------------- | --------------------------- |
| **Jest**                  | Unit testing framework      |
| **React Testing Library** | Component testing utilities |
| **Cypress**               | E2E testing framework       |
| **ESLint**                | Code quality linting        |
| **Prettier**              | Code formatting             |
| **Husky**                 | Git pre-commit hooks        |
| **TypeScript**            | Type checking               |

---

## 4. Common Workflows

### Adding a New Feature

```
1. Start with Research Agent (you are here)
   ↓
2. React Agent - Design UI components
   ↓
3. API Agent - Integrate with backend/CMS
   ↓
4. Lint Agent - Auto-fix code quality issues
   ↓
5. Test Agent - Write unit & E2E tests
   ↓
6. Docs Agent - Update documentation
```

### Fixing a Bug

```
1. Start with Research Agent (you are here)
   → Identify affected files
   → Understand the issue
   ↓
2. Choose agent based on issue type:
   - React component issue? → React Agent
   - API/data fetching issue? → API Agent
   - Test coverage issue? → Test Agent
   ↓
3. Lint Agent - Verify code quality
   ↓
4. Test Agent - Add regression tests
   ↓
5. Docs Agent - Document the fix if needed
```

### Improving Code Quality

```
1. Start with Research Agent (you are here)
   → Identify problem areas
   ↓
2. Lint Agent - Run auto-fixes and validation
   ↓
3. React Agent - Improve component structure (if needed)
   ↓
4. API Agent - Improve data fetching patterns (if needed)
   ↓
5. Test Agent - Increase test coverage
   ↓
6. Docs Agent - Update standards documentation
```

---

## 5. Using #tool:fetch for Research

Use #tool:fetch to research documentation when you need to understand:

- External library APIs
- Next.js patterns
- Contentful integration
- Testing best practices
- Accessibility standards

### Example Research

```typescript
// Need to understand React Query patterns?
// Use #tool:web/fetch to research @tanstack/react-query documentation
// Then handoff to API Agent for implementation

// Need to understand TypeScript (strict) mode?
// Use #tool:web/fetch to research TypeScript strict mode docs
// Then handoff to Lint Agent if there are type issues
```

---

## 6. Analyzing package.json

Key information from `package.json`:

### Scripts You'll Use

```bash
npm run dev                # Start development server
npm run build             # Build for production
npm run test              # Run Jest tests
npm run coverage          # Check test coverage
npm run lint              # Run ESLint
npm run format            # Auto-fix formatting with Prettier
npm run validate          # Parallel: format check + lint
npm run lint:md           # Check markdown files
npm run lint:md:fix       # Auto-fix markdown
npm run e2e:test          # Run Cypress E2E tests
npm run tsc               # Run TypeScript type checking
```

### Key Dependencies

| Package                 | Use Case                |
| ----------------------- | ----------------------- |
| `@tanstack/react-query` | Data fetching & caching |
| `contentful`            | CMS integration         |
| `react` & `react-dom`   | UI library              |
| `next`                  | React framework         |
| `sass`                  | CSS preprocessing       |

### Development Dependencies

| Package              | Use Case             |
| -------------------- | -------------------- |
| `@testing-library/*` | Component testing    |
| `jest`               | Test runner          |
| `cypress`            | E2E testing          |
| `eslint` & plugins   | Code linting         |
| `prettier`           | Code formatting      |
| `typescript`         | Type checking        |
| `husky`              | Git pre-commit hooks |

---

## 7. Project Configuration Files

### TypeScript Config (`tsconfig.json`)

- **Strict mode**: Enabled (highest safety)
- **Target**: ES2020 (modern JavaScript)
- **Module**: ESNext (modern modules)
- **JSX**: react-jsx (automatic React imports)

### ESLint Config (`.eslintrc.json`)

- **Parser**: TypeScript parser
- **Plugins**: React, React Hooks, SonarJS, Next.js
- **Rules**: 80+ quality checks
- **Extends**: ESLint recommended + Prettier

### Jest Config (`jest.config.js`)

- **Coverage threshold**: >80% (lines, functions, statements)
- **Environment**: jsdom (browser-like)
- **Transforms**: SWC (fast compilation)
- **Setup**: setupTests.js (testing library config)

---

## 8. Quality Standards Overview

This project enforces:

- **Code Quality**: ESLint with 83 bug rules + 245 code smell rules
- **Type Safety**: TypeScript strict mode
- **Testing**: >80% coverage threshold
- **Documentation**: JSDoc + Markdown linting
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Core Web Vitals optimization

---

## 9. Routing Guide

Based on the request type, here's where to go:

| Request Type         | First Agent   | Typical Flow                       |
| -------------------- | ------------- | ---------------------------------- |
| New React Component  | React Agent   | React → Lint → Test → Docs         |
| API/Data Integration | API Agent     | API → React → Lint → Test          |
| Bug Fix              | (varies)      | Identify issue → Fix → Lint → Test |
| Refactoring          | Code quality  | Lint → React (if UI) → Test        |
| Documentation        | Docs Agent    | Docs → (research if needed)        |
| Package Review       | Package Agent | Package → (handoff as needed)      |
| Code Quality Check   | Lint Agent    | Lint → (specific agents)           |

---

## 10. Quick Diagnostics

### Check Project Health

```bash
# 1. Verify code quality
npm run validate

# 2. Run all tests
npm run test

# 3. Check coverage
npm run coverage

# 4. Type check
npm run tsc

# 5. Check markdown
npm run lint:md
```

### Understand an Issue

1. **Look at error message**: What file? What line?
2. **Check the commit**: What changed?
3. **Review test failures**: Which tests fail?
4. **Read documentation**: What's the standard?
5. **Consult relevant agent**: Route to appropriate specialist

---

## Next Steps

Based on your request, I'll analyze the project and recommend:

1. **Which agent** to handoff to
2. **What files** need modification
3. **Which standards** apply
4. **Estimated effort** required
5. **Potential risks** to consider

---

**Last Updated**: February 9, 2026
**Status**: ✅ Initial research and context gathering
