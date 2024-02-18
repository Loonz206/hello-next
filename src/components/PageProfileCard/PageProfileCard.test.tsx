import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageProfileCard from "./PageProfileCard";

describe("<PageProfileCard/>", () => {
  const twitterHandle = "test";
  const jobRole = "test";
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("should render an image and a link for the navigation", async () => {
    const { container } = render(
      <PageProfileCard twitterHandle={twitterHandle} jobRole={jobRole} />,
    );

    const displayedImage = container.querySelector("img");

    expect(displayedImage.src).toBe(
      "http://localhost/_next/image?url=%2Fimg.jpg&w=640&q=75",
    );
    expect(displayedImage.alt).toBe("logo");
    expect(container.querySelector(".nav-link")).toBeInTheDocument();
  });
});
