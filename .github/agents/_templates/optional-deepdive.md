# Optional Deep-Dive Pattern

Used for **Tier 3b agents** that provide deeper analysis when explicitly requested. Examples: **Architecture Agent**, **Performance Agent**, **Refactoring Agent**.

---

## Overview

Optional deep-dive agents run **only if triggered by user choice**. They're not automatic gates; they provide specialized analysis for teams that want to invest in specific areas like scalability, performance tuning, or technical debt reduction.

---

## Architecture

```
Test Agent (Tier 3a)
        ↓
    ┌───┴───────────────┐
    │                   │
    ↓                   ↓
Continue to       Choose Optional
Final Stage       Deep-Dives?
    │             ↓ ↓ ↓
    │        Architecture
    │        Performance
    │        Refactoring
    │             │
    └─────┬───────┘
          ↓
   Documentation (Tier 4)
```

**Key Characteristics**:

- **Not mandatory** for code to pass
- **User-triggered** (explicitly requested)
- **Specialized analysis** (narrow focus)
- **Deeper insights** than standard validation
- **Optional improvements** (nice-to-have, not requirements)

---

## Handoff Configuration

In Tier 3a agent (Test Agent):

```yaml
handoffs:
  - label: Architecture Analysis (Optional)
    agent: Architecture Agent
    prompt: "Let's review the module structure and identify architectural improvements."
    send: false # ← User must explicitly request

  - label: Performance Analysis (Optional)
    agent: Performance Agent
    prompt: "Let's measure and optimize application performance."
    send: false # ← User must explicitly request

  - label: Documentation
    agent: Docs Agent
    prompt: "Now let's update documentation."
    send: false # ← Automatic or user-triggered
```

**In deep-dive agent (Architecture Agent)**:

```yaml
handoffs:
  - label: Advanced Refactoring
    agent: Refactoring Agent
    prompt: "Based on architectural findings, let's refactor and improve the code."
    send: false # ← Dependent, optional
```

---

## When to Use Optional Deep-Dive

Use when:

- ✅ Analysis is **specialized** (not general validation)
- ✅ **Not required** for basic code quality
- ✅ Takes **additional time/resources**
- ✅ **User preference** whether to perform
- ✅ Results are **recommendations**, not blockers

**Don't use when**:

- ❌ Analysis required for code to merge
- ❌ Validation is mandatory for quality
- ❌ Everyone always needs it (make it sequential)
- ❌ It's a gate/blocker

---

## Example: Frontend Feature Assessment

### Base Workflow (Automatic)

```
[Feature Code] → Lint → React → API → Test → Pass/Fail

Result: Code is valid and tested
Time: ~5-10 minutes
Decision: Merge or fix issues
```

### With Architecture Deep-Dive (User-Selected)

```
[Feature Code] → Lint → React → API → Test → Pass ✅
                                                ↓
                            "Review architecture?"
                                    ↓
                            Architecture Agent
                                    ↓
                    [Review: Module coupling, imports,
                     component layering, dependencies]
                                    ↓
                    [Output: Suggestions for improvement]
                                    ↓
                    [Optional] Refactoring Agent
                                    ↓
                    [Implement suggestions]

Time: ~15-25 minutes (additional)
Result: Code optimized structurally & functionally
Decision: Merge optimized version OR merge now + TODO doc card
```

### With Performance Deep-Dive (User-Selected)

```
[Feature Code] → Lint → React → API → Test → Pass ✅
                                                ↓
                            "Optimize performance?"
                                    ↓
                            Performance Agent
                                    ↓
                    [Analyze: Bundle size, render
                     performance, Core Web Vitals]
                                    ↓
                    [Output: Optimization opportunities]
                                    ↓
                    [Optional] Refactoring Agent
                                    ↓
                    [Implement optimizations]

Time: ~10-20 minutes (additional)
Result: Code meets performance budget
Decision: Merge optimized version OR document performance debt
```

### With Both Architecture & Performance (User-Selected)

```
[Feature Code] → Lint → React → API → Test → Pass ✅
                                                ↓
            ┌─────────────┬──────────────┐
            ↓             ↓              ↓
        Architecture  Performance   Documentation?
            ↓             ↓
        [Reviews]     [Analyzes]
            │             │
            └──────┬──────┘
                   ↓
            [Refactoring Agent]
            [Implements both sets
             of improvements]

Time: ~20-35 minutes (additional)
Result: Code optimized structurally, performance-tuned, documented
Decision: Merge fully optimized version
```

