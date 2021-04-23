import React from "react";
import {
  render,
  cleanup,
  act,
  screen,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Layout from "../components/Layout";

describe("Layout", () => {
  afterEach(cleanup);

  test("toggles the navigation", () => {
    // assemble
    const { getByText, container } = render(<Layout />);
    expect(getByText("about")).toBeInTheDocument();
    expect(getByText("contact")).toBeInTheDocument();
    expect(container.querySelector(".wrap")).toBeInTheDocument();

    // act
    act(() => {
      global.innerWidth = 600;
      const link = screen.queryByRole("link", { name: /menu ☰/i });
      fireEvent.click(link);
    });
    // assert
    expect(container.querySelector(".wrap.active")).toBeInTheDocument();
    // cleanup
  });
});
