import { Ionicons } from "@expo/vector-icons";

export const DEFAULT_STICKER_SIZE = 50;

export interface CanvasSticker {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
  x: number;
  y: number;
  scale: number;
  rotation: number; // in radians
  size: number;
}

export interface PresetIcon {
  id: string;
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  bgColor: string;
}

export const PRESET_ICONS: PresetIcon[] = [
  {
    id: "star",
    name: "star",
    label: "Star",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
  {
    id: "heart",
    name: "heart",
    label: "Heart",
    color: "#EF4444",
    bgColor: "#FEE2E2",
  },
  {
    id: "flame",
    name: "flame",
    label: "Fire",
    color: "#F97316",
    bgColor: "#FFEDD5",
  },
  {
    id: "sparkles",
    name: "sparkles",
    label: "Sparkle",
    color: "#EAB308",
    bgColor: "#FEF9C3",
  },
  {
    id: "trophy",
    name: "trophy",
    label: "Trophy",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
  {
    id: "happy",
    name: "happy",
    label: "Smile",
    color: "#0EA5E9",
    bgColor: "#E0F2FE",
  },
  {
    id: "ribbon",
    name: "ribbon",
    label: "Ribbon",
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
  },
  {
    id: "musical-notes",
    name: "musical-notes",
    label: "Music",
    color: "#EC4899",
    bgColor: "#FCE7F3",
  },
  {
    id: "camera",
    name: "camera",
    label: "Camera",
    color: "#6366F1",
    bgColor: "#E0E7FF",
  },
  {
    id: "gift",
    name: "gift",
    label: "Gift",
    color: "#10B981",
    bgColor: "#D1FAE5",
  },
  {
    id: "sunny",
    name: "sunny",
    label: "Sun",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
  {
    id: "planet",
    name: "planet",
    label: "Planet",
    color: "#3B82F6",
    bgColor: "#DBEAFE",
  },
];

