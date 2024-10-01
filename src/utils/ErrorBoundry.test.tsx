import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundry";

describe("<ErrorBoundry/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows a component when there is no Error", () => {
    const Greeting = () => {
      return <div>Hello World</div>;
    };
    const FallbackComponent = (error) => <span>Error: {error.message}</span>;
    const { getByText, unmount } = render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <Greeting />
      </ErrorBoundary>,
    );
    getByText("Hello World");
    unmount();
  });

  it("Throws an error when a error happens", () => {
    console.error = jest.fn();
    jest.spyOn(console, "error");
    const Greeting = () => {
      throw new Error("Oh shit");
    };

    const FallbackComponent = (error) => <span>Error: {error.message}</span>;
    const { unmount } = render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <Greeting />
      </ErrorBoundary>,
    );
    expect(console.error).toHaveBeenCalled();
    unmount();
  });

  it("throws warning if no fallback is given", () => {
    console.warn = jest.fn();
    jest.spyOn(console, "warn");
    const Greeting = () => {
      return <div>Hello World</div>;
    };

    const { unmount } = render(
      <ErrorBoundary>
        <Greeting />
      </ErrorBoundary>,
    );
    expect(console.warn).toHaveBeenCalled();
    unmount();
  });
});
