# Coding Rules for _Your Next.js App_

This document formalises the coding‑style, architecture and quality rules that every developer must follow when contributing to the project.
All rules are enforced automatically via _ESLint_, _Prettier_, _TypeScript_ and _SonarQube_ integrations.
If a change violates any rule, continuous‑integration guarantees the pull request will not merge until the issue is fixed.

---

## 1. Repo‑wide tooling

| Tool                             | Configuration                                                                                                                       | Purpose                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **TypeScript**                   | `tsconfig.json` – strict mode, noImplicitAny, noImplicitThis, etc.                                                                  | Compile‑time safety            |
| **ESLint**                       | `.eslintrc.js` – `plugin:@next/next/recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended`, custom rules | Syntax & style linting         |
| **Prettier**                     | `.prettierrc.json`                                                                                                                  | Uniform formatting             |
| **Jest + React‑Testing‑Library** | `jest.config.js`                                                                                                                    | Unit & integration tests       |
| **SonarQube**                    | `sonar-project.properties`                                                                                                          | Static‑analysis & Quality Gate |
| **CommitLint**                   | `commitlint.config.js`                                                                                                              | Conventional commits syntax    |
| **Husky**                        | `husky.config.js`                                                                                                                   | Pre‑commit / pre‑push hooks    |

**All Linting and formatting are run locally (`npm run lint`, `npm run format`) and in CI (`CI=true`).**
Any failure will abort the pipeline.

---

## 2. Naming & File Organization

- **Folders**: Group by feature.

  ```
  app/
    (auth)/login/
    (auth)/register/
    /dashboard/
    /components/
    /hooks/
    /context/
    /lib/
  __tests__/
  ```

- **Components**: PascalCase (`LoginForm.tsx`).
  File names match component names: `Button.tsx`, `UserCard.tsx`.
- **Hooks**: `use[Name].ts` (`useAuth.ts`, `useFetch.ts`).
- **Interfaces / Types**: `type` for simple unions / primitives, `interface` for extending shapes.
- **Constants**: Upper‑case, snake‑case – `API_ROUTES`, `TEMPLATE_TEXT`.

---

## 3. Programming style

### 3.1 TypeScript

| Guideline                                                    | Example                                           |
| ------------------------------------------------------------ | ------------------------------------------------- | --------- | --------- | -------- |
| `strict` mode **must** be enabled.                           | N/A                                               |
| Never use `any`.                                             | ❌ `any`; ✅ `unknown` or strongly‑typed generics |
| Prefer discriminated unions for conditional branches.        | ✅ `type Status = "idle"                          | "loading" | "success" | "error"` |
| Use `as const` for read‑only literal arrays.                 | `const COLORS = ["red", "green"] as const`        |
| Explicit return types for exported functions and components. | `export function fetchUsers(): Promise<User[]>`   |
| Keep functions small; cognitive complexity ≤ 15.             |

### 3.2 React

| Rule                                                                    | Explanation                          |
| ----------------------------------------------------------------------- | ------------------------------------ |
| **Only Server Components unless `use client` is needed**                | Avoid unnecessary client bundle.     |
| `use client` directive at the _top_ of the file.                        | Guarantees a single source of truth. |
| Pass props by _value_, not _function_ unless necessary.                 | Keeps components declarative.        |
| Prefer `React.FC` only when you need children implicit typing.          | Avoids `children` pitfalls.          |
| Use `React.memo` for pure presentational components with minimal state. | Prevents accidental re‑renders.      |
| Keep component JSX to < 300 lines.                                      | Split large UI into smaller parts.   |
| Use `key` when mapping lists.                                           | `key={item.id}`                      |

### 3.3 Hooks & State

| Hook                                      | Use‑case                                                          |
| ----------------------------------------- | ----------------------------------------------------------------- |
| `useState<T>()`                           | Simple local state                                                |
| `useReducer`                              | Complex branching or multi‑value state                            |
| `useContext`                              | Small domain‑specific global state                                |
| **React Query** (`@tanstack/react-query`) | Server state that is cacheable, refetchable                       |
| Custom hooks                              | Encapsulate reusable logic (e.g., `useForm`, `useAuthConnection`) |

### 3.4 API & Data Fetching

| Rule                                                                                  | Details                                |
| ------------------------------------------------------------------------------------- | -------------------------------------- |
| All API routes must be under `app/api/` with proper HTTP verbs (`GET`, `POST`, etc.). | Avoid “backend‑in‑the‑client” pitfalls |
| Use `NextResponse.json()` for responses.                                              | Sets proper `Content‑Type`.            |
| Wrap data accesses in try/catch, return `500` on error.                               | Centralised error handling             |
| Prefer `fetch` in server components with `next: { revalidate: X }` for ISR.           | Automatic cache invalidation.          |

### 3.5 Security & Sanitisation

