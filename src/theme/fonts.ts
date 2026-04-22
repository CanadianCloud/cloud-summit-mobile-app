// src/theme/fonts.ts
import { Platform } from "react-native";

export const FONTS = {
  // معادل --font-display در سایت
  display: Platform.select({
    ios: "SquadaOne-Regular",
    android: "SquadaOne-Regular",
    default: "System",
  }),

  // معادل --font-body در سایت
  body: Platform.select({
    ios: "NotoSans-Medium",
    android: "NotoSans-Medium",
    default: "System",
  }),
} as const;
