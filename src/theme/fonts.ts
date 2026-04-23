// src/theme/fonts.ts
import { Platform } from "react-native";

export const FONTS = {
  display: Platform.select({
    ios: "SquadaOne-Regular",
    android: "SquadaOne-Regular",
    default: "System",
  }),

  body: Platform.select({
    ios: "NotoSans-Medium",
    android: "NotoSans-Medium",
    default: "System",
  }),
} as const;
