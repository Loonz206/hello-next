/**
 * Runtime validation for Contentful data structures
 * Ensures type safety and validates required fields at runtime
 */

export interface PostFields {
  title: string;
  date: string;
  slug: string;
  imageCover?: string;
  metaContent: {
    fields: {
      title: string;
      metaDescription: string;
    };
  };
}

export interface CardFields {
  name: string;
  description?: string;
}

/**
 * Validates that required post fields are present and correct type
 */
export function validatePostFields(data: unknown): data is PostFields {
  if (!data || typeof data !== "object") return false;

  const obj = data as Record<string, unknown>;

  // Check required string fields
  if (!isNonEmptyString(obj.title)) return false;
  if (!isNonEmptyString(obj.date)) return false;
  if (!isNonEmptyString(obj.slug)) return false;

  // Check image cover (optional)
  if (obj.imageCover !== undefined && typeof obj.imageCover !== "string") {
    return false;
  }

  // Check metaContent structure
  return validateMetaContent(obj.metaContent);
}

/**
 * Helper to validate non-empty strings
 */
function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Helper to validate metaContent structure
 */
function validateMetaContent(metaContent: unknown): boolean {
  if (!metaContent || typeof metaContent !== "object") return false;

  const meta = metaContent as Record<string, unknown>;
  if (!meta.fields || typeof meta.fields !== "object") return false;

  const fields = meta.fields as Record<string, unknown>;
  return (
    isNonEmptyString(fields.title) && isNonEmptyString(fields.metaDescription)
  );
}

/**
 * Validates that required card fields are present
 */
export function validateCardFields(data: unknown): data is CardFields {
  if (!data || typeof data !== "object") return false;

  const obj = data as Record<string, unknown>;

  if (!isNonEmptyString(obj.name)) return false;
  return obj.description === undefined || typeof obj.description === "string";
}

/**
 * Safe get post method with validation
 */
export function getValidatedPostFields(data: unknown): PostFields | undefined {
  try {
    if (validatePostFields(data)) {
      return data;
    }
  } catch (error) {
    console.error("Error validating post fields:", error);
  }
  return undefined;
}

/**
 * Safe get card method with validation
 */
export function getValidatedCardFields(data: unknown): CardFields | undefined {
  try {
    if (validateCardFields(data)) {
      return data;
    }
  } catch (error) {
    console.error("Error validating card fields:", error);
  }
  return undefined;
}
