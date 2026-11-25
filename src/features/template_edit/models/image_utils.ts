import { Dimensions, PixelRatio } from "react-native";

export interface Size {
  width: number;
  height: number;
}

export class ImageUtils {
  static getScaleFactor(imageWidth: number): number {
    const { width } = Dimensions.get("window");

    const physicalWidth = PixelRatio.getPixelSizeForLayoutSize(width);

    console.log("Logical width:", width);

    return physicalWidth / imageWidth;
  }

  static getScaledTempalteWidth(imageWidth: number, imageHeight: number): Size {
    const scaledValue = this.getScaleFactor(imageHeight);

    return {
      width: scaledValue * imageWidth,
      height: scaledValue * imageHeight,
    };
  }
}
