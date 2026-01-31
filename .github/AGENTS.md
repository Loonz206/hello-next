# 🎯 Copilot Agents - Restructured Architecture v2.0

**Intelligent 3-tier agent assembly** for the hello-next project. Clear entry point, parallel execution, sequential validation, optional deep-dive analysis.

---

## 🏗️ Architecture Overview (3 Tiers)

```
TIER 1: ENTRY & ROUTING
  ┌─────────────────────────┐
  │   Research Agent        │ ← START HERE: Analyzes request, routes intelligently
  └────────────┬────────────┘
               │
      ┌────────┴────────┐
      │                 │
TIER 2: PARALLEL CORE (Run Simultaneously)
  ┌──▼──────┐  ┌────▼─────┐  ┌───▼────┐  ┌──────▼─────┐
  │ Lint    │  │ React    │  │ API    │  │ Package   │
  │ Agent   │  │ Agent    │  │ Agent  │  │ Agent     │
  │(Quality)│  │(Structure)   (Data)  │  │(Deps)     │
  └──┬──────┘  └────┬─────┘  └───┬────┘  └──────────┘
     │              │            │
     └──────────────┼────────────┘
                    │
TIER 3a: SEQUENTIAL VALIDATION
  ┌─────────────────┐
  │  Test Agent     │ ← Runs AFTER Tier 2 passes
  └────────┬────────┘
           │
TIER 3b: OPTIONAL DEEP-DIVE ANALYSIS (After Test passes)
  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐
  │ Architecture │  │ Performance  │  │ Refactoring │
  │ Agent (NEW)  │  │ Agent (NEW)  │  │ Agent (NEW) │
  └──────────────┘  └──────────────┘  └─────────────┘
                    │
TIER 4: FINAL POLISH
  ┌─────────────────┐
  │  Docs Agent     │ ← Final stage before merge-ready
  └─────────────────┘
                    │
POST-DEPLOYMENT (Non-Blocking)
  ┌──────────────────────────┐
  │ Technical Debt Agent     │ ← Continuous improvement analysis
  └──────────────────────────┘
```

---

## 📋 Agent Index (Organized by Tier)

### TIER 1️⃣: ENTRY POINT

#### 🔍 [Research Agent](./agents/research.agent.md)

**Role**: Smart routing and request analysis
**When**: ALWAYS START HERE
**Execution**: Single entry point

---

### TIER 2️⃣: PARALLEL CORE (Run Simultaneously)

#### 🔍 [Lint Agent](./agents/lint.agent.md)

Code quality baseline - runs FIRST for code work

```bash
npm run validate          # Format + lint
```

#### ⚛️ [React Agent](./agents/react.agent.md)

Component structure & patterns - parallel to Lint

#### 🌐 [API Agent](./agents/api.agent.md)

React Query patterns - optional, parallel

#### 📦 [Package Agent](./agents/package.agent.md)

Dependency management - on-demand

---

### TIER 3️⃣: SEQUENTIAL VALIDATION

#### ✅ [Test Agent](./agents/test.agent.md)

Test coverage enforcement - gated by Lint

```bash
npm run coverage         # >80% required
```

---

### TIER 3b️⃣: OPTIONAL DEEP-DIVE

#### 🏗️ [Architecture Agent](./agents/architecture.agent.md) — NEW

Module design and scalability analysis

#### ⚡ [Performance Agent](./agents/performance.agent.md) — NEW

Bundle & render optimization

#### 🔧 [Refactoring Agent](./agents/refactoring.agent.md) — NEW

Code improvement and technical debt fixes

---

### TIER 4️⃣: FINAL POLISH

#### 📝 [Docs Agent](./agents/docs.agent.md)

Documentation & markdown - final stage

```bash
npm run lint:md           # Markdown validation
```

---

### POST-DEPLOYMENT (Non-Blocking)

#### 📊 [Technical Debt Agent](./agents/technical-debt.agent.md)

Continuous improvement - post-merge analysis

---

### REFERENCE (Non-Executable)

#### 📊 [Quality Standards](./agents/quality-standards.agent.md)

Standards foundation - referenced by all agents (not executed)

---

## 🔄 Development Workflow

### Typical Flow

```
Research Agent analyzes request
     ↓
Routes to parallel agents based on task type:
  ├→ Lint Agent (code quality)
  ├→ React Agent (component patterns) [if component work]
  ├→ API Agent (data fetching) [if API work]
  └→ Package Agent (dependencies) [if needed]
     ↓
All parallel agents must pass
     ↓
Test Agent (>80% coverage required)
     ↓
Optional: Architecture/Performance/Refactoring as needed
     ↓
Docs Agent (markdown validation)
     ↓
✅ MERGE READY
     ↓
(Post-deployment) Technical Debt Agent analyzes for improvements
```

---

## ✅ REQUIRED Pre-Commit Validation

**These commands MUST pass:**

