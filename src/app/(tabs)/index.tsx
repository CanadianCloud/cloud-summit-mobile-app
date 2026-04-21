import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "@/components/AppText";
import { COLORS } from "@/theme/colors";
import { TYPOGRAPHY } from "@/theme/typography";

export default function Index() {
  return (
    <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.root}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/CloudSummit.png")}
          contentFit="contain"
          style={styles.logo}
        />

        <AppText style={styles.welcome}>Welcome to</AppText>
        <AppText style={styles.title}>Cloud Summit 2026</AppText>
        <AppText style={styles.date}>Friday, May 1st, 2026</AppText>

        <View style={styles.cardsRow}>
          <Link href="/(tabs)/schedule" asChild>
            <Pressable style={styles.card}>
              <MaterialIcons size={38} name="calendar-today" color="#F3F4F6" />
              <AppText style={styles.cardLabel}>SCHEDULE</AppText>
            </Pressable>
          </Link>

          <Link href="/(tabs)/map" asChild>
            <Pressable style={styles.card}>
              <MaterialIcons size={38} name="map" color="#F3F4F6" />
              <AppText style={styles.cardLabel}>MAP</AppText>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.appBg,
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 72,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 6,
  },
  welcome: {
    ...TYPOGRAPHY.label,
    marginTop: 4,
  },
  title: {
    ...TYPOGRAPHY.screenHeader,
    marginTop: 2,
  },
  date: {
    ...TYPOGRAPHY.meta,
    marginTop: 2,
  },
  cardsRow: {
    marginTop: 28,
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },
  card: {
    flex: 1,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#4E7ED9",
    backgroundColor: "#223866",
  },
  cardLabel: {
    ...TYPOGRAPHY.cardLabel,
    marginTop: 14,
  },
});
