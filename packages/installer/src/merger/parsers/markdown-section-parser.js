/**
 * @fileoverview Parser for Markdown files with LMAS-MANAGED sections
 * @module merger/parsers/markdown-section-parser
 */

// Regex patterns for LMAS markers
const LMAS_START_MARKER = /^<!--\s*LMAS-MANAGED-START:\s*([a-zA-Z0-9_-]+)\s*-->$/;
const LMAS_END_MARKER = /^<!--\s*LMAS-MANAGED-END:\s*([a-zA-Z0-9_-]+)\s*-->$/;
const HEADER_PATTERN = /^(#{1,6})\s+(.+)$/;

/**
 * Parsed section from markdown
 * @typedef {Object} ParsedSection
 * @property {string} id - Section identifier (slug or marker id)
 * @property {string} [title] - Section title (from header)
 * @property {number} [level] - Header level (1-6)
 * @property {number} startLine - Start line number (0-indexed)
 * @property {number} [endLine] - End line number (0-indexed)
 * @property {boolean} managed - True if LMAS-MANAGED section
 * @property {string[]} lines - Lines in this section (excluding markers)
 */

/**
 * Result of parsing a markdown file
 * @typedef {Object} ParsedMarkdownFile
 * @property {ParsedSection[]} sections - All sections found
 * @property {boolean} hasLmasMarkers - True if file has LMAS-MANAGED markers
 * @property {string[]} preamble - Lines before first section
 * @property {string[]} rawLines - Original lines
 */

/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Parse a markdown file, identifying sections and LMAS-MANAGED areas
 * @param {string} content - Markdown content
 * @returns {ParsedMarkdownFile} Parsed result
 */
function parseMarkdownSections(content) {
  if (!content || content.trim() === '') {
    return {
      sections: [],
      hasLmasMarkers: false,
      preamble: [],
      rawLines: [],
    };
  }

  const lines = content.split('\n');
  const result = {
    sections: [],
    hasLmasMarkers: false,
    preamble: [],
    rawLines: lines,
  };

  let currentSection = null;
  let lmasSection = null;
  let inPreamble = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for LMAS start marker
    const startMatch = trimmed.match(LMAS_START_MARKER);
    if (startMatch) {
      // Close any current non-managed section
      if (currentSection && !currentSection.managed) {
        currentSection.endLine = i - 1;
        result.sections.push(currentSection);
        currentSection = null;
      }

      // Start new LMAS-managed section
      lmasSection = {
        id: startMatch[1],
        startLine: i,
        managed: true,
        lines: [],
      };
      result.hasLmasMarkers = true;
      inPreamble = false;
      continue;
    }

    // Check for LMAS end marker
    const endMatch = trimmed.match(LMAS_END_MARKER);
    if (endMatch && lmasSection) {
      if (endMatch[1] === lmasSection.id) {
        lmasSection.endLine = i;
        result.sections.push(lmasSection);
        lmasSection = null;
      }
      continue;
    }

    // If we're in an LMAS section, collect lines
    if (lmasSection) {
      lmasSection.lines.push(line);
      continue;
    }

    // Check for regular header
    const headerMatch = line.match(HEADER_PATTERN);
    if (headerMatch) {
      // Close any current section
      if (currentSection) {
        currentSection.endLine = i - 1;
        result.sections.push(currentSection);
      }

      // Start new section
      currentSection = {
        id: slugify(headerMatch[2]),
        title: headerMatch[2],
        level: headerMatch[1].length,
        startLine: i,
        managed: false,
        lines: [line],
      };
      inPreamble = false;
      continue;
    }

    // Regular content line
    if (inPreamble) {
      result.preamble.push(line);
    } else if (currentSection) {
      currentSection.lines.push(line);
    } else if (!lmasSection) {
      // Content after an LMAS section but before next section
      // This shouldn't happen in well-formed files, but handle it
      result.preamble.push(line);
    }
  }

  // Close final section if open
  if (currentSection) {
    currentSection.endLine = lines.length - 1;
    result.sections.push(currentSection);
  }

  // Handle unclosed LMAS section (malformed)
  if (lmasSection) {
    lmasSection.endLine = lines.length - 1;
    lmasSection.lines.push('<!-- WARNING: Unclosed LMAS-MANAGED section -->');
    result.sections.push(lmasSection);
  }

  return result;
}

/**
 * Check if content has LMAS-MANAGED markers
 * @param {string} content - Markdown content
 * @returns {boolean} True if markers found
 */
function hasLmasMarkers(content) {
  if (!content) return false;
  // Check for both START and END markers
  const hasStart = /<!--\s*LMAS-MANAGED-START:\s*[a-zA-Z0-9_-]+\s*-->/.test(content);
  const hasEnd = /<!--\s*LMAS-MANAGED-END:\s*[a-zA-Z0-9_-]+\s*-->/.test(content);
  return hasStart && hasEnd;
}

/**
 * Get all LMAS section IDs from content
 * @param {string} content - Markdown content
 * @returns {string[]} Array of section IDs
 */
function getLmasSectionIds(content) {
  const ids = [];
  const matches = content.matchAll(/<!--\s*LMAS-MANAGED-START:\s*([a-zA-Z0-9_-]+)\s*-->/g);
  for (const match of matches) {
    ids.push(match[1]);
  }
  return ids;
}

module.exports = {
  slugify,
  parseMarkdownSections,
  hasLmasMarkers,
  getLmasSectionIds,
};
