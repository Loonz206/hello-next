import {
  render,
  cleanup,
  act,
  screen,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Layout from "./Layout";

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

  it("renders without crashing", () => {
    const children = <div>Children</div>;
    render(<Layout links={links}>{children}</Layout>);
  });

  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("toggles the navigation", () => {
    const children = <div>Children</div>;
    // assemble
    const { getByText, container } = render(
      <Layout links={links}>{children}</Layout>,
    );
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
    expect(container.querySelector("#wrap")).toBeInTheDocument();
    expect(container.querySelector(".wrap")).toBeInTheDocument();
    expect(container.querySelector(".wrap .active")).toBeInTheDocument();
    // // cleanup
  });
});
