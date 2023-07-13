import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../components/Footer";

describe("Footer Component", () => {
  test("should have the copyright in the footer", async () => {
    const date = new Date().getFullYear();
    const { getByText } = render(<Footer />);

    await waitFor(() => {
      expect(
        getByText(`Next Blog | Copyright 2020-${date}`)
      ).toBeInTheDocument();
    });
  });
});
