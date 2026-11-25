import React from "react";
import { View } from "react-native";

/**
 * Universal Image / Gallery Icon
 */
export function ImageIcon({
  color = "#FFFFFF",
  size = 18,
}: {
  color?: string;
  size?: number;
}) {
  const height = size * 0.8;
  return (
    <View
      style={{
        width: size,
        height: height,
        borderRadius: 3.5,
        borderWidth: 1.6,
        borderColor: color,
        overflow: "hidden",
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {/* Sun / Moon dot */}
      <View
        style={{
          position: "absolute",
          top: 2.5,
          left: 3,
          width: size * 0.2,
          height: size * 0.2,
          borderRadius: (size * 0.2) / 2,
          backgroundColor: color,
        }}
      />
      {/* Big mountain */}
      <View
        style={{
          position: "absolute",
          bottom: -size * 0.28,
          left: size * 0.05,
          width: size * 0.65,
          height: size * 0.65,
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
        }}
      />
      {/* Small mountain */}
      <View
        style={{
          position: "absolute",
          bottom: -size * 0.25,
          right: size * 0.02,
          width: size * 0.5,
          height: size * 0.5,
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
  );
}

/**
 * Plus / Add Icon
 */
export function PlusIcon({
  color = "#FFFFFF",
  size = 16,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: size,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          position: "absolute",
          height: size,
          width: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
    </View>
  );
}
