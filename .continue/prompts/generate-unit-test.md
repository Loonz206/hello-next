---
name: Generate Unit Test
description: Generate comprehensive unit tests for a component or function
---

# Generate Unit Tests

Generate unit tests for the selected code using Jest and React Testing Library.

Requirements:

- Test file should be co-located with source file
- Use `render` and `screen` from @testing-library/react for components
- Use `renderHook` for custom hooks
- Test behavior, not implementation details
- Include error cases and edge cases
- Aim for >80% code coverage
- Use `userEvent` instead of `fireEvent` for realistic interactions
- Follow the testing standards in `.continue/rules/03-testing.md`

Guidelines:

1. Describe the component/function and its purpose
2. List the main use cases and edge cases
3. Generate test cases covering happy path and error scenarios
4. Include setup/teardown if needed
5. Ensure tests are isolated and don't depend on each other
