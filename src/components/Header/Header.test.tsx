import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header", () => {
  afterEach(cleanup);

  test("renders Header component with the example nav passed", async () => {
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
    const { getByText } = render(
      <Header
        links={links}
        active={false}
        handleClick={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
    );
    await waitFor(() => {
      expect(getByText("home")).toBeInTheDocument();
      expect(getByText("about")).toBeInTheDocument();
    });
  });
});
