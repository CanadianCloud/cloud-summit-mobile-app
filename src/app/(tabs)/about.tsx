import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "@/components/AppText";
import { COLORS } from "@/theme/colors";
import { TYPOGRAPHY } from "@/theme/typography";

// --- داده‌های ثابت ---
const committeeMembers = [
  { name: "Matt Carolan", url: "https://www.linkedin.com/in/matthewcarolan/" },
  { name: "Bibi Souza", url: "https://www.linkedin.com/in/bibschan/" },
  { name: "Andrey Barkov", url: "https://www.linkedin.com/in/andreybarkov/" },
  { name: "Warren Lyne", url: "https://www.linkedin.com/in/warrenlyne/" },
  {
    name: "Fabio Simka Coutinho",
    url: "https://www.linkedin.com/in/fabio-simka/",
  },
  { name: "Jhan (Shanky) Silva", url: "https://www.linkedin.com/in/shankyjs/" },
  { name: "Michael Carlos", url: "https://www.linkedin.com/in/mcarlos/" },
  {
    name: "Nichanun Pong (Luck)",
    url: "https://www.linkedin.com/in/nichanun-pong/",
  },
  {
    name: "Fernando Stoelting",
    url: "https://www.linkedin.com/in/fstoelting/",
  },
  {
    name: "Philip Mak",
    url: "https://www.linkedin.com/in/philip-mak-b2b92823a/",
  },
] as const;

const creditMembers = [
  {
    name: "Nichanun Pong (Luck)",
    url: "https://www.linkedin.com/in/nichanun-pong/",
  },
  {
    name: "Viet Anh Hoang",
    url: "https://www.linkedin.com/in/viet-anh-hoang-a504911b1/",
  },
  {
    name: "Ahmad Salempour",
    url: "https://www.linkedin.com/in/ahmad-salempoor/",
  },
  {
    name: "Cassandra Carlos",
    url: "https://www.linkedin.com/in/cassandracarlos/",
  },
  { name: "Syouhei Yoshitake", url: "https://www.linkedin.com/in/syouyoshi/" },
  {
    name: "Sotheng Chheang",
    url: "https://www.linkedin.com/in/sotheng-chheang/",
  },
] as const;

// --- مؤلفه کارت عضو (مشابه LegendItem) ---
const MemberItem = ({ name, url }: { name: string; url: string }) => {
  const hoverValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        hoverValue.value === 1 ? "rgba(30, 144, 255, 0.05)" : COLORS.panelDark,
        { duration: 200 },
      ),
      borderColor: withTiming(
        hoverValue.value === 1 ? "#1e90ff" : "rgba(255,255,255,0.12)",
        { duration: 200 },
      ),
      shadowOpacity: withTiming(hoverValue.value === 1 ? 0.3 : 0, {
        duration: 200,
      }),
    };
  });

  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={styles.memberItemWrapper}
      {...(Platform.OS === "web"
        ? {
            onMouseEnter: () => (hoverValue.value = 1),
            onMouseLeave: () => (hoverValue.value = 0),
          }
        : {
            onPressIn: () => (hoverValue.value = 1),
            onPressOut: () => (hoverValue.value = 0),
          })}
    >
      <Animated.View style={[styles.memberItem, animatedStyle]}>
        <View style={styles.textWrap}>
          <AppText style={styles.memberName} numberOfLines={1}>
            {name}
          </AppText>
        </View>
      </Animated.View>
    </Pressable>
  );
};

// --- صفحه اصلی ---
export default function About() {
  return (
    <SafeAreaView style={styles.root}>
      {/* توجه: هدر دستی حذف شد تا از هدر Layout استفاده شود. 
         اگر headerShown: false را در لایوت ست نکرده‌ای، طبق پیام قبلی عمل کن.
      */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <AppText style={styles.cardBody}>
            Cloud Summit is a community-driven event connecting people who are
            shaping the future of technology.
            {"\n\n"}
            We bring together developers, engineers, and industry leaders to
            share knowledge, explore cloud innovations, and build meaningful
            connections.
            {"\n\n"}
            Our mission is simple: educate, inspire, and grow the tech community
            while giving back.
          </AppText>
          <AppText style={styles.cardBody}>
            As a non-profit initiative, Cloud Summit is run by the Canadian
            Cloud community. Learn more about the organization at{" "}
            <AppText
              style={styles.link}
              onPress={() => Linking.openURL("https://www.CanadianCloud.org")}
            >
              https://www.CanadianCloud.org
            </AppText>
            , explore upcoming events at{" "}
            <AppText
              style={styles.link}
              onPress={() => Linking.openURL("https://www.CloudSummit.ca")}
            >
              https://www.CloudSummit.ca
            </AppText>
            , and view the volunteers contributing to these events at{" "}
            <AppText
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/company/canadiancloud",
                )
              }
            >
              https://www.linkedin.com/company/canadiancloud
            </AppText>
            .
          </AppText>

          <AppText style={styles.cardBody}>
            {"\n\n"}
            We support local causes and create opportunities for learning
            through events, talks, and hands-on experiences.
            {"\n\n"}
            Join us and be part of the future of tech.
          </AppText>
        </View>

        {/* Committee Section */}
        <View style={[styles.card, { marginTop: 12 }]}>
          <AppText style={styles.cardTitle}>Committee Members</AppText>
          <View style={styles.memberGrid}>
            {committeeMembers.map((member) => (
              <MemberItem
                key={member.name}
                name={member.name}
                url={member.url}
              />
            ))}
          </View>
        </View>

        {/* App Team Section */}
        <View style={[styles.card, { marginTop: 12 }]}>
          <AppText style={styles.cardTitle}>App Team</AppText>
          <View style={styles.memberGrid}>
            {creditMembers.map((member) => (
              <MemberItem
                key={member.name}
                name={member.name}
                url={member.url}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.appBg },
  content: { paddingHorizontal: 12, paddingVertical: 12 },
  card: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: COLORS.panelDark,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardTitle: {
    ...TYPOGRAPHY.cardHeading,
    marginBottom: 12,
  },
  cardBody: {
    marginTop: 8,
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textPrimary,
  },

  // --- استایل‌های Legend ---
  memberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  memberItemWrapper: {
    width: "48.5%",
    marginBottom: 8,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 56, // دقیقا مشابه LegendItem در مپ
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: "#1e90ff",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  textWrap: { flex: 1 },
  memberName: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textPrimary,
    fontSize: 13, // کمی کوچک‌تر برای جا شدن اسامی طولانی در دو ستون
  },
  link: {
    ...TYPOGRAPHY.linkName,
    color: "#60A5FA",
    textDecorationLine: "underline",
  },
});
