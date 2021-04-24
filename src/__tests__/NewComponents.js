import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewComponent from "../components/NewComponent";

describe("Header", () => {
  afterEach(cleanup);

  test("renders Header component with the example nav passed", () => {
    const greeting = "Hello Lenny";
    act(() => {
      const { getByText } = render(<NewComponent greeting={greeting} />);
      expect(getByText("Hello Lenny")).toBeInTheDocument();
    });
  });
});
