import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import Main from "./Main";

describe("Main", () => {
  // cleanup
  afterEach(cleanup);

  test("toggles the navigation", () => {
    // assemble
    const renderResult = render(
      <Main>
        <h1>Hello Children</h1>
      </Main>,
    );
    expect(
      renderResult.container.querySelector("#content"),
    ).toBeInTheDocument();
    expect(renderResult.container.querySelector(".main")).toBeInTheDocument();
    // assert
    expect(
      renderResult.getByRole("heading", { name: "Hello Children" }),
    ).toBeInTheDocument();
  });
});
