// Set environment variables before any imports
process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID = "test-space-id";
process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN = "test-access-token";

// eslint-disable-next-line import/first
import * as contentful from "contentful";
// eslint-disable-next-line import/first
import {
  getAllPosts,
  getAllCards,
  getPostBySlug,
  getMorePosts,
  getAllPostsWithSlug,
} from "./contentfulPosts";

// Mock the contentful module
jest.mock("contentful");

describe("contentfulPosts utilities", () => {
  const mockClient = {
    getEntries: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (contentful.createClient as jest.Mock).mockReturnValue(mockClient);
  });

  describe("getAllPosts", () => {
    it("should return posts ordered by date", async () => {
      const mockPosts = [
        {
          fields: { title: "Post 1", date: "2024-01-01", slug: "post-1" },
        },
        {
          fields: { title: "Post 2", date: "2024-01-02", slug: "post-2" },
        },
      ];

      mockClient.getEntries.mockResolvedValue({ items: mockPosts });

      const result = await getAllPosts();

      expect(result).toEqual(mockPosts);
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: "post",
        order: ["-fields.date"],
      });
    });

    it("should return empty array if no posts found", async () => {
      mockClient.getEntries.mockResolvedValue({ items: null });

      const result = await getAllPosts();

      expect(result).toEqual([]);
    });

    it("should throw error if fetch fails", async () => {
      const error = new Error("API Error");
      mockClient.getEntries.mockRejectedValue(error);

      await expect(getAllPosts()).rejects.toThrow("API Error");
    });
  });

  describe("getAllCards", () => {
    it("should fetch cards content type", async () => {
      const mockCards = [
        { fields: { name: "Card 1", description: "Desc 1" } },
        { fields: { name: "Card 2", description: "Desc 2" } },
      ];

      mockClient.getEntries.mockResolvedValue({ items: mockCards });

      const result = await getAllCards();

      expect(result).toEqual(mockCards);
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: "card",
      });
    });

    it("should return empty array if no cards found", async () => {
      mockClient.getEntries.mockResolvedValue({ items: null });

      const result = await getAllCards();

      expect(result).toEqual([]);
    });
  });

  describe("getPostBySlug", () => {
    it("should return single post by slug", async () => {
      const mockPost = {
        fields: { title: "Post", date: "2024-01-01", slug: "post-1" },
      };

      mockClient.getEntries.mockResolvedValue({ items: [mockPost] });

      const result = await getPostBySlug("post-1");

      expect(result).toEqual(mockPost);
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: "post",
        limit: 1,
        "fields.slug[in]": "post-1",
      });
    });

    it("should return undefined if post not found", async () => {
      mockClient.getEntries.mockResolvedValue({ items: [] });

      const result = await getPostBySlug("non-existent");

      expect(result).toBeUndefined();
    });

    it("should throw error if fetch fails", async () => {
      const error = new Error("Fetch failed");
      mockClient.getEntries.mockRejectedValue(error);

      await expect(getPostBySlug("post-1")).rejects.toThrow("Fetch failed");
    });
  });

  describe("getMorePosts", () => {
    it("should return posts excluding specified slug", async () => {
      const mockPosts = [
        { fields: { title: "Post 2", date: "2024-01-02", slug: "post-2" } },
        { fields: { title: "Post 3", date: "2024-01-03", slug: "post-3" } },
      ];

      mockClient.getEntries.mockResolvedValue({ items: mockPosts });

      const result = await getMorePosts("post-1");

      expect(result).toEqual(mockPosts);
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: "post",
        limit: 3,
        order: ["-fields.date"],
        "fields.slug[nin]": "post-1",
      });
    });

    it("should return empty array if no other posts found", async () => {
      mockClient.getEntries.mockResolvedValue({ items: null });

      const result = await getMorePosts("only-post");

      expect(result).toEqual([]);
    });
  });

  describe("getAllPostsWithSlug", () => {
    it("should return array of slug objects", async () => {
      const mockEntries = {
        items: [{ fields: { slug: "post-1" } }, { fields: { slug: "post-2" } }],
      };

      mockClient.getEntries.mockResolvedValue(mockEntries);

      const result = await getAllPostsWithSlug();

      expect(result).toEqual([{ slug: "post-1" }, { slug: "post-2" }]);
      expect(mockClient.getEntries).toHaveBeenCalledWith({
        content_type: "post",
        select: ["fields.slug"],
      });
    });

    it("should return empty array if no posts found", async () => {
      mockClient.getEntries.mockResolvedValue({ items: null });

      const result = await getAllPostsWithSlug();

      expect(result).toEqual([]);
    });

    it("should throw error if fetch fails", async () => {
      const error = new Error("Query error");
      mockClient.getEntries.mockRejectedValue(error);

      await expect(getAllPostsWithSlug()).rejects.toThrow("Query error");
    });
  });
});
