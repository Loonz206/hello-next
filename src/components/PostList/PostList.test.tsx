import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostList from "./PostList";
import { IMAGE_ALT_TEXT } from "../../constants/images";

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
      />,
    );
    const displayedImage = container.querySelector("img");
    expect(displayedImage?.src).toBe(
      "http://localhost/_next/image?url=https%3A%2F%2Fplacehold.it%2F720%2F405&w=1920&q=75",
    );
    expect(displayedImage?.alt).toBe(IMAGE_ALT_TEXT.BLOG_COVER);
    expect(container.querySelector(".nav-link")).toBeInTheDocument();
  });

  it("should render with placeholder image when imageCover is not provided", () => {
    const { container } = render(
      <PostList date={date} title="test" slug="test-slug" imageCover="" />,
    );
    const displayedImage = container.querySelector("img");
    expect(displayedImage?.alt).toBe(IMAGE_ALT_TEXT.BLOG_COVER);
    // Image should use placeholder URL
    expect(displayedImage?.src).toContain("place-hold.it");
  });

  it("should display post title and date", () => {
    const { getByText } = render(
      <PostList
        date={date}
        title="My First Post"
        slug="my-first-post"
        imageCover={imageCover}
      />,
    );
    expect(getByText("My First Post")).toBeInTheDocument();
    expect(getByText(/Wed Jul 05 2023/)).toBeInTheDocument();
  });

  it("should have correct navigation link", () => {
    const slug = "test-post";
    const { container } = render(
      <PostList date={date} title="Test" slug={slug} imageCover={imageCover} />,
    );
    const link = container.querySelector(".nav-link");
    expect(link).toHaveAttribute("href", `/blog/${slug}`);
  });
});