| Rule                                           | Implementation                                 |
| ---------------------------------------------- | ---------------------------------------------- |
| Escape all data rendered into the DOM.         | `dangerouslySetInnerHTML` never used.          |
| Sanitize user input on both client and server. | Use `dompurify` or built‑in `sanitize-html`.   |
| No hard‑coded secrets in code.                 | Use environment variables (`process.env.FOO`). |
| Use CSRF‑protected endpoints where needed.     | CSRF tokens in cookies or headers.             |
| Use HTTPS for all external calls.              | Default in Node proxy.                         |

### 3.6 Accessibility

| Guideline                                                                 | Example                                |
| ------------------------------------------------------------------------- | -------------------------------------- |
| Use semantic tags (`<header>`, `<main>`, `<footer>`, `<nav>`)             | Avoid `<div role="banner">`            |
| All interactive elements have `aria-label` or proper `<label>` for forms. | `<label htmlFor="email">Email</label>` |
| Images have `alt` attributes (or `role="presentation"` if decorative).    | `<img src="" alt="User avatar">`       |
| Contrast ratios meet WCAG 2.1 AA.                                         | Use design token system.               |
| Keyboard navigation tested with `Tab`/`Space`.                            | No focus trap errors.                  |

---

## 4. Testing

| Type            | Tools                                   | Guidelines                                |
| --------------- | --------------------------------------- | ----------------------------------------- |
| **Unit**        | Jest + React‑Testing‑Library            | Test components in isolation.             |
| **Integration** | Jest + MSW (Mock Service Worker)        | Test API interactions.                    |
| **E2E**         | Cypress                                 | Optional – for critical flows.            |
| **Coverage**    | `jest.config.js` covers <90% fails.     | Unexpected missing branches sound alerts. |
| **Test Naming** | `ComponentName.test.tsx`                | One file per component.                   |
| **Mocking**     | Use `jest.spyOn` & `mockImplementation` | Keep tests deterministic.                 |

---

## 5. Code Quality & SonarQube

| Rule                          | SonarQube Setting                  |
| ----------------------------- | ---------------------------------- |
| **Coverage ≥ 80 %**           | `coverageThreshold.global` in Jest |
| **Duplicated Lines ≤ 3 %**    | SonarQube “Duplicated Lines” rule  |
| **Cognitive Complexity ≤ 15** | `sonarjs/cognitive-complexity`     |
| **No Hard‑coded Secrets**     | `security/hardcoded-credentials`   |
| **No Unused Code**            | `squid:UnusedPrivateMethod`        |
| **No Empty Catch**            | `squid:EmptyCatchBlock`            |
| **No Empty Functions**        | `sonarjs:no-empty-function`        |

SonarQube is executed in CI/CD after tests:

```bash
sonar-scanner      # uses sonar-project.properties
```

If the quality gate fails, the PR is blocked.

---

## 6. Commit & Branching Policy

| Policy                         | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ | --------------------- |
| **Conventional Commits**       | `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`. |
| **Branch Prefixes**            | `feat/`, `fix/`, `refactor/`, `docs/`                        | Simplifies PR review. |
| **PR Description**             | Must contain “What” + “Why” + “How”.                         |
| **Code Review**                | Minimum **two** reviewers (except for `docs/*` branches).    |
| **CI must pass** before merge. |

---

## 7. Package‑Specific Guidelines

### 7.1 Next JS (v13+)

• `use client` only when needed (event handlers, useState)
• `app/` must not contain dynamic route filenames (`[slug].tsx` is okay, but avoid `slug/` directories with non‑API files).

### 7.2 React‑Query

• Cache key is a tuple `[resource, id]`
• `staleTime` ≥ 5 min for user profile data
• Invalidate relevant queries on mutation success

### 7.3 MSW

• Use in tests only (not production)
• Keep mock handlers in `/mocks/handlers.ts`

### 7.4 ESLint Rules

Key overrides:

```javascript
module.exports = {
  rules: {
    "@next/next/no-html-link-for-font": "off",
    "react/react-in-jsx-scope": "off", // TSX 18+ auto imports
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "import/no-unresolved": "error",
    complexity: ["warn", 15],
    "sonarjs/cognitive-complexity": ["warn", 15],
  },
};
```

---

## 8. Example Code Block

```tsx
// app/dashboard/UserCard.tsx
"use client"; // <-- client component because it uses state / effects
import { useState } from "react";
import api from "~/lib/api";

interface User {
  id: string;
  name: string;
  avatar: string;
}

export const UserCard: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      const res = await api.getUser(userId);
      if (isMounted) setUser(res);
    };
    fetch();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (!user) return <Spinner />;

  return (
    <div className="card">
      <img src={user.avatar} alt={`${user.name} avatar`} />
      <h3>{user.name}</h3>
      {/* ... */}
    </div>
  );
};
```
