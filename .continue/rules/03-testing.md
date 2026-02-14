---
name: Test Agent
globs:
  [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.test.js",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.spec.js",
  ]
alwaysApply: false
description: Enforce >80% test coverage - Write comprehensive unit and E2E tests
---

# ✅ Test Agent Instructions

**Agent Responsibility**: ENFORCE >80% test coverage - NO merges without tests passing.

**Activation Triggers**: After Lint Agent passes; new code/feature completion
**Execution Model**: SEQUENTIAL (must run after Lint, React, and API agents pass)

**Take Action**: Write tests for EVERY new feature, AUTO-RUN coverage checks.

---

## 🚀 QUICK START - DO THIS NOW

### 1. Run All Tests

```bash
npm run test              # Run all Jest tests
```

### 2. Check Coverage

```bash
npm run coverage          # Run tests with coverage report
```

**Must see**: >80% for lines, branches, functions, statements

### 3. Run E2E Tests

```bash
npm run e2e:test          # Run Cypress tests
```

**If anything fails**, fix immediately - don't proceed.

---

## Overview

The Test Agent ENFORCES comprehensive testing using:

- **Jest** with React Testing Library → Unit tests
- **Cypress** with cypress-axe → E2E + Accessibility tests
- **Coverage Thresholds** → >80% enforcement
- **Parallel Execution** → Fast feedback loop
- **Automated CI/CD** → Pre-merge validation

---

## 1. Unit Testing with Jest - MANDATORY

### Commands (In Order)

```bash
# 1. Run all tests (watch mode for development)
npm run test -- --watch

# 2. Run tests with coverage report
npm run coverage

# 3. View coverage report in browser
open coverage/lcov-report/index.html   # macOS
xdg-open coverage/lcov-report/index.html  # Linux
start coverage/lcov-report/index.html  # Windows
```

### Coverage Thresholds (REQUIRED)

From `jest.config.js` - NO exceptions:

```json
{
  "lines": 80,
  "branches": 75,
  "functions": 80,
  "statements": 80
}
```

**If coverage is below threshold**: Tests FAIL and commit is BLOCKED.

### Configuration

See `jest.config.js`:

- Environment: jsdom (browser-like)
- Test files: `**/*.test.ts(x)` or `**/*.spec.ts(x)`
- Transform: @swc/jest (fast transpilation)
- Coverage: Enabled with thresholds
- Setup: `setupTests.js`

### Test File Structure (REQUIRED)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  describe('rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom');
    });
  });

  describe('interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Click</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('button is keyboard accessible', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      const button = screen.getByRole('button');
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
    });

    it('has aria-label for icon buttons', () => {
      render(<Button aria-label="Close">×</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close');
    });
  });
});
```

---

## 2. React Component Testing

### Testing Hooks

```typescript
import { renderHook, act } from "@testing-library/react";
import { useCount } from "./useCount";

describe("useCount", () => {
  it("initializes with default value", () => {
    const { result } = renderHook(() => useCount());
    expect(result.current.count).toBe(0);
  });

  it("increments count", () => {
    const { result } = renderHook(() => useCount());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("decrements count", () => {
    const { result } = renderHook(() => useCount());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });
});
```

### Testing Custom Hooks with Dependencies

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { useUserData } from "./useUserData";

describe("useUserData", () => {
  it("fetches user data", async () => {
    const { result } = renderHook(() => useUserData("123"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual({ id: "123", name: "John" });
  });

  it("handles fetch error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useUserData("123"));

    await waitFor(() => {
      expect(result.current.error).toBe("Network error");
    });
  });
});
```

### Testing Context Providers

```typescript
import { render, screen } from '@testing-library/react';
import { UserProvider, useUser } from './UserContext';

function UserDisplay() {
  const { user } = useUser();
  return <div>{user?.name}</div>;
}

describe('UserContext', () => {
  it('provides user data to consumers', () => {
    render(
      <UserProvider initialUser={{ id: '123', name: 'John' }}>
        <UserDisplay />
      </UserProvider>
    );

    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

---

## 3. Testing Async Operations

### Mocking API Calls

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { PostList } from './PostList';

jest.mock('./api', () => ({
  fetchPosts: jest.fn(),
}));

describe('PostList', () => {
  it('displays posts after fetch', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    require('./api').fetchPosts.mockResolvedValueOnce(mockPosts);

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    require('./api').fetchPosts.mockRejectedValueOnce(new Error('API Error'));

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

---

## 4. Snapshot Testing

```typescript
import { render } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Card title="Test Card">
        Card content
      </Card>
    );

    expect(container).toMatchSnapshot();
  });
});
```

**⚠️ Use snapshots carefully**: Only for stable, non-dynamic components. Avoid for rapidly changing UI.

---

## 5. E2E Testing with Cypress

### Setup

```bash
npm run e2e:test          # Run Cypress tests
npm run e2e:dev           # Open Cypress UI for development
```

### Example E2E Test

```typescript
// cypress/e2e/blog.cy.js
describe("Blog Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/blog");
  });

  it("displays list of posts", () => {
    cy.get('[data-testid="post-list"]').should("be.visible");
    cy.get('[data-testid="post-item"]').should("have.length.greaterThan", 0);
  });

  it("navigates to post detail on click", () => {
    cy.get('[data-testid="post-item"]').first().click();
    cy.url().should("include", "/blog/");
    cy.get("h1").should("be.visible");
  });

  it("allows user to create new post", () => {
    cy.get('[data-testid="create-button"]').click();
    cy.get('input[name="title"]').type("New Post");
    cy.get('textarea[name="content"]').type("Post content");
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="success-message"]').should("contain", "Post created");
  });

  it("handles errors gracefully", () => {
    cy.intercept("GET", "/api/posts", { statusCode: 500 });
    cy.visit("http://localhost:3000/blog");

    cy.get('[data-testid="error-message"]').should("be.visible");
  });
});
```

### Accessibility Testing with cypress-axe

```typescript
import "cypress-axe";

