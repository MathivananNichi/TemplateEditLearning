import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import theme from "../../../theme";
import { CanvasSticker, DEFAULT_STICKER_SIZE } from "../models/sticker_model";

export interface TransformableStickerProps {
  sticker: CanvasSticker;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  canvasWidth: number;
  canvasHeight: number;
}

export default function TransformableSticker({
  sticker,
  isSelected,
  onSelect,
  onDelete,
  canvasWidth,
  canvasHeight,
}: TransformableStickerProps) {
  // Shared animated values
  const translationX = useSharedValue(sticker.x);
  const translationY = useSharedValue(sticker.y);
  const scale = useSharedValue(sticker.scale);
  const rotation = useSharedValue(sticker.rotation);

  // Saved values for continuous multi-touch gestures
  const savedX = useSharedValue(sticker.x);
  const savedY = useSharedValue(sticker.y);
  const savedScale = useSharedValue(sticker.scale);
  const savedRotation = useSharedValue(sticker.rotation);

  // Pan gesture: Move sticker anywhere on canvas
  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedX.value = translationX.value;
      savedY.value = translationY.value;
      runOnJS(onSelect)(sticker.id);
    })
    .onUpdate((event) => {
      translationX.value = savedX.value + event.translationX;
      translationY.value = savedY.value + event.translationY;
    });

  // Pinch gesture: Resize sticker with 2 fingers
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
      runOnJS(onSelect)(sticker.id);
    })
    .onUpdate((event) => {
      // Scale between 0.4x and 3.5x
      scale.value = Math.max(0.4, Math.min(savedScale.value * event.scale, 3.5));
    });

  // Rotation gesture: Rotate sticker with 2 fingers
  const rotationGesture = Gesture.Rotation()
    .onStart(() => {
      savedRotation.value = rotation.value;
      runOnJS(onSelect)(sticker.id);
    })
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    });

  // Tap gesture to select sticker
  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(onSelect)(sticker.id);
  });

  // Single-finger Rotate & Resize corner handle gesture
  const handlePanGesture = Gesture.Pan()
    .onStart(() => {
      savedScale.value = scale.value;
      savedRotation.value = rotation.value;
    })
    .onUpdate((event) => {
      // Calculate delta distance for scaling
      const delta = (event.translationX + event.translationY) / 100;
      scale.value = Math.max(0.4, Math.min(savedScale.value + delta, 3.5));

      // Calculate angle for rotation
      const angleDelta = Math.atan2(event.translationY, event.translationX);
      rotation.value = savedRotation.value + angleDelta * 0.5;
    });

  // Combine pan, pinch, and rotation to work simultaneously
  const combinedGesture = Gesture.Race(
    tapGesture,
    Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0,
    top: 0,
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { rotateZ: `${rotation.value}rad` },
      { scale: scale.value },
    ],
  }));

  const boxSize = sticker.size || DEFAULT_STICKER_SIZE;

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <GestureDetector gesture={combinedGesture}>
        <View
          style={[
            styles.stickerBox,
            { width: boxSize, height: boxSize },
            isSelected && styles.stickerBoxSelected,
          ]}
        >
          <Ionicons
            name={sticker.iconName}
            size={boxSize * 0.76}
            color={sticker.color}
          />

          {isSelected ? (
            <>
              {/* Delete Button (Top Left) */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onDelete(sticker.id)}
                style={styles.deleteBadge}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close-circle" size={20} color={theme.colors.error} />
              </TouchableOpacity>

              {/* Rotate & Resize Handle (Bottom Right) */}
              <GestureDetector gesture={handlePanGesture}>
                <View style={styles.resizeBadge}>
                  <Ionicons
                    name="sync-circle"
                    size={22}
                    color={theme.colors.primary}
                  />
                </View>
              </GestureDetector>
            </>
          ) : null}
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 50,
  },
  stickerBox: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  stickerBoxSelected: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderStyle: "dashed",
    borderRadius: theme.borderRadius.sm,
    backgroundColor: "rgba(19, 137, 226, 0.08)",
  },
  deleteBadge: {
    position: "absolute",
    top: -8,
    left: -8,
    zIndex: 60,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
  },
  resizeBadge: {
    position: "absolute",
    bottom: -8,
    right: -8,
    zIndex: 60,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
  },
});

