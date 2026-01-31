---
name: Create Feature Documentation
description: Generate documentation for a new feature
---

# Create Feature Documentation

Generate comprehensive documentation for the new feature following the template in `.continue/rules/06-documentation.md`.

Documentation should include:

- Feature name and purpose
- Overview explaining what it does and why
- Basic and advanced usage examples
- API reference (props, parameters, return values)
- Practical examples demonstrating different use cases
- Related documentation links
- Accessibility considerations

Format:

- Use Markdown with proper heading hierarchy
- Include TypeScript code examples
- Pass `npm run lint:md` validation
- Keep lines under 120 characters
- Use tables for API references
- Include both simple and complex patterns

After creation, ensure:

1. File passes `npm run lint:md`
2. Examples are runnable and follow project patterns
3. Documentation links are accurate
4. Update main README.md if needed to reference new docs
