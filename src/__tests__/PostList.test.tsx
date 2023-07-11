import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostList from "../components/PostList";

describe("<PostList/>", () => {
  const date = `Wed Jul 05 2023 20:35:15 GMT-0700 (Pacific Daylight Time)`;
  const imageCover = "https://placehold.it/720/405";
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render an image and a link for the navigation", async () => {
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
      "http://localhost/_next/image?url=https%3A%2F%2Fplacehold.it%2F720%2F405&w=1920&q=75"
    );
    expect(displayedImage.alt).toBe("a grey frame");
    expect(container.querySelector(".nav-link")).toBeInTheDocument();
  });
});