```bash
# Tier 2: Code Quality
npm run format            # Auto-fix formatting issues
npm run validate          # Format + lint check

# Tier 3: Testing
npm run test              # All tests pass
npm run coverage          # >80% coverage required

# Tier 4: Documentation
npm run lint:md:fix       # Auto-fix markdown
npm run lint:md           # Markdown validation

# Verification
npm run tsc               # TypeScript check
```

---

## 📚 Quick Start by Task Type

### Create New Component

```bash
npm run format && npm run validate    # Lint (Tier 2)
npm run test -- --watch              # Test (Tier 3)
npm run lint:md:fix                  # Docs (Tier 4)
```

### Add API Integration

```bash
# Tier 2: Parallel execution
npm run validate          # Lint Agent
                         # API Agent validates React Query

npm run test              # Tier 3: Test Agent
npm run lint:md:fix       # Tier 4: Docs Agent
```

## Performance Optimization

```bash
# Research Agent triggers Performance Agent
# Performance Agent analyzes and recommends
# Refactoring Agent implements
npm run validate              # Tier 2: Re-validate
npm run test && npm coverage  # Tier 3: Re-test
```

---

## 🎯 Success Criteria by Agent

| Agent            | Success =                                                         |
| ---------------- | ----------------------------------------------------------------- |
| **Research**     | Routes to correct agents, analysis documented                     |
| **Lint**         | `npm run validate` passes ✅                                      |
| **React**        | Components functional, patterns correct, accessible               |
| **API**          | React Query v5 properly integrated, no N+1 queries                |
| **Package**      | Dependencies reviewed, compatible, secure                         |
| **Test**         | `npm run coverage` shows >80% lines/statements/branches/functions |
| **Architecture** | Recommendations documented, design patterns identified            |
| **Performance**  | Metrics documented, bottlenecks identified                        |
| **Refactoring**  | Recommendations implemented, tests still pass                     |
| **Docs**         | `npm run lint:md` passes ✅                                       |

---

## 📋 Pre-Commit Checklist

```bash
✅ npm run format         # Auto-fix formatting
✅ npm run validate       # Format + lint check
✅ npm run test           # Unit tests pass
✅ npm run coverage       # >80% coverage
✅ npm run lint:md:fix    # Fix markdown
✅ npm run lint:md        # Markdown valid
```

**If ANY fails**: Fix immediately - DO NOT commit.

---

## 🚀 Essential Commands Reference

```bash
# CODE QUALITY
npm run format            # Auto-fix linting + formatting
npm run lint              # Check lint violations
npm run validate          # Format + lint checks
npm run tsc               # TypeScript check

# TESTING
npm run test              # Run Jest (watch mode)
npm run test -- --bail    # Stop on first failure
npm run coverage          # With coverage report
npm run e2e:test          # Cypress E2E tests
npm run e2e:open          # Interactive E2E testing

# DOCUMENTATION
npm run lint:md:fix       # Auto-fix markdown
npm run lint:md           # Check markdown

# VERIFICATION (Before commit)
npm run validate && npm run coverage && npm run lint:md
```

---

## 🤝 Getting Help

| Question                | Answer                                                     |
| ----------------------- | ---------------------------------------------------------- |
| Where do I start?       | **Research Agent** - always first                          |
| Code doesn't pass lint? | Run `npm run format`                                       |
| Tests failing?          | Review **Test Agent** guide, run `npm run test -- --watch` |
| Component patterns?     | Follow **React Agent** guide                               |
| How do I fetch data?    | Use **API Agent** guide (React Query)                      |
| Documentation unclear?  | Check **Docs Agent** guide, run `npm run lint:md:fix`      |
| Performance concerns?   | Trigger **Performance Agent**                              |
| Design concerns?        | Trigger **Architecture Agent**                             |
| Technical debt?         | **Technical Debt Agent** post-deployment                   |

---

## 🔗 All Agent Documentation

- [Research Agent](./agents/research.agent.md) - Entry point & routing
- [Lint Agent](./agents/lint.agent.md) - Code quality
- [React Agent](./agents/react.agent.md) - Component patterns
- [API Agent](./agents/api.agent.md) - Data fetching
- [Test Agent](./agents/test.agent.md) - Testing & coverage
- [Architecture Agent](./agents/architecture.agent.md) - Module design (NEW)
- [Performance Agent](./agents/performance.agent.md) - Optimization (NEW)
- [Refactoring Agent](./agents/refactoring.agent.md) - Code improvement (NEW)
- [Docs Agent](./agents/docs.agent.md) - Documentation
- [Technical Debt Agent](./agents/technical-debt.agent.md) - Continuous improvement
- [Quality Standards](./agents/quality-standards.agent.md) - Team standards

---

**Version**: 2.0 (Restructured 3-Tier Architecture)
**Updated**: February 10, 2026
**Status**: ✅ Implementation Complete
