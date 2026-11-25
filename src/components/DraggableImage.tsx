import React from "react";
import { Text, StyleSheet } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  type SharedValue,
} from "react-native-reanimated";

import type { DragImage } from "../features/template_edit/images";

interface Props {
  item: DragImage;

  target: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  dragX: SharedValue<number>;
  dragY: SharedValue<number>;

  onDragStart: (item: DragImage) => void;
  onDragEnd: () => void;

  onDrop: (item: DragImage, absoluteX: number, absoluteY: number) => void;
}

const IMAGE_SIZE = 85;

export default function DraggableImage({
  item,
  target,
  dragX,
  dragY,
  onDragStart,
  onDragEnd,
  onDrop,
}: Props) {
  const isDragging = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      isDragging.value = true;

      // Set position immediately so the preview doesn't flash at (0, 0)
      dragX.value = event.absoluteX;
      dragY.value = event.absoluteY;

      runOnJS(onDragStart)(item);
    })
    .onUpdate((event) => {
      dragX.value = event.absoluteX - IMAGE_SIZE / 2;
      dragY.value = event.absoluteY - IMAGE_SIZE / 2;
    })
    .onEnd((event) => {
      const fingerX = event.absoluteX;
      const fingerY = event.absoluteY;

      const isInside =
        fingerX >= target.x &&
        fingerX <= target.x + target.width &&
        fingerY >= target.y &&
        fingerY <= target.y + target.height;

      if (isInside) {
        runOnJS(onDrop)(item, fingerX, fingerY);
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
      runOnJS(onDragEnd)();
    });

  const originalStyle = useAnimatedStyle(() => ({
    opacity: isDragging.value ? 0.5 : 1,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.container}>
        <Animated.Image
          source={{ uri: item.uri }}
          style={[styles.image, originalStyle]}
        />

        <Text style={styles.name}>{item.name}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: IMAGE_SIZE,
    alignItems: "center",
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
  },

  name: {
    marginTop: 5,
    fontSize: 12,
  },
});
