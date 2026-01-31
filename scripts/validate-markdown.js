#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { globSync } from "glob";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();
const args = process.argv.slice(2);

// Default patterns if none provided
const patterns = args.filter((arg) => !arg.startsWith("--")) || [
  ".github/**/*.md",
  "*.md",
  "docs/**/*.md",
];

let errors = 0;
let warnings = 0;

// Collect all markdown files
const files = new Set();
patterns.forEach((pattern) => {
  globSync(pattern).forEach((file) => files.add(file));
});

if (files.size === 0) {
  console.log("No markdown files found");
  process.exit(0);
}

files.forEach((file) => {
  try {
    const content = fs.readFileSync(file, "utf8");

    // Parse with markdown-it
    const tokens = md.parse(content, {});

    // Basic validation checks
    let hasErrors = false;

    // Check for broken links
    tokens.forEach((token) => {
      if (token.type === "inline" && token.children) {
        token.children.forEach((child) => {
          if (child.type === "link_open") {
            const href = child.attrGet("href");
            if (href && !href.startsWith("http") && !href.startsWith("#")) {
              const resolvedPath = path.resolve(path.dirname(file), href);
              if (!fs.existsSync(resolvedPath)) {
                console.error(`❌ ${file}: Broken link - "${href}"`);
                hasErrors = true;
                errors++;
              }
            }
          }
        });
      }
    });

    // Check for unclosed code blocks
    let inCodeBlock = false;
    const lines = content.split("\n");
    lines.forEach((line) => {
      if (line.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
      }
    });

    if (inCodeBlock) {
      console.error(`❌ ${file}: Unclosed code block`);
      hasErrors = true;
      errors++;
    }

    // Check for proper heading hierarchy
    let lastHeadingLevel = 0;
    lines.forEach((line, idx) => {
      const match = line.match(/^(#{1,6})\s/);
      if (match) {
        const level = match[1].length;
        if (level > lastHeadingLevel + 1) {
          console.warn(
            `⚠️  ${file}:${idx + 1}: Heading hierarchy broken (jumped from h${lastHeadingLevel} to h${level})`,
          );
          warnings++;
        }
        lastHeadingLevel = level;
      }
    });

    if (!hasErrors) {
      console.log(`✓ ${file}`);
    }
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
    errors++;
  }
});

console.log(
  `\n📊 Results: ${files.size} files checked, ${errors} errors, ${warnings} warnings`,
);

if (errors > 0) {
  process.exit(1);
}

process.exit(0);
