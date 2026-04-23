import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";
import { FONTS } from "./fonts"; // حتماً این خط را اضافه کنید

export const TYPOGRAPHY = StyleSheet.create({
  // --- دسته‌بندی تیترها (استفاده از Squada One) ---
  screenHeader: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 36,
    lineHeight: 40,
    // textTransform: "uppercase",
  },
  cardHeading: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 22,
    // textTransform: "uppercase",
  },
  cardLabel: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 20,
    letterSpacing: 0.5,
    // textTransform: "uppercase",
  },
  title: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 18,
    // textTransform: "uppercase",
  },

  // --- دسته‌بندی متن‌های بدنه (استفاده از Noto Sans) ---
  bodyLarge: {
    color: COLORS.textMuted,
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    color: COLORS.textMuted,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.body,
    fontSize: 14,
    fontWeight: "700", // نوتو سانس در وزن مدیوم خودش ضخامت کافی دارد
  },
  subtitle: {
    color: COLORS.textDim,
    fontFamily: FONTS.body,
    fontSize: 12,
  },
  meta: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 12,
    textAlign: "center",
  },
  linkName: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 18,
  },
});
