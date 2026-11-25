import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Canvas,
  DashPathEffect,
  Path,
  type SkPath,
} from "@shopify/react-native-skia";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../theme";
import { Size } from "../models/image_utils";
import { CanvasSticker } from "../models/sticker_model";
import TransformableSticker from "./TransformableSticker";

export interface TemplateCanvasProps {
  size: Size | null;
  path?: SkPath | null;
  gridImages: (string | null)[];
  hoveredSlot?: number | null;
  isHoveredForIcon?: boolean;
  stickers?: CanvasSticker[];
  selectedStickerId?: string | null;
  onSelectSticker?: (id: string | null) => void;
  onDeleteSticker?: (id: string) => void;
  targetRef?: React.Ref<React.ElementRef<typeof View>>;
  onLayout?: () => void;
  onClearSlot?: (index: number) => void;
}

export default function TemplateCanvas({
  size,
  path,
  gridImages,
  hoveredSlot = null,
  isHoveredForIcon = false,
  stickers = [],
  selectedStickerId = null,
  onSelectSticker,
  onDeleteSticker,
  targetRef,
  onLayout,
  onClearSlot,
}: TemplateCanvasProps) {
  if (!size) {
    return <View style={styles.placeholder} />;
  }

  const renderSlot = (index: number, label: string) => {
    const isHovered = hoveredSlot === index;
    const imageUri = gridImages[index];

    return (
      <View
        key={index}
        style={[styles.slot, isHovered && styles.slotHovered]}
      >
        {imageUri ? (
          <>
            <Image
              source={{ uri: imageUri }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            {onClearSlot ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onClearSlot(index)}
                style={styles.clearSlotBadge}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={theme.colors.error}
                />
              </TouchableOpacity>
            ) : null}
          </>
        ) : (
          <View
            style={[
              styles.emptySlot,
              isHovered && styles.emptySlotHovered,
            ]}
          >
            <Ionicons
              name={isHovered ? "arrow-down-circle" : "add-circle-outline"}
              size={26}
              color={
                isHovered
                  ? theme.colors.primary
                  : theme.colors.inputPlaceholder
              }
            />
            <Text
              style={[
                styles.slotLabel,
                isHovered && styles.slotLabelHovered,
              ]}
            >
              {isHovered ? "Drop Here" : label}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Pressable
      onPress={() => onSelectSticker?.(null)}
      style={styles.wrapper}
    >
      <View
        ref={targetRef}
        onLayout={onLayout}
        style={[
          styles.container,
          {
            width: size.width,
            height: size.height,
          },
          isHoveredForIcon && styles.containerHoveredForIcon,
        ]}
      >
        {/* 2x2 Grid Layout for Images (Photos drop into slots) */}
        <View style={styles.grid}>
          {/* Row 0: Column 0 (Top-Left), Column 1 (Top-Right) */}
          <View style={styles.row}>
            {renderSlot(0, "Top Left")}
            {renderSlot(1, "Top Right")}
          </View>

          {/* Row 1: Column 0 (Bottom-Left), Column 1 (Bottom-Right) */}
          <View style={styles.row}>
            {renderSlot(2, "Bottom Left")}
            {renderSlot(3, "Bottom Right")}
          </View>
        </View>

        {/* Skia overlay (cut lines / decorative border) */}
        <Canvas style={styles.canvas} pointerEvents="none">
          {path ? (
            <Path
              path={path}
              color="rgba(19, 137, 226, 0.35)"
              style="stroke"
              strokeCap="round"
              strokeWidth={1.5}
            >
              <DashPathEffect intervals={[4, 5]} />
            </Path>
          ) : null}
        </Canvas>

        {/* Free-form Transformable Sticker Icons Overlay (Place anywhere, drag, scale & rotate!) */}
        {stickers.map((sticker) => (
          <TransformableSticker
            key={sticker.id}
            sticker={sticker}
            isSelected={selectedStickerId === sticker.id}
            onSelect={(id) => onSelectSticker?.(id)}
            onDelete={(id) => onDeleteSticker?.(id)}
            canvasWidth={size.width}
            canvasHeight={size.height}
          />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    position: "relative",
    padding: 6,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  containerHoveredForIcon: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.25,
  },
  grid: {
    flex: 1,
    flexDirection: "column",
    gap: 6,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
  },
  slot: {
    flex: 1,
    borderRadius: theme.borderRadius.sm,
    overflow: "hidden",
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: theme.colors.borderLight,
    borderStyle: "dashed",
    position: "relative",
  },
  slotHovered: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: theme.colors.primaryLighter,
  },
  emptySlot: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  emptySlotHovered: {
    backgroundColor: theme.colors.primaryLighter,
  },
  slotLabel: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.fontWeights.medium,
  },
  slotLabelHovered: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeights.bold,
  },
  clearSlotBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
  },
  canvas: {
    ...StyleSheet.absoluteFill,
  },
  placeholder: {
    opacity: 0,
  },
});
