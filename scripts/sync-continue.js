#!/usr/bin/env node

/**
 * Sync Script for Agents → Continue IDE Rules
 *
 * This script reads all .github/agents/*.agent.md files and generates
 * corresponding .continue/rules/NN-*.md files for the Continue IDE.
 *
 * INCLUDE DIRECTIVE PROCESSING
 * ============================
 * Agents can use !include(_shared/filename.md) syntax to reference
 * shared skills and reduce duplication. This sync script:
 *
 * 1. Detects !include() directives in agent files
 * 2. Resolves includes relative to .github/agents/ directory
 * 3. Expands includes to full content before writing to .continue/rules/
 * 4. Logs which includes were processed
 *
 * Example:
 *   Agent source: !include(_shared/eslint-sonarchecks.md)
 *   After sync: [Full content of eslint-sonarchecks.md inlined]
 *   Result: Continue rule has complete content ready to use
 *
 * This ensures:
 * - Source agents stay lean (use includes)
 * - Continue rules have full content (includes expanded)
 * - No duplication in generated rules
 * - Continue IDE gets complete rules without further processing
 *
 * Features:
 * - Process includes after YAML frontmatter parsing
 * - Regex pattern: /!include\(_shared\/([^)]+\.md)\)/g
 * - Resolves from .github/agents/_shared/ directory
 * - Handles missing files gracefully with warnings
 * - Processes recursively (includes can reference other includes)
 * - Prevents infinite recursion by tracking processed files
 * - Logs include processing for transparency
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const AGENTS_DIR = path.join(__dirname, "../.github/agents");
const RULES_DIR = path.join(__dirname, "../.continue/rules");
const CONTINUERC_PATH = path.join(__dirname, "../.continuerc.json");

// Mapping of agent files to rule numbers and file names
const AGENT_MAPPING = {
  "quality-standards.agent.md": {
    num: "01",
    name: "code-quality",
    globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  },
  "lint.agent.md": {
    num: "02",
    name: "lint-standards",
    globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  },
  "test.agent.md": {
    num: "03",
    name: "testing",
    globs: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.test.js",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.spec.js",
    ],
  },
  "react.agent.md": {
    num: "04",
    name: "react",
    globs: ["**/*.tsx", "**/components/**/*.ts", "**/*.jsx"],
  },
  "api.agent.md": {
    num: "05",
    name: "api-patterns",
    globs: [
      "**/api/**/*.ts",
      "**/hooks/**/*.ts",
      "**/queries/**/*.ts",
      "**/mutations/**/*.ts",
    ],
  },
  "docs.agent.md": {
    num: "06",
    name: "documentation",
    globs: ["**/*.md", ".github/**/*.md", "docs/**/*.md"],
  },
  "package.agent.md": {
    num: "07",
    name: "package-management",
    globs: ["package.json", "package-lock.json", ".npmrc", ".yarnrc"],
  },
  "research.agent.md": { num: "08", name: "research", globs: ["**/*"] },
};

/**
 * Recursively expand !include() directives in content
 * Processes includes like: !include(_shared/filename.md)
 * @param {string} content - Content with potential include directives
 * @param {string} baseDir - Base directory for resolving relative paths (e.g., .github/agents)
 * @param {Set<string>} processedFiles - Track processed files to prevent infinite recursion
 * @param {Array<string>} processLog - Log of processed includes for output
 * @returns {string} Content with all includes expanded
 */
function expandIncludes(
  content,
  baseDir,
  processedFiles = new Set(),
  processLog = [],
) {
  const includeRegex = /!include\(_shared\/([^)]+\.md)\)/g;
  let expandedContent = content;
  let match;

  while ((match = includeRegex.exec(content)) !== null) {
    const includeFile = match[1];
    const includePath = path.join(baseDir, "_shared", includeFile);
    const includeRelativePath = path.relative(process.cwd(), includePath);

    // Prevent infinite recursion
    if (processedFiles.has(includePath)) {
      console.warn(`⚠️  Circular include detected: ${includeRelativePath}`);
      continue;
    }

    // Check if file exists
    if (!fs.existsSync(includePath)) {
      console.warn(`⚠️  Include file not found: ${includeRelativePath}`);
      expandedContent = expandedContent.replace(
        match[0],
        `<!-- Include not found: ${includeFile} -->`,
      );
      continue;
    }

    try {
      processedFiles.add(includePath);
      let includeContent = fs.readFileSync(includePath, "utf8").trim();

      // Recursively expand any includes within this file
      includeContent = expandIncludes(
        includeContent,
        baseDir,
        processedFiles,
        processLog,
      );

      // Replace the include directive with the expanded content
      expandedContent = expandedContent.replace(match[0], includeContent);
      processLog.push(includeFile);
    } catch (error) {
      console.warn(
        `⚠️  Error reading include file ${includeRelativePath}: ${error.message}`,
      );
      expandedContent = expandedContent.replace(
        match[0],
        `<!-- Error reading: ${includeFile} -->`,
      );
    }
  }

  return expandedContent;
}

