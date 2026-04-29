import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import {
  Image,
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

type ExternalLinkConfig = {
  key: string;
  label: string;
  /** Font Awesome 5 brand icon name. */
  icon: "linkedin" | "discord" | "youtube" | "instagram";
  webUrl: string;
  /** Tried in order with Linking.canOpenURL before webUrl. */
  nativeUrls: readonly string[];
};

/** FR-25: configurable external links (FR-26–28: native app when available, else browser). */
const externalLinks = [
  {
    key: "linkedin",
    label: "Canadian Cloud on LinkedIn",
    icon: "linkedin",
    webUrl: "https://www.linkedin.com/company/canadiancloud",
    nativeUrls: ["linkedin://company/canadiancloud"],
  },
  {
    key: "discord",
    label: "Canadian Cloud on Discord",
    icon: "discord",
    webUrl: "https://discord.com/invite/wg372JtEK8",
    nativeUrls: [
      "discord://invite/wg372JtEK8",
      "discord://discord.com/invite/wg372JtEK8",
    ],
  },
  {
    key: "youtube",
    label: "Canadian Cloud on YouTube",
    icon: "youtube",
    webUrl: "https://www.youtube.com/channel/UCMfuz22CouuimIXngTMMZIQ",
    nativeUrls: [
      "youtube://www.youtube.com/channel/UCMfuz22CouuimIXngTMMZIQ",
      "vnd.youtube://channel/UCMfuz22CouuimIXngTMMZIQ",
    ],
  },
  {
    key: "instagram",
    label: "Canadian Cloud on Instagram",
    icon: "instagram",
    webUrl: "https://www.instagram.com/canadiancloudninja/",
    nativeUrls: ["instagram://user?username=canadiancloudninja"],
  },
] as const satisfies readonly ExternalLinkConfig[];

async function openExternalLink(link: ExternalLinkConfig) {
  if (Platform.OS === "web") {
    await Linking.openURL(link.webUrl);
    return;
  }
  for (const url of link.nativeUrls) {
    try {
      if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url);
        return;
      }
    } catch {
      /* try next native URL or web */
    }
  }
  await Linking.openURL(link.webUrl);
}

const sponsorsLogos = [
  {
    name: "Fortinet",
    logo: require("../../../assets/images/logos/Fortinet-logo.png"),
  },
  {
    name: "AWS",
    logo: require("../../../assets/images/logos/AWS-logo.png"),
  },
  {
    name: "Habile Labs",
    logo: require("../../../assets/images/logos/HabileLabs-logo.png"),
  },
  {
    name: "Elastic",
    logo: require("../../../assets/images/logos/Elastic-logo.png"),
  },
  {
    name: "Defang",
    logo: require("../../../assets/images/logos/Defang-logo.png"),
  },
];

const communityPartnersLogos = [
  {
    name: "AWS Day",
    logo: require("../../../assets/images/logos/AWS-Day-logo.png"),
  },
  {
    name: "Wicys",
    logo: require("../../../assets/images/logos/Wicys-logo.png"),
  },
  {
    name: "OpenBao",
    logo: require("../../../assets/images/logos/OpenBao-logo.png"),
  },
  {
    name: "GDG",
    logo: require("../../../assets/images/logos/GDG-logo.png"),
  },
  {
    name: "HackerRivals",
    logo: require("../../../assets/images/logos/HackerRivals-logo.png"),
  },
  {
    name: "VanLug",
    logo: require("../../../assets/images/logos/VanLug-logo.png"),
  },
  {
    name: "ISACA",
    logo: require("../../../assets/images/logos/ISACA-logo.png"),
  },
  {
    name: "Microsoft",
    logo: require("../../../assets/images/logos/Microsoft-logo.png"),
  },
  {
    name: "Asis",
    logo: require("../../../assets/images/logos/Asis-trans-logo.png"),
  },
  {
    name: "Northeastern",
    logo: require("../../../assets/images/logos/Northeastern-logo.png"),
  },
  {
    name: "Vanruby",
    logo: require("../../../assets/images/logos/Vanruby-logo.png"),
  },
];

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
    name: "Bibi Souza",
    url: "https://www.linkedin.com/in/bibschan/",
  },
  {
    name: "Andrey Barkov",
    url: "https://www.linkedin.com/in/andreybarkov/",
  },
  {
    name: "Warren Lyne",
    url: "https://www.linkedin.com/in/warrenlyne/",
  },
  {
    name: "Fabio Simka Coutinho",
    url: "https://www.linkedin.com/in/fabio-simka/",
  },
  {
    name: "Jhan (Shanky) Silva",
    url: "https://www.linkedin.com/in/shankyjs/",
  },
  {
    name: "Michael Carlos",
    url: "https://www.linkedin.com/in/mcarlos/",
  },
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
      accessibilityRole="link"
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

