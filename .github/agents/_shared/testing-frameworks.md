# Testing Frameworks & Coverage Standards

Reference shared across **Test Agent** and **Refactoring Agent**.

---

## Jest Unit Testing

### Core Setup

- **Framework**: Jest with TypeScript support
- **Test Utilities**: React Testing Library for component testing
- **Focus**: Testing behavior, not implementation details
- **Assertion Library**: Jest built-in matchers

### Configuration

From `jest.config.js`:

```javascript
{
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Basic Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Coverage Thresholds (REQUIRED - NO EXCEPTIONS)

```json
{
  "branches": 80, // If/else branch coverage
  "functions": 80, // Function definitions called
  "lines": 80, // Lines of code executed
  "statements": 80 // Total executable statements
}
```

**If coverage drops below 80%**: CI/CD blocks merge until fixed.

### Common Jest Matchers

```typescript
expect(value).toBe(expected)                    // Strict equality
expect(value).toEqual(expected)                 // Deep equality
expect(value).toBeTruthy() / .toBeFalsy()       // Truthiness
expect(value).toContain(item)                   // Array/string contains
expect(fn).toHaveBeenCalledWith(args)          // Mock call verification
expect(fn).toHaveBeenCalledTimes(n)            // Call count
expect(promise).rejects.toThrow()              // Promise rejection
expect(value).toMatchSnapshot()                // Snapshot testing
```

---

## React Testing Library Best Practices

### Rule: Query by User Experience

**Priority order** (use in this order):

1. **getByRole** ← Preferred (tests accessibility tree, enforces semantic HTML)

   ```typescript
   screen.getByRole("button", { name: /submit/i });
   screen.getByRole("textbox", { name: /email/i });
   screen.getByRole("heading", { level: 1 });
   ```

2. **getByLabelText** ← Label associations (form inputs)

   ```typescript
   screen.getByLabelText(/password/i);
   ```

3. **getByPlaceholderText** ← Last resort for unlabeled inputs

   ```typescript
   screen.getByPlaceholderText(/search/i);
   ```

4. **getByTestId** ← Only for truly inaccessible elements
   ```typescript
   screen.getByTestId("custom-element");
   ```

### Testing User Interactions

```typescript
import userEvent from '@testing-library/user-event';

it('submits form on button click', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  // User types in email field
  await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');

  // User clicks submit button
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  // Verify handler called with correct data
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@example.com'
  });
});
```

### Testing Async Behavior

```typescript
it('loads and displays user data', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: async () => ({ name: 'John' })
  });

  render(<UserProfile userId="123" />);

  // Wait for async content
  const userName = await screen.findByText('John');
  expect(userName).toBeInTheDocument();
});

// Cleanup
jest.restoreAllMocks();
```

### Avoiding Common Mistakes

```typescript
// ❌ WRONG: Testing implementation details
it('sets state correctly', () => {
  const { getByTestId } = render(<Counter />);
  const state = JSON.parse(getByTestId('state').textContent);
  expect(state.count).toBe(1);
});

// ✅ CORRECT: Test user behavior
it('increments count when button clicked', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

---

## Cypress E2E Testing

### Core Setup

- **Framework**: Cypress for end-to-end testing
- **Accessibility**: cypress-axe for automated a11y checks
- **Scope**: Full user workflows, browser automation
- **Commands**: Chainable API for interactions

### Basic Test Structure

```typescript
describe("User Login Flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get('input[type="email"]').type("user@example.com");
    cy.get('input[type="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
    cy.get("h1").should("contain", "Welcome");
  });

  it("shows error for invalid credentials", () => {
    cy.get('input[type="email"]').type("invalid@example.com");
    cy.get('input[type="password"]').type("wrong");
    cy.get('button[type="submit"]').click();

    cy.get('[role="alert"]').should("contain", "Invalid credentials");
  });
});
```

### Accessibility Testing with cypress-axe

```typescript
it("has no accessibility violations", () => {
  cy.visit("/");
  cy.injectAxe();
  cy.checkA11y();
});

it("checks components for a11y", () => {
  cy.visit("/forms/contact");
  cy.injectAxe();
  cy.checkA11y("form", {
    rules: {
      "color-contrast": { enabled: true },
    },
  });
});
```

### Common Cypress Commands

```typescript
cy.visit("/page"); // Navigate to URL
cy.get("selector").click(); // Find and click element
cy.get("input").type("text"); // Type into input
cy.get("select").select("option"); // Select dropdown
cy.contains("text").click(); // Find by text content
cy.url().should("include", "/path"); // Assert current URL
cy.get("element").should("be.visible"); // Assert visibility
cy.get("element").should("contain", "text"); // Assert text content
cy.wait(2000); // Hard wait (use sparingly)
cy.get("element").should("not.exist"); // Assert non-existence
```

---

## Coverage Reports

### Viewing Jest Coverage

```bash
# Generate coverage report
npm run coverage

# View in browser (macOS)
open coverage/lcov-report/index.html

# View in browser (Linux)
xdg-open coverage/lcov-report/index.html

# View in browser (Windows)
start coverage/lcov-report/index.html
```

### Coverage Report Files

Generated in `coverage/`:

- `lcov-report/` ← HTML report (human-readable)
- `lcov.info` ← Raw coverage data
- `coverage-final.json` ← JSON format for CI/CD
- `jest-sonar.xml` ← SonarQube format

### Interpreting Coverage Metrics

- **Lines**: % of lines executed during tests
- **Statements**: % of statements executed (similar to lines)
- **Branches**: % of if/else branches taken
- **Functions**: % of function definitions called

**Example**:

```
Statements   : 85.5% ( 142/166 )
Branches     : 82.3% ( 47/57 )
Functions    : 90.2% ( 37/41 )
Lines        : 85.8% ( 138/161 )
```

---

## Test Execution Commands

```bash
# Run all tests (watch mode for development)
npm run test -- --watch

# Run tests once (CI/CD ready)
npm run test

# Run tests with coverage report
npm run coverage

# Run specific test file
npm run test -- Button.test.tsx

# Run tests matching pattern
npm run test -- --testNamePattern="login"

# Update snapshots
npm run test -- -u

# Run E2E tests
npm run e2e:test

# Run E2E tests with GUI
npm run e2e:open

# One-liner: validate everything
npm run validate           # lint + format + coverage checks
```
