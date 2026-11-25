import React, { ReactNode } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export interface DraggableItemProps {
  children?: ReactNode;
  item?: ReactNode; // backward compatibility for item prop
  snapBackOnRelease?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (finalX: number, finalY: number) => void;
}

export function DraggableItem({
  children,
  item,
  snapBackOnRelease = false,
  onDragStart,
  onDragEnd,
}: DraggableItemProps) {
  const content = children ?? item;

  // Track the current translation offset
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  // Store starting point of each pan gesture
  const startX = useSharedValue<number>(0);
  const startY = useSharedValue<number>(0);

  const isDragging = useSharedValue<boolean>(false);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      startX.value = translateX.value;
      startY.value = translateY.value;

      if (onDragStart) {
        runOnJS(onDragStart)();
      }
    })
    .onUpdate((event) => {
      // Add the finger's delta movement (translationX/Y) to the starting position
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      if (onDragEnd) {
        runOnJS(onDragEnd)(translateX.value, translateY.value);
      }

      if (snapBackOnRelease) {
        // Smoothly spring back to origin
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    zIndex: isDragging.value ? 999 : 1,
    opacity: isDragging.value ? 0.85 : 1,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>{content}</Animated.View>
    </GestureDetector>
  );
}

// Alias for backward compatibility
export const DraggableImages = DraggableItem;
export default DraggableItem;

