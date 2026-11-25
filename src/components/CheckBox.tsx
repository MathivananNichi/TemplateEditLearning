import { Pressable, View } from "react-native";

import { useTheme } from "../theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
interface LayoutBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface CheckBoxprops {
  width?: number;
  height?: number;
  checked?: boolean;
  onChange?: (next: boolean) => void;
}
export default function CheckBox({
  width = 15,
  height = 15,
  checked = false,
  onChange,
}: CheckBoxprops) {
  const targetRef = useRef<React.ComponentRef<typeof View>>(null);
  const [bounds, setBounds] = useState<LayoutBounds>({
    x: 0,
    y: 0,
    width: width,
    height: height,
  });
  const [isChecked, setChecked] = useState<boolean>(false);
  const targetBoundsRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const path = useMemo(() => {
    const w = bounds.width;
    const h = bounds.height;
    const builder = Skia.PathBuilder.Make();

    // Checkmark scaled to box dimensions
    builder?.moveTo(w * 0.15, h * 0.4);
    builder?.lineTo(w * 0.35, h * 0.6);
    builder?.lineTo(w * 0.68, h * 0.1);

    return builder?.build() ?? null;
  }, [bounds.width, bounds.height]);

  const measureScreen = useCallback(() => {
    targetRef.current?.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        if (width > 0 && height > 0) {
          const next = { x, y, width, height };
          targetBoundsRef.current = next;
          setBounds(next);
        }
      },
    );
  }, []);

  const theme = useTheme();
  return (
    <Pressable
      onPress={() => {
        setChecked((prev) => {
          const next = !prev;
          onChange?.(next);
          return next;
        });
      }}
    >
      <View
        ref={targetRef}
        onLayout={measureScreen}
        style={{
          width: 15,
          height: 15,
          position: "relative",
          borderWidth: 1.5,
          borderRadius: 3,
          backgroundColor: isChecked
            ? theme.colors.primary
            : theme.colors.borderClear,
          borderColor: theme.colors.primary,
        }}
      >
        {isChecked && (
          <Canvas style={{ flex: 1 }} pointerEvents="none">
            {path ? (
              <Path
                path={path}
                color={theme.colors.inputBackground}
                style="stroke"
                strokeCap="round"
                strokeJoin="round"
                strokeWidth={1.5}
              />
            ) : null}
          </Canvas>
        )}
        {/* <Ionicons
        name="checkmark-outline"
        size={16}
        color={theme.colors.shadowDark}
        style={{ position: "absolute", top: -3 }}
      /> */}
      </View>
    </Pressable>
  );
}
