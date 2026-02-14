import React from "react";
import { render, screen } from "@testing-library/react";
import HydrationSafeErrorBoundary from "./HydrationSafeErrorBoundary";

function ThrowError(): JSX.Element | null {
  throw new Error("boom");
}

describe("HydrationSafeErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    render(
      <HydrationSafeErrorBoundary>
        <div>Safe content</div>
      </HydrationSafeErrorBoundary>,
    );
    expect(screen.getByText("Safe content")).toBeInTheDocument();
  });

  it("renders fallback when error occurs", () => {
    render(
      <HydrationSafeErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowError />
      </HydrationSafeErrorBoundary>,
    );

    expect(screen.getByText("Custom fallback")).toBeInTheDocument();
  });

  it("calls onError when catching an error", () => {
    const onError = jest.fn();
    render(
      <HydrationSafeErrorBoundary
        onError={onError}
        fallback={<div>Custom fallback</div>}
      >
        <ThrowError />
      </HydrationSafeErrorBoundary>,
    );
    expect(onError).toHaveBeenCalled();
  });

  it("renders default fallback when error occurs and no fallback provided", () => {
    render(
      <HydrationSafeErrorBoundary>
        <ThrowError />
      </HydrationSafeErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("warns if fallback is not set during initialization", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <HydrationSafeErrorBoundary>
        <div>Safe content</div>
      </HydrationSafeErrorBoundary>,
    );
    expect(warnSpy).toHaveBeenCalledWith(
      "HydrationSafeErrorBoundary fallback not set!",
    );
    warnSpy.mockRestore();
  });

  it("logs error to console when caught", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <HydrationSafeErrorBoundary fallback={<div>Error</div>}>
        <ThrowError />
      </HydrationSafeErrorBoundary>,
    );
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("handles errors in onError callback gracefully", () => {
    const onError = jest.fn(() => {
      throw new Error("Error in callback");
    });
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <HydrationSafeErrorBoundary fallback={<div>Error</div>} onError={onError}>
        <ThrowError />
      </HydrationSafeErrorBoundary>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Error in onError handler of HydrationSafeErrorBoundary:",
      expect.any(Error),
    );
    errorSpy.mockRestore();
  });
});
