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
});