---

## Deep-Dive Agent Characteristics

### Architecture Agent (Tier 3b)

**Triggered when**:

- Large component additions
- Module reorganization needed
- Import/dependency concerns
- Scalability questions

**Focuses on**:

- Module structure & hierarchy
- Component dependencies
- Separation of concerns
- No circular imports
- Layering (pages → components → utils)

**Output**:

- Structural improvements
- Dependency graph cleanup
- Module reorganization suggestions

---

### Performance Agent (Tier 3b)

**Triggered when**:

- Frontend-heavy features
- Performance regressions suspected
- Bundle size growth
- Rendering performance concerns

**Focuses on**:

- Bundle size analysis
- Render performance (profiling)
- Core Web Vitals (LCP, CLS, FID)
- Image optimization
- Code splitting opportunities

**Output**:

- Bundle size report
- Performance bottlenecks
- Optimization roadmap

---

### Refactoring Agent (Tier 3b)

**Triggered when**:

- Other agents suggest improvements
- Technical debt consolidation
- Code pattern updates
- Legacy code modernization

**Focuses on**:

- Pattern implementation
- Legacy → modern migrations
- Code quality improvements
- Test coverage alongside refactoring

**Output**:

- Refactored code
- Updated tests
- Migration documentation

---

## User Decision Tree

```
Code passes validation (Tier 1-3a)
        ↓
    "Do you want in-depth analysis?"
        ├─→ NO → Proceed to documentation/merge
        │
        └─→ YES → "Which area interests you?"
                    ├─→ Architecture → Architecture Agent
                    ├─→ Performance → Performance Agent
                    ├─→ Code Quality → Refactoring Agent
                    └─→ All of above → Run all three (parallel)
                            ↓
                        [Collect findings]
                            ↓
                        Refactoring Agent consolidates
                            ↓
                        Review merged recommendations
                            ↓
                        Implement or document for future
```

---

## Configuration Patterns

### Optional Handoff with User Prompt

```markdown
## Optional: Deeper Analysis Available

Your code passed all standard checks!

### Would you like deeper analysis?

**🏗️ Architecture Review**

- Review module structure
- Optimize dependencies
- Improve scalability

**⚡ Performance Optimization**

- Analyze bundle size
- Profile rendering
- Optimize Web Vitals

**🧠 Code Refactoring**

- Modernize patterns
- Reduce complexity
- Improve maintainability

→ [Request Architecture Review]
→ [Request Performance Optimization]
→ [Request Code Refactoring]
→ [Skip - Proceed to documentation]
```

### Discovery Process in Agent

Optional agents typically start with:

```markdown
## Analysis Scope

This agent performs detailed analysis of:

- [List specific areas]
- [What will be examined]
- [What won't be covered]
- [Time estimate]

**Prerequisite**: All Tier 2 & 3a validations must pass

**Output**:

- Findings report
- Prioritized recommendations
- Optional: Refactoring suggestions
```

---

## Combining Patterns

Optional deep-dives can **reference each other**:

```
Architecture Agent findings might suggest:
  "Component coupling issues found"
  → Trigger: Refactoring Agent?

Performance Agent findings might suggest:
  "Bundle size high due to lazy loading deficit"
  → Trigger: Refactoring Agent for code-splitting?

Refactoring Agent might need:
  "Architecture review recommended before refactoring"
  → Reference: Architecture Agent findings
```

---

## Benefits & Trade-offs

### Benefits ✅

- Focused, specialized analysis
- Optional - no overhead for quick merges
- Deep expertise when needed
- Natural extension for teams who want it
- Prevents analysis paralysis (base workflow fast)

### Trade-offs ⚠️

- Additional (optional) time investment
- Requires team consensus on when to trigger
- Results might conflict with each other
- More reporting/findings to digest
- Risk of analysis without action (documentation debt)

---

## Best Practice: Documentation of Decisions

When selecting optional deep-dives, document:

```markdown
## Deep-Dive Selection Rationale

**Architecture Agent**: Selected because

- Component hierarchy changed significantly
- New external dependency added
- Want to verify scalability before merge

**Performance Agent**: Skipped because

- Feature is internal utility (not user-facing)
- Performance budget has headroom
- Can revisit in next cycle

**Refactoring Agent**: Selected because

- Architecture review revealed improvements needed
- Test coverage sufficient for safe refactoring
```
