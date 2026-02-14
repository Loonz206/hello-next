/**
 * Structured Error Handling Utility
 * Provides consistent error logging, context capture, and error categorization
 */

export enum ErrorCategory {
  CONTENT_FETCH = "CONTENT_FETCH",
  VALIDATION = "VALIDATION",
  RENDER = "RENDER",
  UNKNOWN = "UNKNOWN",
}

export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface ErrorContext {
  category: ErrorCategory;
  severity: ErrorSeverity;
  source: string; // Function or component name
  message: string;
  timestamp: string;
  tags?: Record<string, string | number>;
  originalError?: Error;
}

/**
 * Captures error context and logs structured error information
 */
export function captureError(
  error: unknown,
  source: string,
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  tags?: Record<string, string | number>,
): ErrorContext {
  const errorMessage = error instanceof Error ? error.message : String(error);

  const context: ErrorContext = {
    category,
    severity,
    source,
    message: errorMessage,
    timestamp: new Date().toISOString(),
    tags,
    originalError: error instanceof Error ? error : undefined,
  };

  // Log structured error context
  console.error(
    JSON.stringify({
      level: "error",
      ...context,
      stack: error instanceof Error ? error.stack : undefined,
    }),
  );

  return context;
}

/**
 * Safe error handler wrapper for async operations
 */
export async function withErrorHandling<T>(
  asyncFn: () => Promise<T>,
  source: string,
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  fallback?: T,
): Promise<T | undefined> {
  try {
    return await asyncFn();
  } catch (error) {
    captureError(error, source, category, ErrorSeverity.HIGH);
    return fallback;
  }
}

/**
 * Determines severity based on error type
 */
export function getSeverityForError(error: unknown): ErrorSeverity {
  if (error instanceof Error) {
    if (error.message.includes("not found")) return ErrorSeverity.MEDIUM;
    if (error.message.includes("timeout")) return ErrorSeverity.HIGH;
    if (error.message.includes("authentication")) return ErrorSeverity.HIGH;
  }
  return ErrorSeverity.MEDIUM;
}

/**
 * Formats error context for user display (safe, non-sensitive)
 */
export function formatErrorForUser(context: ErrorContext): string {
  if (context.category === ErrorCategory.CONTENT_FETCH) {
    return "Unable to load content. Please try refreshing the page.";
  }
  if (context.category === ErrorCategory.VALIDATION) {
    return "Invalid data received. Please try again.";
  }
  return "Something went wrong. Please try again later.";
}
