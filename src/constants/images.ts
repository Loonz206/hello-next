/**
 * Image constants and fallbacks for the application
 * Centralized to maintain DRY principle and easy updates
 */

export const IMAGE_PLACEHOLDERS = {
  BLOG_COVER: "https://place-hold.it/720x405",
} as const;

export const IMAGE_DIMENSIONS = {
  BLOG_COVER: {
    width: 720,
    height: 405,
  },
  LOGO: {
    width: 40,
    height: 40,
  },
  PROFILE_CARD: {
    width: 200,
    height: 200,
  },
} as const;

export const IMAGE_ALT_TEXT = {
  BLOG_COVER: "Blog post cover image",
  LOGO: "Lenny Peters",
  COMPANY_LOGO: "Company logo",
  PLACEHOLDER: "Placeholder image",
} as const;
