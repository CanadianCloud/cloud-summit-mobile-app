import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "@/components/AppText";
import { COLORS } from "@/theme/colors";
import { TYPOGRAPHY } from "@/theme/typography";

export default function Map() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <AppText style={TYPOGRAPHY.screenHeader}>Map</AppText>
      </View>

      <View style={styles.content}>
        <View style={styles.mapPanel}>
          <AppText style={[TYPOGRAPHY.subtitle, styles.muted]}>
            Map placeholder
          </AppText>
        </View>

        <View style={styles.legendPanel}>
          <AppText style={styles.legendTitle}>Legend</AppText>
          <View style={styles.legendGrid}>
            {["Room", "Stage", "Info", "Food"].map((label) => (
              <View key={label} style={styles.legendItem}>
                <View style={styles.legendDotWrap}>
                  <View style={styles.legendDot} />
                </View>
                <AppText style={styles.legendText}>{label}</AppText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.appBg },
  header: {
    backgroundColor: COLORS.headerBlue,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  content: { flex: 1, padding: 12 },
  mapPanel: {
    flex: 1,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: COLORS.panelDark,
    alignItems: "center",
    justifyContent: "center",
  },
  muted: {},
  legendPanel: {
    marginTop: 12,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: COLORS.panelDark,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  legendTitle: { ...TYPOGRAPHY.label },
  legendGrid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  legendItem: { width: "48%", flexDirection: "row", alignItems: "center" },
  legendDotWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#60A5FA",
  },
  legendText: { ...TYPOGRAPHY.bodyLarge, color: COLORS.textPrimary },
});
