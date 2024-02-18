import "cypress-axe";

// Define at the top of the spec file or just import it
function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`,
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }),
  );

  cy.task("table", violationData);
}

describe("opening hello-next locally", () => {
  const date = new Date().getFullYear();
  beforeEach(() => {
    // Load our app before starting each test case
    cy.visit("/");
    cy.injectAxe();
  });

  it("Has no detectable a11y violations on load (filtering to only include critical impact violations)", () => {
    // Test on initial load, only report and assert for critical impact items
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    });
  });

  it("loads the application", () => {
    cy.get("#__next").should("exist");
  });

  describe("the homepage", () => {
    it("should have navigation", () => {
      cy.get("#wrap").should("exist");
      cy.get("#menu").should("exist");
      cy.findByRole("link", { name: /about/i });
      cy.findByRole("link", { name: /contact/i });
    });

    it("should have a headline", () => {
      cy.findByRole("heading", { name: /i think it's working!!/i });
    });

    it("should have a footer", () => {
      cy.findByText(`Next Blog | Copyright 2020-${date}`);
      cy.checkA11y(null, null, terminalLog);
    });
  });

  describe("the about page", () => {
    it("should take me to the about view", () => {
      cy.findByRole("link", { name: /about/i }).click();
      cy.findByRole("heading", { name: /about/i });
      cy.findByText(
        "A software engineer with solid experiences in creating attractive, user-driven, responsive websites and applications. My adaptive personality makes it fun for me to jump into various types of teams and support the build from writing code to designing layouts and other graphical elements.",
      );
      cy.checkA11y(null, null, terminalLog);
    });
  });

  describe("the 404 page", () => {
    it("should take me to the 404 page", () => {
      cy.findByRole("link", { name: /contact/i }).click();
      cy.findByRole("heading", { name: /404/i });
    });

    it("should have a footer", () => {
      cy.findByText(`Next Blog | Copyright 2020-${date}`);
      cy.checkA11y(null, null, terminalLog);
    });
  });
});
