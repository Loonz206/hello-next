import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/components/Header";

describe.only("Header", () => {
  test("renders Header component with the example nav passed", () => {
    const links = [
      {
        id: 0,
        name: "home",
        path: "/",
      },
      {
        id: 1,
        name: "about",
        path: "/about",
      },
    ];
    const { getByText } = render(<Header links={links} />);
    expect(getByText("home")).toBeInTheDocument();
    expect(getByText("about")).toBeInTheDocument();
  });
});
