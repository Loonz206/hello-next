import { render, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import Main from "../components/Main";

describe("Main", () => {
  // cleanup
  afterEach(cleanup);

  test("toggles the navigation", () => {
    // assemble
    let children;
    const { container } = render(<Main>{children}</Main>);
    expect(container.querySelector("#content")).toBeInTheDocument();
    expect(container.querySelector(".main")).toBeInTheDocument();
    // act
    act(() => {
      children = render(
        <Main>
          <h1>Hello Children</h1>
        </Main>
      );
    });
    // assert
    expect(children.getByText("Hello Children")).toBeInTheDocument();
  });
});
