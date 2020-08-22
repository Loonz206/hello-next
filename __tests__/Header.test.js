import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../components/Header";

describe("Header", () => {
  test("renders Header component", () => {
    const nav = [{ title: "Bacon", path: "/bacon" }];
    const { getByText } = render(<Header nav={nav} />);
    expect(getByText("Bacon")).toBeInTheDocument();
  });
});
