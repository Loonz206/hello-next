import {
  captureError,
  withErrorHandling,
  getSeverityForError,
  formatErrorForUser,
  ErrorCategory,
  ErrorSeverity,
} from "./errorHandling";

describe("Error Handling Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("captureError", () => {
    it("should capture error with all parameters", () => {
      const error = new Error("Test error");
      const errorSpy = jest.spyOn(console, "error").mockImplementation();

      const context = captureError(
        error,
        "testFunction",
        ErrorCategory.CONTENT_FETCH,
        ErrorSeverity.HIGH,
        { slug: "test-slug" },
      );

      expect(context.message).toBe("Test error");
      expect(context.source).toBe("testFunction");
      expect(context.category).toBe(ErrorCategory.CONTENT_FETCH);
      expect(context.severity).toBe(ErrorSeverity.HIGH);
      expect(context.tags?.slug).toBe("test-slug");
      expect(errorSpy).toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    it("should handle string errors", () => {
      const errorSpy = jest.spyOn(console, "error").mockImplementation();

      const context = captureError("String error", "testFunc");

      expect(context.message).toBe("String error");
      expect(context.originalError).toBeUndefined();

      errorSpy.mockRestore();
    });

    it("should use default category and severity", () => {
      const error = new Error("Test");
      const errorSpy = jest.spyOn(console, "error").mockImplementation();

      const context = captureError(error, "testFunc");

      expect(context.category).toBe(ErrorCategory.UNKNOWN);
      expect(context.severity).toBe(ErrorSeverity.MEDIUM);

      errorSpy.mockRestore();
    });

    it("should include timestamp", () => {
      const error = new Error("Test");
      const errorSpy = jest.spyOn(console, "error").mockImplementation();

      const context = captureError(error, "testFunc");

      expect(context.timestamp).toBeDefined();
      expect(new Date(context.timestamp).getTime()).toBeLessThanOrEqual(
        Date.now(),
      );

      errorSpy.mockRestore();
    });
  });

  describe("withErrorHandling", () => {
    it("should return result on success", async () => {
      const asyncFn = async () => "success";

      const result = await withErrorHandling(
        asyncFn,
        "testFunc",
        ErrorCategory.VALIDATION,
      );

      expect(result).toBe("success");
    });

    it("should catch and return undefined on error", async () => {
      const asyncFn = async () => {
        throw new Error("Failed");
      };
      const errorSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await withErrorHandling(
        asyncFn,
        "testFunc",
        ErrorCategory.VALIDATION,
      );

      expect(result).toBeUndefined();
      expect(errorSpy).toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    it("should return fallback value on error", async () => {
      const asyncFn = async () => {
        throw new Error("Failed");
      };
      const errorSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await withErrorHandling(
        asyncFn,
        "testFunc",
        ErrorCategory.VALIDATION,
        "fallback",
      );

      expect(result).toBe("fallback");

      errorSpy.mockRestore();
    });
  });

  describe("getSeverityForError", () => {
    it("should return MEDIUM for not found errors", () => {
      const error = new Error("Post not found");
      const severity = getSeverityForError(error);
      expect(severity).toBe(ErrorSeverity.MEDIUM);
    });

    it("should return HIGH for timeout errors", () => {
      const error = new Error("Request timeout");
      const severity = getSeverityForError(error);
      expect(severity).toBe(ErrorSeverity.HIGH);
    });

    it("should return HIGH for authentication errors", () => {
      const error = new Error("Authentication failed");
      const severity = getSeverityForError(error);
      expect(severity).toBe(ErrorSeverity.HIGH);
    });

    it("should return MEDIUM for unknown errors", () => {
      const error = new Error("Some unknown error");
      const severity = getSeverityForError(error);
      expect(severity).toBe(ErrorSeverity.MEDIUM);
    });

    it("should handle non-Error types", () => {
      const severity = getSeverityForError("String error");
      expect(severity).toBe(ErrorSeverity.MEDIUM);
    });
  });

  describe("formatErrorForUser", () => {
    it("should format CONTENT_FETCH errors", () => {
      const context = {
        category: ErrorCategory.CONTENT_FETCH,
        severity: ErrorSeverity.HIGH,
        source: "test",
        message: "API failed",
        timestamp: new Date().toISOString(),
      };

      const formatted = formatErrorForUser(context);

      expect(formatted).toBe(
        "Unable to load content. Please try refreshing the page.",
      );
    });

    it("should format VALIDATION errors", () => {
      const context = {
        category: ErrorCategory.VALIDATION,
        severity: ErrorSeverity.MEDIUM,
        source: "test",
        message: "Invalid data",
        timestamp: new Date().toISOString(),
      };

      const formatted = formatErrorForUser(context);

      expect(formatted).toBe("Invalid data received. Please try again.");
    });

    it("should format unknown category errors", () => {
      const context = {
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.LOW,
        source: "test",
        message: "Unknown error",
        timestamp: new Date().toISOString(),
      };

      const formatted = formatErrorForUser(context);

      expect(formatted).toBe("Something went wrong. Please try again later.");
    });
  });
});
