---
name: Add E2E Test
description: Generate end-to-end tests for a user workflow
---

# Add E2E Test

Generate end-to-end tests using Cypress that test a complete user workflow.

Requirements:

- Test file in `cypress/e2e/` directory
- Name file: `feature-name.cy.js`
- Test complete user workflows, not isolated interactions
- Use Cypress best practices

Guidelines:

1. **Setup**: Use `beforeEach` to visit pages and set up state
2. **Selectors**: Prefer data-testid, then role/name, then CSS selectors
3. **Assertions**: Test user-visible outcomes, not implementation
4. **Isolation**: Tests should not depend on each other
5. **Navigation**: Use `cy.visit()` to navigate between pages
6. **Waits**: Use `cy.waitFor()` for async operations

Test structure:

```typescript
describe("Feature Name", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should complete user workflow", () => {
    // Arrange
    // Act
    // Assert
  });
});
```

Include tests for:

- Happy path (successful workflow)
- Error scenarios
- Edge cases
- Form validation
- Navigation

Optional: Add accessibility checks with cypress-axe:

```typescript
import "cypress-axe";
cy.injectAxe();
cy.checkA11y();
```

Reference: `.continue/rules/03-testing.md`
