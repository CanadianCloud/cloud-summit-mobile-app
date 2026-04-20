import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@/components/AppText';
import { COLORS } from '@/theme/colors';
import { TYPOGRAPHY } from '@/theme/typography';

const committeeMembers = [
  {
    name: 'Matt Carolan',
    url: 'https://www.linkedin.com/in/matthewcarolan/',
  },
  {
    name: 'Bibi Souza',
    url: 'https://www.linkedin.com/in/bibschan/',
  },
  {
    name: 'Andrey Barkov',
    url: 'https://www.linkedin.com/in/andreybarkov/',
  },
  {
    name: 'Warren Lyne',
    url: 'https://www.linkedin.com/in/warrenlyne/',
  },
  {
    name: 'Fabio Simka Coutinho',
    url: 'https://www.linkedin.com/in/fabio-simka/',
  },
  {
    name: 'Jhan (Shanky) Silva',
    url: 'https://www.linkedin.com/in/shankyjs/',
  },
  {
    name: 'Michael Carlos',
    url: 'https://www.linkedin.com/in/mcarlos/',
  },
  {
    name: 'Nichanun Pong (Luck)',
    url: 'https://www.linkedin.com/in/nichanun-pong/',
  },
  {
    name: 'Fernando Stoelting',
    url: 'https://www.linkedin.com/in/fstoelting/',
  },
  {
    name: 'Philip Mak',
    url: 'https://www.linkedin.com/in/philip-mak-b2b92823a/',
  },
] as const;

const creditMembers = [
  {
    name: 'Nichanun Pong (Luck)',
    url: 'https://www.linkedin.com/in/nichanun-pong/',
  },
  {
    name: 'Viet Anh Hoang',
    url: 'https://www.linkedin.com/in/viet-anh-hoang-a504911b1/',
  },
  {
    name: 'Ahmad Salempour',
    url: 'https://www.linkedin.com/in/ahmad-salempoor/',
  },
  {
    name: 'Cassandra Carlos',
    url: 'https://www.linkedin.com/in/cassandracarlos/',
  },
   {
    name: 'Syouhei Yoshitake',
    url: 'https://www.linkedin.com/in/syouyoshi/',
  },
   {
    name: 'Sotheng Chheang',
    url: 'https://www.linkedin.com/in/sotheng-chheang/',
  },
] as const;

export default function About() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <AppText style={TYPOGRAPHY.screenHeader}>About</AppText>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <AppText style={styles.cardBody}>
            Cloud Summit is a community-driven event connecting people who are
            shaping the future of technology.
            {'\n\n'}
            We bring together developers, engineers, and industry leaders to
            share knowledge, explore cloud innovations, and build meaningful
            connections.
            {'\n\n'}
            Our mission is simple: educate, inspire, and grow the tech community
            while giving back.
          </AppText>
          <AppText style={styles.cardBody}>
            As a non-profit initiative, Cloud Summit is run by the Canadian
            Cloud community. Learn more about the organization at{' '}
            <AppText
              style={styles.link}
              onPress={() => Linking.openURL('https://www.CanadianCloud.org')}>
              https://www.CanadianCloud.org
            </AppText>
            , explore upcoming events at{' '}
            <AppText
              style={styles.link}
              onPress={() => Linking.openURL('https://www.CloudSummit.ca')}>
              https://www.CloudSummit.ca
            </AppText>
            , and view the volunteers contributing to these events at{' '}
            <AppText
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.linkedin.com/company/canadiancloud',
                )
              }>
              https://www.linkedin.com/company/canadiancloud
            </AppText>
            .
          </AppText>

          <AppText style={styles.cardBody}>
            {'\n\n'}
            We support local causes and create opportunities for learning
            through events, talks, and hands-on experiences.
            {'\n\n'}
            Join us and be part of the future of tech.
          </AppText>
        </View>

        <View style={[styles.card, { marginTop: 12 }]}>
          <AppText style={styles.cardTitle}>Committee Members</AppText>
          <View style={styles.committeeGrid}>
            {committeeMembers.map((member) => (
              <Pressable
                key={member.name}
                accessibilityRole='link'
                onPress={() => Linking.openURL(member.url)}
                style={styles.committeeItem}>
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
                accessibilityRole='link'
                onPress={() => Linking.openURL(member.url)}
                style={styles.committeeItem}>
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
    borderColor: 'rgba(255,255,255,0.12)',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  committeeItem: {
    width: '48%',
    borderRadius: 14,
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  committeeName: { ...TYPOGRAPHY.linkName },
  link: {
    ...TYPOGRAPHY.linkName,
    color: '#60A5FA',
    textDecorationLine: 'underline',
  },
});
