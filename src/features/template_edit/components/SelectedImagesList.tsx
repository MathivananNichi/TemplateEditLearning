import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, SharedValue } from "react-native-reanimated";
import theme from "../../../theme";

export interface SelectedImagesListProps {
  images: string[];
  activeDragUri?: string | null;
  dragX?: SharedValue<number>;
  dragY?: SharedValue<number>;
  onRemoveImage?: (index: number) => void;
  onDragStart?: (uri: string) => void;
  onDragUpdate?: (absX: number, absY: number) => void;
  onDragEnd?: (absX: number, absY: number) => void;
}

export default function SelectedImagesList({
  images,
  activeDragUri,
  dragX,
  dragY,
  onRemoveImage,
  onDragStart,
  onDragUpdate,
  onDragEnd,
}: SelectedImagesListProps) {
  if (images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="images-outline"
          size={32}
          color={theme.colors.inputPlaceholder}
        />
        <Text style={styles.emptyText}>No images selected yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        scrollEnabled={!activeDragUri}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => `${item}-${index}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <ImageCardItem
            uri={item}
            index={index}
            isDraggingThis={activeDragUri === item}
            dragX={dragX}
            dragY={dragY}
            onRemove={() => onRemoveImage?.(index)}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          />
        )}
      />
    </View>
  );
}

interface ImageCardItemProps {
  uri: string;
  index: number;
  isDraggingThis: boolean;
  dragX?: SharedValue<number>;
  dragY?: SharedValue<number>;
  onRemove?: () => void;
  onDragStart?: (uri: string) => void;
  onDragUpdate?: (absX: number, absY: number) => void;
  onDragEnd?: (absX: number, absY: number) => void;
}

function ImageCardItem({
  uri,
  index,
  isDraggingThis,
  dragX,
  dragY,
  onRemove,
  onDragStart,
  onDragUpdate,
  onDragEnd,
}: ImageCardItemProps) {
  const panGesture = Gesture.Pan()
    // Activates when moving 6px vertically (upwards towards the canvas),
    // allowing horizontal swipes to scroll the list normally!
    .activeOffsetY([-6, 6])
    .onStart((e) => {
      if (dragX && dragY) {
        dragX.value = e.absoluteX;
        dragY.value = e.absoluteY;
      }
      if (onDragStart) {
        runOnJS(onDragStart)(uri);
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
    })
    .onFinalize(() => {
      // Completed gesture
    });

  return (
    <View style={styles.cardWrapper}>
      <GestureDetector gesture={panGesture}>
        <View style={[styles.card, isDraggingThis && styles.cardDragging]}>
          <Image source={{ uri }} style={styles.thumbnail} />
        </View>
      </GestureDetector>

      {/* Remove badge button outside GestureDetector so it doesn't conflict */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onRemove}
        style={styles.removeBadge}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel={`Remove image ${index + 1}`}
        accessibilityRole="button"
      >
        <Ionicons name="close-circle" color={theme.colors.error} size={22} />
      </TouchableOpacity>
    </View>
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
  cardWrapper: {
    position: "relative",
    paddingTop: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
  },
  card: {
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
  },
  cardDragging: {
    opacity: 0.25,
  },
  thumbnail: {
    width: 120,
    height: 90,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  removeBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
  },
  emptyContainer: {
    width: "100%",
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
  },
  emptyText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.fontWeights.medium,
  },
});
