import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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

const committeeMembers = [
  {
    name: "Matt Carolan",
    url: "https://www.linkedin.com/in/matthewcarolan/",
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
  {
    name: "Syouhei Yoshitake",
    url: "https://www.linkedin.com/in/syouyoshi/",
  },
  {
    name: "Sotheng Chheang",
    url: "https://www.linkedin.com/in/sotheng-chheang/",
  },
] as const;

export default function About() {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.root}>
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

        <View style={[styles.card, { marginTop: 12 }]}>
          <AppText style={styles.cardTitle}>Committee Members</AppText>
          <View style={styles.committeeGrid}>
            {committeeMembers.map((member) => (
              <Pressable
                key={member.name}
                accessibilityRole="link"
                onPress={() => Linking.openURL(member.url)}
                style={styles.committeeItem}
              >
                <AppText style={styles.committeeName}>{member.name}</AppText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.card, { marginTop: 12 }]}>
          <AppText style={styles.cardTitle}>App Team</AppText>
          <View style={styles.committeeGrid}>
            {creditMembers.map((member) => (
              <Pressable
                key={member.name}
                accessibilityRole="link"
                onPress={() => Linking.openURL(member.url)}
                style={styles.committeeItem}
              >
                <AppText style={styles.committeeName}>{member.name}</AppText>
              </Pressable>
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
  cardTitle: { ...TYPOGRAPHY.cardHeading },
  cardBody: {
    marginTop: 8,
    ...TYPOGRAPHY.bodyLarge,
  },
  committeeGrid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  committeeItem: {
    width: "48%",
    borderRadius: 14,
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  committeeName: { ...TYPOGRAPHY.linkName },
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
});
