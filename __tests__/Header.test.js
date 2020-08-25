import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../components/Header";

describe.only("Header", () => {
  test("renders Header component with the example nav passed", () => {
    const nav = [{ title: "Bacon", path: "/bacon" }];
    const { getByText } = render(<Header nav={nav} />);
    expect(getByText("Bacon")).toBeInTheDocument();
  });
});
