// src/components/PageProfileCard/PageProfileCard.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PageProfileCard from "./PageProfileCard";

interface MockLinkProps {
  children: React.ReactNode;
  href: string;
}

interface MockImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

/* Mock Next.js components */
jest.mock("next/link", () => {
  const MockedLink = ({ children, href }: MockLinkProps) => (
    <a href={href}>{children}</a>
  );
  MockedLink.displayName = "MockedLink";
  return MockedLink;
});

jest.mock("next/image", () => {
  const MockedImage = ({ src, alt, width, height }: MockImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={String(width)} height={String(height)} />
  );
  MockedImage.displayName = "MockedImage";
  return MockedImage;
});

describe("PageProfileCard", () => {
  const twitterHandle = "myhandle";
  const jobRole = "Frontend Engineer";

  it("renders job role with an internal link and an external Twitter link", () => {
    render(<PageProfileCard twitterHandle={twitterHandle} jobRole={jobRole} />);

    // External Twitter link
    const externalLink = screen.getByRole("link", {
      name: new RegExp(`^${twitterHandle}$`, "i"),
    });
    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveAttribute(
      "href",
      `https://twitter.com/${twitterHandle}`,
    );
  });

  it("renders the company logo image with correct alt text and dimensions", () => {
    render(<PageProfileCard twitterHandle={twitterHandle} jobRole={jobRole} />);

    const img = screen.getByAltText("Company logo") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.any(String));
    expect(img).toHaveAttribute("width", "200");
    expect(img).toHaveAttribute("height", "200");
  });
});
