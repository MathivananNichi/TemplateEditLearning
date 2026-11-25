import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, SharedValue } from "react-native-reanimated";
import theme from "../../../theme";
import { PRESET_ICONS, PresetIcon } from "../models/sticker_model";

export interface StickerIconsListProps {
  activeDragIcon?: PresetIcon | null;
  dragX?: SharedValue<number>;
  dragY?: SharedValue<number>;
  onDragStart?: (icon: PresetIcon) => void;
  onDragUpdate?: (absX: number, absY: number) => void;
  onDragEnd?: (absX: number, absY: number) => void;
}

export default function StickerIconsList({
  activeDragIcon,
  dragX,
  dragY,
  onDragStart,
  onDragUpdate,
  onDragEnd,
}: StickerIconsListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={PRESET_ICONS}
        horizontal
        scrollEnabled={!activeDragIcon}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <StickerCardItem
            icon={item}
            isDraggingThis={activeDragIcon?.id === item.id}
            dragX={dragX}
            dragY={dragY}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          />
        )}
      />
    </View>
  );
}

interface StickerCardItemProps {
  icon: PresetIcon;
  isDraggingThis: boolean;
  dragX?: SharedValue<number>;
  dragY?: SharedValue<number>;
  onDragStart?: (icon: PresetIcon) => void;
  onDragUpdate?: (absX: number, absY: number) => void;
  onDragEnd?: (absX: number, absY: number) => void;
}

function StickerCardItem({
  icon,
  isDraggingThis,
  dragX,
  dragY,
  onDragStart,
  onDragUpdate,
  onDragEnd,
}: StickerCardItemProps) {
  const panGesture = Gesture.Pan()
    // Activates on 6px vertical drag up toward the canvas
    .activeOffsetY([-6, 6])
    .onStart((e) => {
      if (dragX && dragY) {
        dragX.value = e.absoluteX;
        dragY.value = e.absoluteY;
      }
      if (onDragStart) {
        runOnJS(onDragStart)(icon);
      }
    })
    .onUpdate((e) => {
      if (dragX && dragY) {
        dragX.value = e.absoluteX;
        dragY.value = e.absoluteY;
      }
      if (onDragUpdate) {
        runOnJS(onDragUpdate)(e.absoluteX, e.absoluteY);
      }
    })
    .onEnd((e) => {
      if (onDragEnd) {
        runOnJS(onDragEnd)(e.absoluteX, e.absoluteY);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={[
          styles.card,
          { backgroundColor: icon.bgColor },
          isDraggingThis && styles.cardDragging,
        ]}
      >
        <Ionicons name={icon.name} size={30} color={icon.color} />
        <Text style={[styles.label, { color: icon.color }]}>{icon.label}</Text>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listContent: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignItems: "center",
  },
  separator: {
    width: theme.spacing.md,
  },
  card: {
    width: 72,
    height: 78,
    borderRadius: theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  cardDragging: {
    opacity: 0.3,
  },
  label: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
  },
});

