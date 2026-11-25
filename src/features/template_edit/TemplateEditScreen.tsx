import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Skia } from "@shopify/react-native-skia";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import theme from "../../theme";
import SelectImageButton from "./components/SelectImageButton";
import SelectedImagesList from "./components/SelectedImagesList";
import StickerIconsList from "./components/StickerIconsList";
import TemplateCanvas from "./components/TemplateCanvas";
import { useImagePicker } from "./hooks/useImagePicker";
import { templateJsonModel } from "./models/dummyjson";
import { Size } from "./models/image_utils";
import {
  CanvasSticker,
  DEFAULT_STICKER_SIZE,
  PresetIcon,
} from "./models/sticker_model";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PREVIEW_WIDTH = 120;
const PREVIEW_HEIGHT = 90;

interface DragPayload {
  type: "image" | "icon";
  uri?: string;
  icon?: PresetIcon;
}

const loginSchema = z.object({
  email: z.email("Invalid email"),
});

type LoginFrom = z.infer<typeof loginSchema>;

export default function TemplateEditScreen() {
  const insets = useSafeAreaInsets();
  const screenRef = useRef<React.ElementRef<typeof View>>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [scale, setScale] = useState<number>(1);

  // Bottom tray tab switcher ("images" or "icons")
  const [bottomTab, setBottomTab] = useState<"images" | "icons">("images");

  // Drag coordinates and screen offsets
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const screenX = useSharedValue(0);
  const screenY = useSharedValue(0);

  // Active drag payload (image or icon)
  const [activeDragItem, setActiveDragItem] = useState<DragPayload | null>(
    null,
  );

  // 4 Target Grid Slots (2x2) for photos
  const [gridImages, setGridImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [isHoveredForIcon, setIsHoveredForIcon] = useState<boolean>(false);

  // Canvas sticker overlays (free-form position, scale, and rotate!)
  const [canvasStickers, setCanvasStickers] = useState<CanvasSticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null,
  );

  // Target canvas reference & bounds for drop detection
  const targetRef = useRef<React.ElementRef<typeof View>>(null);
  const targetBoundsRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // Custom hook for managing image picker & selected images state
  const { selectedImages, pickImages, removeImage } = useImagePicker();

  const measureScreen = useCallback(() => {
    screenRef.current?.measureInWindow((x: number, y: number) => {
      screenX.value = x;
      screenY.value = y;
    });
  }, [screenX, screenY]);

  const measureTarget = useCallback(() => {
    targetRef.current?.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        if (width > 0 && height > 0) {
          targetBoundsRef.current = { x, y, width, height };
        }
      },
    );
  }, []);

  // Memoized Skia drawing path (photo frame cut line)
  const path = useMemo(() => {
    const builder = Skia.PathBuilder.Make();
    const x =
      templateJsonModel.selectedTemplate.photo_frame[0].photoframe_x * scale;
    const y =
      templateJsonModel.selectedTemplate.photo_frame[0].photoframe_y * scale;
    const width =
      templateJsonModel.selectedTemplate.photo_frame[0].photoframe_width *
      scale;
    const height =
      templateJsonModel.selectedTemplate.photo_frame[0].photoframe_height *
      scale;

    builder?.moveTo(x, y);
    builder?.lineTo(width, y);
    builder?.lineTo(width, height);
    builder?.lineTo(x, height);
    builder?.lineTo(x, y);
    return builder?.build() ?? null;
  }, [scale]);

  // Calculate scaled dimensions to fit template into available workspace area
  const handleWorkspaceLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width <= 0 || height <= 0) return;

    const originalWidth = templateJsonModel.selectedTemplate.print_area_width;
    const originalHeight = templateJsonModel.selectedTemplate.print_area_height;

    // Margin padding around the canvas
    const padding = 20;
    const availWidth = Math.max(0, width - padding * 2);
    const availHeight = Math.max(0, height - padding * 2);

    const newScale = Math.min(
      availWidth / originalWidth,
      availHeight / originalHeight,
    );
    const scaledWidth = Math.round(originalWidth * newScale);
    const scaledHeight = Math.round(originalHeight * newScale);

    setScale(newScale);
    setSize((prev) => {
      if (prev?.width === scaledWidth && prev?.height === scaledHeight) {
        return prev;
      }
      return { width: scaledWidth, height: scaledHeight };
    });
  }, []);

  // Drag start for images
  const handleImageDragStart = useCallback(
    (uri: string) => {
      measureScreen();
      measureTarget();
      setActiveDragItem({ type: "image", uri });
    },
    [measureScreen, measureTarget],
  );

  // Drag start for icons
  const handleIconDragStart = useCallback(
    (icon: PresetIcon) => {
      measureScreen();
      measureTarget();
      setActiveDragItem({ type: "icon", icon });
    },
    [measureScreen, measureTarget],
  );

  // Live drag update
  const handleDragUpdate = useCallback(
    (absX: number, absY: number) => {
      const target = targetBoundsRef.current;
      if (!target || target.width <= 0 || target.height <= 0) return;

      const screenW = Dimensions.get("window").width;
      const targetX =
        target.x === 0 && target.width < screenW
          ? (screenW - target.width) / 2
          : target.x;
      const targetY = target.y;

      const relX = absX - targetX;
      const relY = absY - targetY;

      const isInside =
        relX >= -12 &&
        relX <= target.width + 12 &&
        relY >= -12 &&
        relY <= target.height + 12;

      if (isInside) {
        if (activeDragItem?.type === "image") {
          // Photos target specific grid slot (0, 1, 2, or 3)
          const col = relX < target.width / 2 ? 0 : 1;
          const row = relY < target.height / 2 ? 0 : 1;
          setHoveredSlot(row * 2 + col);
          setIsHoveredForIcon(false);
        } else if (activeDragItem?.type === "icon") {
          // Icons can be placed anywhere on canvas
          setIsHoveredForIcon(true);
          setHoveredSlot(null);
        }
      } else {
        setHoveredSlot(null);
        setIsHoveredForIcon(false);
      }
    },
    [activeDragItem],
  );

  // Drag end / drop handler
  const handleDragEnd = useCallback(
    (absX: number, absY: number) => {
      const target = targetBoundsRef.current;
      if (target && activeDragItem && target.width > 0 && target.height > 0) {
        const screenW = Dimensions.get("window").width;
        const targetX =
          target.x === 0 && target.width < screenW
            ? (screenW - target.width) / 2
            : target.x;
        const targetY = target.y;

        const relX = absX - targetX;
        const relY = absY - targetY;

        const isInside =
          relX >= -15 &&
          relX <= target.width + 15 &&
          relY >= -15 &&
          relY <= target.height + 15;

        if (isInside) {
          if (activeDragItem.type === "image" && activeDragItem.uri) {
            // Drop image into designated grid slot
            const col = relX < target.width / 2 ? 0 : 1;
            const row = relY < target.height / 2 ? 0 : 1;
            const targetSlot = row * 2 + col;

            setGridImages((prev) => {
              const next = [...prev];
              next[targetSlot] = activeDragItem.uri!;
              return next;
            });
          } else if (activeDragItem.type === "icon" && activeDragItem.icon) {
            // Drop icon anywhere on the canvas centered under finger!
            const halfSize = DEFAULT_STICKER_SIZE / 2;
            const dropX = Math.max(
              10,
              Math.min(
                relX - halfSize,
                (size?.width ?? 300) - DEFAULT_STICKER_SIZE - 10,
              ),
            );
            const dropY = Math.max(
              10,
              Math.min(
                relY - halfSize,
                (size?.height ?? 300) - DEFAULT_STICKER_SIZE - 10,
              ),
            );

            const newSticker: CanvasSticker = {
              id: `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              iconName: activeDragItem.icon.name,
              color: activeDragItem.icon.color,
              x: dropX,
              y: dropY,
              scale: 1,
              rotation: 0,
              size: DEFAULT_STICKER_SIZE,
            };

            setCanvasStickers((prev) => [...prev, newSticker]);
            setSelectedStickerId(newSticker.id);
          }
        }
      }
      setHoveredSlot(null);
      setIsHoveredForIcon(false);
      setActiveDragItem(null);
    },
    [activeDragItem, size],
  );

  const handleClearSlot = useCallback((slotIndex: number) => {
    setGridImages((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  }, []);

  const handleDeleteSticker = useCallback((id: string) => {
    setCanvasStickers((prev) => prev.filter((s) => s.id !== id));
    setSelectedStickerId(null);
  }, []);

  // Floating preview style follows finger anywhere across the entire screen
  const dragPreviewStyle = useAnimatedStyle(() => ({
    opacity: activeDragItem ? 1 : 0,
    transform: [
      {
        translateX: dragX.value,
      },
      {
        translateY: dragY.value,
      },
    ],
  }));

  return (
    <View
      ref={screenRef}
      onLayout={measureScreen}
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Template Workspace / Canvas Area */}
      <View style={styles.templateWorkspace} onLayout={handleWorkspaceLayout}>
        <TemplateCanvas
          targetRef={targetRef}
          onLayout={measureTarget}
          size={size}
          path={path}
          gridImages={gridImages}
          hoveredSlot={hoveredSlot}
          isHoveredForIcon={isHoveredForIcon}
          stickers={canvasStickers}
          selectedStickerId={selectedStickerId}
          onSelectSticker={setSelectedStickerId}
          onDeleteSticker={handleDeleteSticker}
          onClearSlot={handleClearSlot}
        />
      </View>

      {/* Bottom Tray: Tabs, Images / Icons List & Select Button */}
      <View style={styles.bottomTray}>
        {/* Segmented Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setBottomTab("images")}
            style={[
              styles.tabButton,
              bottomTab === "images" && styles.tabButtonActive,
            ]}
          >
            <Ionicons
              name="images"
              size={16}
              color={
                bottomTab === "images"
                  ? theme.colors.primary
                  : theme.colors.textMuted
              }
            />
            <Text
              style={[
                styles.tabText,
                bottomTab === "images" && styles.tabTextActive,
              ]}
            >
              Photos (Grid)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setBottomTab("icons")}
            style={[
              styles.tabButton,
              bottomTab === "icons" && styles.tabButtonActive,
            ]}
          >
            <Ionicons
              name="shapes"
              size={16}
              color={
                bottomTab === "icons"
                  ? theme.colors.primary
                  : theme.colors.textMuted
              }
            />
            <Text
              style={[
                styles.tabText,
                bottomTab === "icons" && styles.tabTextActive,
              ]}
            >
              Stickers & Icons
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Photos List & Select Button */}
        {bottomTab === "images" ? (
          <>
            <SelectedImagesList
              images={selectedImages}
              activeDragUri={
                activeDragItem?.type === "image" ? activeDragItem.uri : null
              }
              dragX={dragX}
              dragY={dragY}
              onRemoveImage={removeImage}
              onDragStart={handleImageDragStart}
              onDragUpdate={handleDragUpdate}
              onDragEnd={handleDragEnd}
            />

            <SelectImageButton
              title="Select Image"
              onPress={pickImages}
              prefix={
                <Ionicons
                  name="image"
                  size={18}
                  color={theme.colors.textOnPrimary}
                />
              }
            />
          </>
        ) : (
          /* Tab 2: Icons & Stickers List */
          <View style={styles.iconsSection}>
            <StickerIconsList
              activeDragIcon={
                activeDragItem?.type === "icon" ? activeDragItem.icon : null
              }
              dragX={dragX}
              dragY={dragY}
              onDragStart={handleIconDragStart}
              onDragUpdate={handleDragUpdate}
              onDragEnd={handleDragEnd}
            />
            <Text style={styles.tipText}>
              💡 Drag an icon anywhere onto the canvas. Pinch to resize & twist
              to rotate!
            </Text>
          </View>
        )}
      </View>

      {/* Floating Drag Overlay: Positioned at root to drag all over the screen */}
      {activeDragItem ? (
        <Animated.View
          pointerEvents="none"
          style={[
            activeDragItem.type === "icon"
              ? styles.floatingIconPreview
              : styles.floatingImagePreview,
            dragPreviewStyle,
          ]}
        >
          {activeDragItem.type === "image" && activeDragItem.uri ? (
            <Image
              source={{ uri: activeDragItem.uri }}
              style={styles.previewImage}
            />
          ) : activeDragItem.type === "icon" && activeDragItem.icon ? (
            <View
              style={[
                styles.previewIconBox,
                { backgroundColor: activeDragItem.icon.bgColor },
              ]}
            >
              <Ionicons
                name={activeDragItem.icon.name}
                size={38}
                color={activeDragItem.icon.color}
              />
            </View>
          ) : null}
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  templateWorkspace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTray: {
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    alignItems: "center",
    gap: theme.spacing.sm,
    ...theme.shadows.card,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.borderRadius.full,
    padding: 3,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.full,
  },
  tabButtonActive: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.chip,
  },
  tabText: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.fontWeights.medium,
  },
  tabTextActive: {
    color: theme.colors.primary,
   
  },
  iconsSection: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  },
  tipText: {
    fontSize: theme.typography.fontSizes.xs - 1,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  floatingImagePreview: {
    position: "absolute",
    top: 0,
    left: 0,
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    zIndex: 9999,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    ...theme.shadows.button,
    elevation: 9999,
  },
  floatingIconPreview: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 72,
    height: 72,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.button,
    elevation: 9999,
  },
  previewIconBox: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});