describe("Blog Page - Accessibility", () => {
  it("has no accessibility violations", () => {
    cy.visit("http://localhost:3000/blog");
    cy.injectAxe();
    cy.checkA11y();
  });

  it("passes keyboard navigation", () => {
    cy.visit("http://localhost:3000/blog");
    cy.get("button").first().focus();
    cy.focused().should("have.attr", "aria-label");
  });
});
```

---

## 6. Code Coverage Checklist

### Types of Coverage

| Type       | Target | What It Measures                    |
| ---------- | ------ | ----------------------------------- |
| Lines      | 80%    | Every line of code executed         |
| Branches   | 75%    | Every if/else branch taken          |
| Functions  | 80%    | Every function called at least once |
| Statements | 80%    | Every statement executed            |

### Coverage Goals

✅ **Cover These**:

- Business logic
- Error handling paths
- User interactions
- API integration points
- Components with conditional rendering

⚠️ **Skip These** (may reduce coverage):

- Simple getters/setters
- Mock libraries
- Third-party integrations
- Generated code

---

## 7. Test Organization

### Folder Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx      # Colocated with component
│   └── Form/
│       ├── Form.tsx
│       └── Form.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts
└── utils/
    ├── helpers.ts
    └── helpers.test.ts
```

### Test File Naming

```
Component:     MyComponent.test.tsx or MyComponent.spec.tsx
Hook:          useMyHook.test.ts or useMyHook.spec.ts
Utility:       helper.test.ts or helper.spec.ts
Page:          [slug].test.tsx or [slug].spec.tsx
```

---

## 8. Testing Best Practices

✅ **DO**:

- Test user behavior, not implementation
- Use semantic queries: `getByRole`, `getByLabelText`
- Keep tests focused and single-responsibility
- Use `act()` for state updates
- Mock external APIs
- Test accessibility
- Use descriptive test names
- Keep tests fast (< 100ms each)

❌ **DON'T**:

- Test internal implementation details
- Use `querySelector` or `nth-child`
- Mock everything (test real behavior)
- Ignore error cases
- Skip accessibility validation
- Use `setTimeout` or `fake timers` unnecessarily
- Test library implementation (not your code)

---

## 9. Pre-commit Test Enforcement

Automated checks run on commit:

```bash
git commit -m "Add new feature"

# Automatically runs:
# 1. Linting with ESLint
# 2. Jest tests
# 3. Coverage checks
# 4. TypeScript type checking
```

---

## 10. Testing Checklist

Before pushing code:

- [ ] All new code has corresponding tests
- [ ] Run `npm run test` - all tests pass
- [ ] Run `npm run coverage` - meets >80% threshold
- [ ] All error paths are tested
- [ ] Accessibility tests included
- [ ] E2E tests pass (`npm run e2e:test`)
- [ ] No console errors or warnings
- [ ] Mock data is realistic
- [ ] Async operations properly handled

---

**Last Updated**: January 30, 2026
**Status**: ✅ Assertive enforcement with >80% coverage requirement
