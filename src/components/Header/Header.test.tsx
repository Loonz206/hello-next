import { render, cleanup, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
        handleClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    await waitFor(() => {
      expect(getByText("home")).toBeInTheDocument();
      expect(getByText("about")).toBeInTheDocument();
    });
  });

  test("renders navigation role and nav links have correct hrefs", () => {
    const links = [
      { id: 0, name: "home", path: "/" },
      { id: 1, name: "about", path: "/about" },
    ];
    const { getByRole, getAllByRole } = render(
      <Header links={links} active={false} handleClick={() => {}} />,
    );
    expect(getByRole("navigation")).toBeInTheDocument();
    const navLinks = getAllByRole("link").filter((link) =>
      link.className.includes("nav-link"),
    );
    expect(navLinks[0]).toHaveAttribute("href", "/");
    expect(navLinks[1]).toHaveAttribute("href", "/about");
  });

  test("calls handleClick when menu not active", async () => {
    const links = [{ id: 0, name: "home", path: "/" }];
    const handleClick = jest.fn();
    const user = userEvent.setup();

    const { getByRole } = render(
      <Header links={links} active={false} handleClick={handleClick} />,
    );

    const hamburger = getByRole("button", { name: "Toggle navigation menu" });
    await user.click(hamburger);

    expect(handleClick).toHaveBeenCalled();
  });

  test("closes menu when clicking nav link while menu is active", async () => {
    const links = [{ id: 0, name: "home", path: "/" }];
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Header links={links} active={true} handleClick={handleClick} />);

    const homeLink = screen.getByText("home");
    await user.click(homeLink);

    expect(handleClick).toHaveBeenCalled();
  });

  test("does not close menu when clicking nav link while menu is inactive", async () => {
    const links = [{ id: 0, name: "home", path: "/" }];
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Header links={links} active={false} handleClick={handleClick} />);

    const homeLink = screen.getByText("home");
    await user.click(homeLink);

    // handleClick should only be called once (from hamburger), not from link
    expect(handleClick).not.toHaveBeenCalled();
  });
});
