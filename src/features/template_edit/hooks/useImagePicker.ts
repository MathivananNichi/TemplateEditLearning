import { useState, useCallback } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pickImages = useCallback(async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow photo gallery access to pick images for templates.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uris = result.assets.map((asset) => asset.uri);
        setSelectedImages((prev) => [...prev, ...uris]);
      }
    } catch (error) {
      console.error("Failed to pick images:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while selecting images.",
      );
    }
  }, []);

  const removeImage = useCallback((indexToRemove: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  }, []);

  const clearImages = useCallback(() => {
    setSelectedImages([]);
  }, []);

  return {
    selectedImages,
    pickImages,
    removeImage,
    clearImages,
  };
}

