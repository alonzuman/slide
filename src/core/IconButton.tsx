import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Constants from "../constants/Constants";
import { useTheme } from "../hooks/useTheme";
import { Sizes } from "../types";
import BlurWrapper from "./BlurWrapper";

type Props = {
  size?: Sizes;
  children?: any;
  onPress?: Function;
  card?: boolean;
  borderRadiusDivider?: number;
  elevation?: 0 | 1 | 2;
  variant?: "blur" | "outlined" | "";
  style?: ViewStyle;
};

export default function IconButton({
  elevation = 1,
  size = "m",
  children,
  onPress,
  borderRadiusDivider,
  style,
  variant = "outlined",
}: Props) {
  const { colors } = useTheme();
  const sizes = {
    xxs: 16,
    xs: 24,
    s: 32,
    m: 40,
    l: 48,
    xl: 80,
    xxl: 112,
    xxxl: 200,
  };

  const borderRadius =
    sizes[size] / (borderRadiusDivider ||
    Constants.Theme.shape.ICON_BUTTON_DIVIDER);

  const shadows =
    elevation === 0
      ? null
      : {
          shadowColor: "#00000055",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
        };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: variant === "outlined" ? colors.card : "transparent",
        height: sizes[size],
        width: sizes[size],
        borderRadius,
        alignItems: "center",
        borderWidth: 1,
        borderColor: variant === "outlined" ? colors.border : "transparent",
        justifyContent: "center",
        ...shadows,
        ...style,
      }}
      onPress={onPress}
    >
      {variant === "blur" ? (
        <BlurWrapper
          style={{
            height: sizes[size],
            width: sizes[size],
            borderRadius,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </BlurWrapper>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
