# TypeScript Strict Mode & Setup

Reference shared across **Lint Agent**, **React Agent**, and **Quality Standards Agent**.

---

## TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*", "pages/**/*"],
  "exclude": ["node_modules", "dist", ".next"]
}
```

---

## Strict Mode Flags Explained

### `strict: true`

Enables all strict type checking options:

| Flag                           | Effect                                | Example                            |
| ------------------------------ | ------------------------------------- | ---------------------------------- |
| `noImplicitAny`                | No `any` without explicit declaration | `function foo(x)` ✗                |
| `strictNullChecks`             | Null/undefined must be explicit       | `string` can't be `null`           |
| `strictFunctionTypes`          | Strict function type checking         | Function parameters contravariance |
| `strictBindCallApply`          | Strict `bind/call/apply` checking     | `fn.call()` type-safe              |
| `strictPropertyInitialization` | Properties must be initialized        | `name!` requires value             |
| `noImplicitThis`               | No implicit `this: any`               | `this` must be explicit            |

---

## Common TypeScript Patterns

### Typing Function Parameters

```typescript
// ❌ WRONG: No type annotation
function greet(name) {
  return `Hello, ${name}`;
}

// ✅ CORRECT: Type parameters
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ✅ WITH DEFAULTS
function greet(name: string = "Guest"): string {
  return `Hello, ${name}`;
}
```

### Optional vs Null Properties

```typescript
// ❌ WRONG: Allows null without being explicit
interface User {
  name: string;
  email: string;
  phone: string; // Can't be null
}

// ✅ CORRECT: Explicit optionality
interface User {
  name: string;
  email: string;
  phone?: string; // Optional (can be undefined)
  middleName: string | null; // Explicitly nullable
}

// ✅ USAGE
const user: User = {
  name: "John",
  email: "john@example.com",
  // phone is optional, not required
};
```

### Return Type Annotations

```typescript
// ❌ WRONG: Implicit return type
function sum(a: number, b: number) {
  return a + b;
}

// ✅ CORRECT: Explicit return type
function sum(a: number, b: number): number {
  return a + b;
}

// ✅ CORRECT: Async functions return Promise
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// ✅ CORRECT: Functions that don't return
function logError(error: Error): void {
  console.error(error.message);
}
```

### Generic Types

```typescript
// ❌ WRONG: Using any loses type safety
function identity(x: any): any {
  return x;
}

// ✅ CORRECT: Using generics preserves type
function identity<T>(x: T): T {
  return x;
}

// ✅ USAGE
const num = identity(42); // type is number
const str = identity("hello"); // type is string

// ✅ ARRAY GENERICS
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

// ✅ OBJECT GENERICS
interface Response<T> {
  data: T;
  status: number;
  error?: string;
}

const userResponse: Response<User> = {
  data: { name: "John", email: "john@example.com" },
  status: 200,
};
```

### Union and Intersection Types

```typescript
// ❌ WRONG: Using string | null | undefined
function process(value: string | null | undefined) {
  return value.toUpperCase(); // Could crash!
}

// ✅ CORRECT: Type guards
function process(value: string | null | undefined): string {
  if (!value) return "";
  return value.toUpperCase();
}

// ✅ DISCRIMINATED UNIONS
type Result =
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data); // type is string
  } else {
    console.log(result.error); // type is Error
  }
}

// ✅ INTERSECTION TYPES (combine types)
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

type Person = Named & Aged;
const person: Person = { name: "John", age: 30 };
```

### Never Type (unreachable code)

```typescript
// ✅ CORRECT: Assert exhaustiveness
type Direction = "left" | "right" | "up" | "down";

function move(direction: Direction) {
  switch (direction) {
    case "left":
      return "moving left";
    case "right":
      return "moving right";
    case "up":
      return "moving up";
    case "down":
      return "moving down";
    default:
      const _exhaustiveCheck: never = direction;
      return _exhaustiveCheck;
  }
}

// If you add a new Direction but forget to handle it,
// TypeScript will error on that new case!
```

---

## React + TypeScript Patterns

### Functional Component Types

```typescript
// ✅ CORRECT: React.FC for components
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary"
}) => {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

// ✅ ALTERNATIVE: Function signature
export function Button({ children, onClick, variant }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Hooks with Proper Types

```typescript
import { useState, useCallback, useEffect, ReactState } from "react";

// ✅ CORRECT: Typed state
export function Counter() {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("Guest");

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]); // Dependencies typed by TypeScript

  return (
    <>
      <p>{name}: {count}</p>
      <button onClick={increment}>Increment</button>
    </>
  );
}

// ✅ TYPED useRef
const inputRef = useRef<HTMLInputElement>(null);

// ✅ TYPED useContext
interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
```

### Event Handlers

```typescript
// ✅ CORRECT: Typed event handler
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  // value is automatically typed as string
};

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // event is typed correctly
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // form data handling
};
```

---

## Strict Mode Violation Fixes

### Fix: No Implicit Any

```typescript
// ❌ ERROR: Parameter implicitly has an 'any' type
function add(a, b) {
  return a + b;
}

// ✅ FIX: Explicitly type parameters
function add(a: number, b: number): number {
  return a + b;
}
```

### Fix: Unused Variables

```typescript
// ❌ ERROR: 'unusedVar' is declared but never used
const unusedVar = "hello";

// ✅ FIX 1: Use the variable
const message = "hello";
console.log(message);

// ✅ FIX 2: Prefix with _ if intentionally unused
const _intentionallyUnused = "hello";

// ✅ FIX 3: Use TypeScript @ts-ignore (last resort)
// @ts-ignore - Needed for backward compatibility
```

### Fix: Null Checks Required

```typescript
// ❌ ERROR: Object is possibly 'null'
const user = getUser();
console.log(user.name);

// ✅ FIX: Add null check
const user = getUser();
if (user) {
  console.log(user.name);
}

// ✅ FIX: Optional chaining
console.log(user?.name);

// ✅ FIX: Nullish coalescing
console.log(user?.name ?? "Unknown");
```

---

## Type Checking Commands

```bash
npm run tsc                 # Check types (no compilation)
npm run tsc -- --noEmit     # Check types without output
npm run tsc:watch           # Watch mode for type checking
npm run type-check          # Alias for npm run tsc
```

---

## Integration with Linting

ESLint rules enforce TypeScript strict mode practices:

- `@typescript-eslint/no-explicit-any` - No `any` type
- `@typescript-eslint/no-unused-vars` - Catch unused code
- `@typescript-eslint/explicit-function-return-types` - Return types required
- `@typescript-eslint/explicit-module-boundary-types` - Library exports typed
- `@typescript-eslint/no-floating-promises` - Promise chains handled
- `@typescript-eslint/array-type` - Use `T[]` not `Array<T>`

Run both together:

```bash
npm run lint -- --fix       # Fixes many TypeScript issues
npm run tsc                 # Catches remaining type errors
```
