import { act, cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostList from "../components/PostList";

describe("<PostList/>", () => {
  const date = `Wed Jul 05 2023 20:35:15 GMT-0700 (Pacific Daylight Time)`;
  const imageCover = "https://placehold.it/720/405";
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render an image and a link for the navigation", () => {
    act(() => {
      const { container } = render(
        <PostList
          date={date}
          title={"hello"}
          slug={"world"}
          imageCover={imageCover}
        />
      );

      const displayedImage = container.querySelector("img");

      expect(displayedImage.src).toBe(
        "data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27720%27%20height=%27405%27/%3e"
      );
      expect(displayedImage.alt).toBe("");
      expect(container.querySelector(".nav-link")).toBeInTheDocument();
    });
  });
});
