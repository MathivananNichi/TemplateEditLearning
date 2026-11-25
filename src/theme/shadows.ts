/**
 * Obsidian Violet Elevation & Depth Shadows
 * Supports Level 0 - Level 3 per Material 3 guidelines
 */

export const shadows = {
  // Level 0: Flat / Canvas (no shadow)
  level0: {
    boxShadow: "none",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Level 1: Card & List Tile Default
  level1: {
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  // Level 2: Active / Elevated Floating Components (Search bars, floating pills, sticky footers)
  level2: {
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },

  // Level 3: Modals & Bottom Sheets
  level3: {
    boxShadow: "0px -4px 32px rgba(0, 0, 0, 0.12)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },

  // Component-specific & Backward Compatibility Presets
  soft: {
    boxShadow: "0px 8px 24px rgba(108, 77, 255, 0.08)",
    shadowColor: "#6C4DFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },

  card: {
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  button: {
    boxShadow: "0px 8px 22px rgba(108, 77, 255, 0.32)",
    shadowColor: "#6C4DFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 4,
  },

  chip: {
    boxShadow: "0px 2px 8px rgba(23, 23, 28, 0.04)",
    shadowColor: "#17171C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
};

export const darkShadows = {
  level0: shadows.level0,
  level1: {
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.35)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 2,
  },
  level2: {
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 4,
  },
  level3: {
    boxShadow: "0px -4px 32px rgba(0, 0, 0, 0.65)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.65,
    shadowRadius: 32,
    elevation: 8,
  },
  soft: shadows.soft,
  card: {
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.35)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 2,
  },
  button: {
    boxShadow: "0px 8px 22px rgba(108, 77, 255, 0.45)",
    shadowColor: "#6C4DFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 4,
  },
  chip: shadows.chip,
};

export type Shadows = typeof shadows;
