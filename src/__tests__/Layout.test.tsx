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
  const links = [
    {
      name: "about",
      path: "/about",
      id: 0,
    },
    {
      name: "contact",
      path: "/contact",
      id: 1,
    },
  ];
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("toggles the navigation", () => {
    // assemble
    const { getByText, container } = render(<Layout links={links} />);
    expect(getByText("about")).toBeInTheDocument();
    expect(getByText("contact")).toBeInTheDocument();
    expect(container.querySelector(".wrap")).toBeInTheDocument();
    expect(container.querySelector("#wrap")).toBeInTheDocument();
    // // act
    act(() => {
      global.innerWidth = 600;
      const link = screen.queryByRole("link", { name: /menu ☰/i });
      fireEvent.click(link);
    });
    // // assert
    expect(container.querySelector(".wrap")).toBeInTheDocument();
    // // cleanup
  });
});