/**
 * Extract frontmatter and content from agent markdown file
 */
function parseAgentFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    console.warn(`Warning: No frontmatter found in ${filePath}`);
    return null;
  }

  const [, frontmatterStr, body] = match;
  const frontmatter = {};

  // Parse simple YAML-like frontmatter
  frontmatterStr.split("\n").forEach((line) => {
    if (!line.trim()) return;
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    if (!key || !value) return;

    // Try to parse as JSON first, fall back to string
    try {
      if (value.startsWith("[")) {
        // Try JSON parse for arrays
        frontmatter[key] = JSON.parse(value);
      } else if (value === "true" || value === "false") {
        // Parse booleans
        frontmatter[key] = value === "true";
      } else {
        // Store as string
        frontmatter[key] = value;
      }
    } catch (error) {
      // If JSON parse fails, store as string
      if (error instanceof Error) {
        // Log error if needed for debugging, but don't throw
      }
      frontmatter[key] = value;
    }
  });

  return {
    frontmatter,
    body: body.trim(),
  };
}

/**
 * Create Continue rule file from agent metadata
 */
function createContinueRule(agentName, agentContent, mapping) {
  const { globs } = mapping;
  const { frontmatter, body } = agentContent;

  // Extract title from frontmatter or body
  const title = frontmatter.name || agentName.replace(".agent.md", "");
  const description = frontmatter.description || "Rules extracted from agent";

  // Expand includes in the body content
  const processLog = [];
  const expandedBody = expandIncludes(body, AGENTS_DIR, new Set(), processLog);

  if (processLog.length > 0) {
    console.log(`  📦 Includes expanded: ${processLog.join(", ")}`);
  }

  // Create rule file frontmatter
  const ruleFrontmatter = `---
name: ${title}
globs: ${JSON.stringify(globs)}
alwaysApply: ${globs.includes("**/*") ? "true" : "false"}
description: ${description}
---
`;

  // Combine frontmatter and body (with expanded includes)
  const ruleContent = ruleFrontmatter + "\n" + expandedBody;

  return ruleContent;
}

/**
 * Main sync function
 */
function syncContinueRules() {
  console.log("🔄 Syncing .continue/rules with .github/agents...\n");

  if (!fs.existsSync(AGENTS_DIR)) {
    console.error(`❌ Error: ${AGENTS_DIR} directory not found`);
    process.exit(1);
  }

  if (!fs.existsSync(RULES_DIR)) {
    console.log(`📁 Creating ${RULES_DIR} directory...`);
    fs.mkdirSync(RULES_DIR, { recursive: true });
  }

  const agentFiles = fs
    .readdirSync(AGENTS_DIR)
    .filter((f) => f.endsWith(".agent.md"));
  let syncedCount = 0;
  const rules = [];

  for (const agentFile of agentFiles) {
    if (AGENT_MAPPING[agentFile]) {
      const mapping = AGENT_MAPPING[agentFile];
      const agentPath = path.join(AGENTS_DIR, agentFile);
      const ruleFileName = `${mapping.num}-${mapping.name}.md`;
      const rulePath = path.join(RULES_DIR, ruleFileName);

      try {
        const agentContent = parseAgentFile(agentPath);
        if (!agentContent) {
          console.warn(`⚠️  Skipped: ${agentFile} (parse error)`);
          continue;
        }

        const ruleContent = createContinueRule(
          agentFile,
          agentContent,
          mapping,
        );
        fs.writeFileSync(rulePath, ruleContent, "utf8");
        console.log(`✅ Synced: ${agentFile} → ${ruleFileName}`);

        rules.push({
          name: AGENT_MAPPING[agentFile].name
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          file: `.continue/rules/${ruleFileName}`,
        });

        syncedCount++;
      } catch (error) {
        console.error(`❌ Error syncing ${agentFile}: ${error.message}`);
      }
    } else {
      console.log(
        `ℹ️  Unmapped agent: ${agentFile} (add to AGENT_MAPPING to include)`,
      );
    }
  }

  console.log(`\n✨ Sync complete! ${syncedCount} rule(s) created/updated.\n`);

  // Update .continuerc.json rules array
  if (fs.existsSync(CONTINUERC_PATH)) {
    try {
      const continuercContent = fs.readFileSync(CONTINUERC_PATH, "utf8");
      // Use regex to replace rules array to avoid JSON5 parsing issues
      const updatedContent = continuercContent.replace(
        /"rules":\s*\[[^\]]*\]/s,
        `"rules": ${JSON.stringify(rules, null, 2).replaceAll("\n", "\n  ")}`,
      );
      fs.writeFileSync(CONTINUERC_PATH, updatedContent, "utf8");
      console.log("📝 Updated .continuerc.json rules array");
    } catch (error) {
      console.warn(`⚠️  Could not update .continuerc.json: ${error.message}`);
    }
  }

  return syncedCount > 0;
}

// Run sync
const success = syncContinueRules();
process.exit(success ? 0 : 1);
