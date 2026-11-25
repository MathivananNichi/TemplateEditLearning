import React, { useRef, useState } from "react";
import { View, type View as ViewInstance } from "react-native";
import { StyleSheet, Text, Image } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { DragImage, images } from "./images";
import DraggableImage from "../../components/DraggableImage";
import { convertToUser, templateJsonModel } from "./models/dummyjson";
const TARGET_BORDER = 2;
const PLACED_IMAGE_SIZE = 85;
const DRAG_IMAGE_SIZE = 85;

interface SelectedImage extends DragImage {
  eventX: number;
  eventY: number;
}

interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function TemplateEditScreenTest() {
  const targetRef = useRef<React.ElementRef<typeof View>>(null);
  const screenRef = useRef<React.ElementRef<typeof View>>(null);
  const [targetLayout, setTargetLayout] = useState<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );

  const [activeImage, setActiveImage] = useState<DragImage | null>(null);

  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  // Screen container's origin in window coordinates
  const screenX = useSharedValue(0);
  const screenY = useSharedValue(0);

  const measureScreen = () => {
    screenRef.current?.measureInWindow((x, y) => {
      screenX.value = x;
      screenY.value = y;
      console.log("root offset", x, y);
    });
  };
  // Measure target in screen/window coordinates.
  const measureTarget = () => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      setTargetLayout({
        x,
        y,
        width,
        height,
      });
    });
  };

  const handleDragStart = (item: DragImage) => {
    measureScreen();
    measureTarget();
    setActiveImage(item);
    console.log(
      "eeeeeeeeeeeeee",
      convertToUser().selectedTemplate.design_category_id,
    );
  };

  const handleDragEnd = () => {
    setActiveImage(null);
  };

  // Convert screen coordinates into target-relative coordinates.
  const handleDrop = (
    item: DragImage,
    absoluteX: number,
    absoluteY: number,
  ) => {
    const relativeX = absoluteX - targetLayout.x - PLACED_IMAGE_SIZE / 2;

    const relativeY = absoluteY - targetLayout.y - PLACED_IMAGE_SIZE / 2;

    // Keep the entire image within the target.
    const maxX = targetLayout.width - TARGET_BORDER * 2 - PLACED_IMAGE_SIZE;
    const maxY = targetLayout.height - TARGET_BORDER * 2 - PLACED_IMAGE_SIZE;

    const finalX = Math.max(0, Math.min(relativeX, maxX));
    const finalY = Math.max(0, Math.min(relativeY, maxY));

    setSelectedImage({
      ...item,
      eventX: finalX,
      eventY: finalY,
    });
  };

  // Floating image follows the finger.
  const dragPreviewStyle = useAnimatedStyle(() => ({
    opacity: activeImage ? 1 : 0,
    transform: [
      { translateX: dragX.value - screenX.value },
      { translateY: dragY.value - screenY.value },
      { scale: 1 },
    ],
  }));

  return (
    <View style={styles.screen} ref={screenRef}>
      <View style={styles.container}>
        <Text style={styles.heading}>Drag and Drop Images</Text>

        {/* Target container */}
        <View
          ref={targetRef}
          style={styles.targetContainer}
          onLayout={measureTarget}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={[
                styles.selectedImage,
                {
                  left: selectedImage.eventX,
                  top: selectedImage.eventY,
                },
              ]}
            />
          ) : (
            <Text style={styles.placeholder}>Drop Image Here</Text>
          )}
        </View>

        <Text style={styles.availableTitle}>Available Images</Text>

        {/* Available images */}
        <View style={styles.imageList}>
          {images.map((item) => (
            <View key={item.id} style={styles.imageItem}>
              <DraggableImage
                item={item}
                target={targetLayout}
                dragX={dragX}
                dragY={dragY}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Floating duplicate */}
      {activeImage && (
        <Animated.View
          pointerEvents="none"
          style={[styles.dragPreview, dragPreviewStyle]}
        >
          <Image
            source={{ uri: activeImage.uri }}
            style={styles.previewImage}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F5F5F5",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  targetContainer: {
    height: 220,
    position: "relative",
    overflow: "hidden",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#3985D6",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  placeholder: {
    position: "absolute",
    alignSelf: "center",
    top: "45%",
    fontSize: 16,
    color: "#777",
  },

  selectedImage: {
    position: "absolute",
    width: PLACED_IMAGE_SIZE,
    height: PLACED_IMAGE_SIZE,
    borderRadius: 10,
  },

  availableTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 35,
    marginBottom: 15,
  },

  imageList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imageItem: {
    alignItems: "center",
  },

  dragPreview: {
    position: "absolute",
    top: 0,
    left: 0,
    width: DRAG_IMAGE_SIZE,
    height: DRAG_IMAGE_SIZE,
    zIndex: 9999,
    elevation: 9999,
  },

  previewImage: {
    width: DRAG_IMAGE_SIZE,
    height: DRAG_IMAGE_SIZE,
    borderRadius: 10,
  },
});
