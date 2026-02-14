import {
  validatePostFields,
  validateCardFields,
  getValidatedPostFields,
  getValidatedCardFields,
  type PostFields,
  type CardFields,
} from "./contentfulValidation";

describe("Contentful Validation Utilities", () => {
  describe("validatePostFields", () => {
    const validPost: PostFields = {
      title: "Test Post",
      date: "2024-01-01T00:00:00Z",
      slug: "test-post",
      imageCover: "https://example.com/image.jpg",
      metaContent: {
        fields: {
          title: "Test Meta Title",
          metaDescription: "Test description",
        },
      },
    };

    it("should validate correct post fields", () => {
      expect(validatePostFields(validPost)).toBe(true);
    });

    it("should reject post with missing required title", () => {
      const invalid = { ...validPost, title: "" };
      expect(validatePostFields(invalid)).toBe(false);
    });

    it("should reject post with missing required date", () => {
      const invalid = { ...validPost, date: "" };
      expect(validatePostFields(invalid)).toBe(false);
    });

    it("should reject post with missing required slug", () => {
      const invalid = { ...validPost, slug: "" };
      expect(validatePostFields(invalid)).toBe(false);
    });

    it("should reject post with invalid metaContent structure", () => {
      const invalid = {
        ...validPost,
        metaContent: null,
      };
      expect(validatePostFields(invalid)).toBe(false);
    });

    it("should reject post with missing metaContent.fields.title", () => {
      const invalid = {
        ...validPost,
        metaContent: {
          fields: {
            title: "",
            metaDescription: "Test",
          },
        },
      };
      expect(validatePostFields(invalid)).toBe(false);
    });

    it("should reject post with invalid metaContent.fields.metaDescription", () => {
      const invalid = {
        ...validPost,
        metaContent: {
          fields: {
            title: "Title",
            metaDescription: "",
          },
        },
      };
      expect(validatePostFields(invalid)).toBe(false);
    });

    it("should allow post with undefined imageCover", () => {
      const noImage: PostFields = {
        ...validPost,
        imageCover: undefined,
      };
      expect(validatePostFields(noImage)).toBe(true);
    });

    it("should reject post with non-string imageCover", () => {
      const invalid = {
        ...validPost,
        imageCover: 123,
      };
      expect(validatePostFields(invalid)).toBe(false);
    });

    it("should reject null input", () => {
      expect(validatePostFields(null)).toBe(false);
    });

    it("should reject non-object input", () => {
      expect(validatePostFields("not an object")).toBe(false);
    });
  });

  describe("validateCardFields", () => {
    const validCard: CardFields = {
      name: "Test Card",
      description: "Test description",
    };

    it("should validate correct card fields", () => {
      expect(validateCardFields(validCard)).toBe(true);
    });

    it("should validate card with missing description", () => {
      const card: CardFields = { name: "Test Card" };
      expect(validateCardFields(card)).toBe(true);
    });

    it("should reject card with empty name", () => {
      const invalid = { ...validCard, name: "" };
      expect(validateCardFields(invalid)).toBe(false);
    });

    it("should reject card with invalid description type", () => {
      const invalid = { ...validCard, description: 123 };
      expect(validateCardFields(invalid)).toBe(false);
    });

    it("should reject null input", () => {
      expect(validateCardFields(null)).toBe(false);
    });
  });

  describe("getValidatedPostFields", () => {
    const validPost: PostFields = {
      title: "Test",
      date: "2024-01-01T00:00:00Z",
      slug: "test",
      metaContent: {
        fields: {
          title: "Title",
          metaDescription: "Desc",
        },
      },
    };

    it("should return post fields if valid", () => {
      const result = getValidatedPostFields(validPost);
      expect(result).toEqual(validPost);
    });

    it("should return undefined if invalid", () => {
      const invalid = { ...validPost, title: "" };
      const result = getValidatedPostFields(invalid);
      expect(result).toBeUndefined();
    });

    it("should handle errors gracefully", () => {
      const errorSpy = jest.spyOn(console, "error").mockImplementation();
      const result = getValidatedPostFields(null);
      expect(result).toBeUndefined();
      errorSpy.mockRestore();
    });
  });

  describe("getValidatedCardFields", () => {
    const validCard: CardFields = {
      name: "Test Card",
    };

    it("should return card fields if valid", () => {
      const result = getValidatedCardFields(validCard);
      expect(result).toEqual(validCard);
    });

    it("should return undefined if invalid", () => {
      const invalid = { ...validCard, name: "" };
      const result = getValidatedCardFields(invalid);
      expect(result).toBeUndefined();
    });

    it("should handle errors gracefully", () => {
      const errorSpy = jest.spyOn(console, "error").mockImplementation();
      const result = getValidatedCardFields(null);
      expect(result).toBeUndefined();
      errorSpy.mockRestore();
    });
  });
});