export default function About() {
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={styles.root}
    >
      <View style={styles.header}>
        <AppText style={TYPOGRAPHY.screenHeader}>About</AppText>
      </View>

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

          <ScrollView
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            accessibilityRole="list"
            contentContainerStyle={styles.socialLinksRow}
          >
            {externalLinks.map((link) => (
              <Pressable
                key={link.key}
                accessibilityRole="link"
                accessibilityLabel={link.label}
                onPress={() => void openExternalLink(link)}
                style={({ pressed }) => [
                  styles.socialLinkHit,
                  pressed && styles.socialLinkHitPressed,
                ]}
              >
                <FontAwesome5
                  brand
                  name={link.icon}
                  size={32}
                  color={COLORS.textMuted}
                  style={{ marginRight: 16 }}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Sponsors Section */}
        <View style={[styles.card, { marginTop: 8 }]}>
          <AppText style={styles.cardTitle}>Sponsors</AppText>
          <View style={styles.sponsorLogos}>
            <View style={styles.sponsorRow}>
              <Image
                accessibilityLabel="Fortinet"
                source={sponsorsLogos[0].logo}
                style={styles.sponsorLogoFull}
                resizeMode="contain"
              />
            </View>
            <View style={styles.sponsorRow}>
              <Image
                accessibilityLabel="AWS"
                source={sponsorsLogos[1].logo}
                style={styles.sponsorLogoFull}
                resizeMode="contain"
              />
            </View>
            <View style={styles.sponsorRowTwo}>
              <Image
                accessibilityLabel="Habile Labs"
                source={sponsorsLogos[2].logo}
                style={styles.sponsorLogoHalf}
                resizeMode="contain"
              />
              <Image
                accessibilityLabel="Elastic"
                source={sponsorsLogos[3].logo}
                style={styles.sponsorLogoHalf}
                resizeMode="contain"
              />
            </View>
            <View style={styles.sponsorRow}>
              <Image
                accessibilityLabel="Defang"
                source={sponsorsLogos[4].logo}
                style={styles.sponsorLogoFull}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Community Partners Section */}
        <View style={[styles.card, { marginTop: 12 }]}>
          <AppText style={styles.cardTitle}>Community Partners</AppText>
          <View style={styles.partnerGrid}>
            {Array.from(
              { length: Math.ceil(communityPartnersLogos.length / 4) },
              (_, rowIndex) =>
                communityPartnersLogos.slice(rowIndex * 4, rowIndex * 4 + 4),
            ).map((row, rowIndex, allRows) => {
              const isLastRow = rowIndex === allRows.length - 1;
              const shouldStretch = isLastRow && row.length < 4;

              return (
                <View key={`partner-row-${rowIndex}`} style={styles.partnerRow}>
                  {row.map((partner) => (
                    <View
                      key={partner.name}
                      style={[
                        styles.boxedItem,
                        shouldStretch && styles.boxedItemStretch,
                      ]}
                    >
                      <Image
                        accessibilityLabel={partner.name}
                        source={partner.logo}
                        style={styles.sponsorLogoFull}
                        resizeMode="contain"
                      />
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        </View>

        {/* Committee Section */}
        <View style={[styles.card, { marginTop: 12 }]}>
          <AppText style={styles.cardTitle}>Committee Members</AppText>
          <View style={styles.memberGrid}>
            {committeeMembers.map((member, index) => (
              <MemberItem
                key={`${member.url}-${index}`}
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
            {creditMembers.map((member, index) => (
              <MemberItem
                key={`${member.url}-${index}`}
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
  header: {
    backgroundColor: COLORS.headerBlue,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
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

  memberGrid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  memberItemWrapper: {
    width: "48.5%",
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
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
    fontSize: 13,
  },
  link: {
    ...TYPOGRAPHY.linkName,
    color: "#60A5FA",
    textDecorationLine: "underline",
  },
  socialLinksRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 4,
  },
  socialLinkHit: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  socialLinkHitPressed: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  sponsorLogos: {
    marginTop: 4,
    gap: 8,
  },
  partnerGrid: {
    marginTop: 8,
    gap: 10,
  },
  partnerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 4,
    gap: 8,
  },
  boxedItem: {
    width: "23.5%",
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  boxedItemStretch: {
    flex: 1,
    width: undefined,
    minHeight: 64,
  },
  sponsorRow: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 64,
  },
  sponsorRowTwo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    minHeight: 64,
  },
  sponsorLogoFull: {
    width: "100%",
    maxWidth: 320,
    height: 64,
  },
  sponsorLogoHalf: {
    flex: 1,
    height: 48,
    maxWidth: "70%",
  },
});
