import { StyleSheet } from "react-native";

import { COLORS } from "@/theme/colors";

export const TYPOGRAPHY = StyleSheet.create({
  screenHeader: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.25,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "800",
  },
  cardHeading: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "800",
  },
  cardLabel: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: COLORS.textDim,
    fontSize: 12,
  },
  body: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  bodyLarge: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 18,
  },
  meta: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: "center",
  },
  linkName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 18,
  },
});

