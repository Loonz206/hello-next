import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

// Helper component to throw error
function ThrowError(): JSX.Element | null {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>,
    );
    expect(getByText("Safe content")).toBeInTheDocument();
  });

  it("renders fallback when error occurs", () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(getByText("Custom fallback")).toBeInTheDocument();
  });

  it("renders default fallback when error occurs and no fallback is provided", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("warns if fallback is not set", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>,
    );
    expect(warnSpy).toHaveBeenCalledWith("ErrorBoundary fallback not set!");
    warnSpy.mockRestore();
  });

  it("logs error when error is caught", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
