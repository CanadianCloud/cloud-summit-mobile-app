import { schedule } from '@/constants/schedule';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@/components/AppText';
import { COLORS } from '@/theme/colors';
import { TYPOGRAPHY } from '@/theme/typography';
import { handleAsyncStorageError } from '@/utils/handleAsyncStorageError';
import {
  getSessionId,
  loadSavedSessionIds,
  saveSavedSessionIds,
} from '@/utils/savedSessions';

export default function Schedule() {
  const titleStyleActivities = [
    'Community Stage: Session 1',
    'Community Stage: Session 2',
    'Community Stage: Session 3',
    'Community Stage: Session 4',
    'Community Stage: HackerRivals Round 1',
    'Community Stage: HackerRivals Round 2 Elimination Round',
  ];

  //   const eventStorage = createAsyncStorage("events");
  //   const [savedEvents, setSavedEvents] = useState(null);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const eventsKey = await eventStorage.getAllKeys();
  //         const events = await eventStorage.getMany(eventsKey);
  //         setSavedEvents(JSON.parse(events));
  //       } catch (e) {
  //         handleAsyncStorageError(e as AsyncStorageError);
  //       }
  //     })();
  //   }, [eventStorage]);

  //   async function saveEvent(index: number, event: Activity) {
  //     try {
  //       await eventStorage.setItem(index.toString(), JSON.stringify(event));
  //     } catch (e) {
  //       handleAsyncStorageError(e as AsyncStorageError);
  //     }
  //   }

  //   async function removeEvent(index: number) {
  //     try {
  //       await eventStorage.removeItem(index.toString());
  //     } catch (e) {
  //       handleAsyncStorageError(e as AsyncStorageError);
  //     }
  //   }

  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const rows = useMemo(() => {
    return schedule.map((item) => {
      const [title, subtitle, ...rest] = item.activities ?? [];
      // Render each extra activity on its own line (e.g. "Panel (...)").
      const description = rest.length ? rest.join('\n') : undefined;
      return { ...item, id: getSessionId(item), title, subtitle, description };
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const ids = await loadSavedSessionIds();
          setSaved(Object.fromEntries(ids.map((id) => [id, true])));
        } catch (e) {
          handleAsyncStorageError(e as never);
        }
      })();
    }, [])
  );

  async function toggleSaved(id: string) {
    const nextSaved = { ...saved, [id]: !saved[id] };
    const nextIds = Object.entries(nextSaved)
      .filter(([, isSaved]) => isSaved)
      .map(([savedId]) => savedId);

    setSaved(nextSaved);

    try {
      await saveSavedSessionIds(nextIds);
    } catch (e) {
      handleAsyncStorageError(e as never);
    }
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.root}>
      <View style={styles.header}>
        <AppText style={TYPOGRAPHY.screenHeader}>Schedule</AppText>
      </View>

      <FlatList
        data={rows}
        keyExtractor={(_, idx) => String(idx)}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              {!!item.title && (
                <AppText style={TYPOGRAPHY.title}>{item.title}</AppText>
              )}
              {!!item.subtitle && (
                <AppText
                  style={
                    titleStyleActivities.includes(item.subtitle?.trim() ?? '')
                      ? [TYPOGRAPHY.title, styles.subtitleAsTitle]
                      : [TYPOGRAPHY.subtitle, styles.subtitleSpacing]
                  }>
                  {item.subtitle}
                </AppText>
              )}
              {!!item.description &&
                item.description.split('\n').map((line, lineIndex) => {
                  const trimmedLine = line.trim();
                  const isTitleStyleLine =
                    titleStyleActivities.includes(trimmedLine);

                  return (
                    <AppText
                      key={`${index}-description-${lineIndex}`}
                      style={
                        isTitleStyleLine
                          ? [TYPOGRAPHY.title, styles.descriptionAsTitle]
                          : [
                              styles.description,
                              lineIndex > 0 && styles.descriptionLine,
                            ]
                      }>
                      {line}
                    </AppText>
                  );
                })}
            </View>

            <View style={styles.rowRight}>
              <View style={styles.timeColumn}>
                <AppText style={[TYPOGRAPHY.meta, styles.timeText]}>
                  {item.startTime} -
                </AppText>
                <AppText style={[TYPOGRAPHY.meta, styles.timeText]}>
                  {item.endTime}
                </AppText>
              </View>

              <Pressable
                accessibilityRole='button'
                onPress={() => toggleSaved(item.id)}
                style={styles.bookmarkButton}>
                <MaterialIcons
                  size={22}
                  name={saved[item.id] ? 'bookmark' : 'bookmark-border'}
                  color='#FFFFFF'
                />
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.appBg,
  },
  header: {
    backgroundColor: COLORS.headerBlue,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  list: {
    backgroundColor: COLORS.appBg,
  },
  listContent: {
    backgroundColor: COLORS.appBg,
    paddingVertical: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.borderSubtle,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rowLeft: {
    flex: 1,
    paddingRight: 12,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  subtitleSpacing: {
    marginTop: 4,
  },
  subtitleAsTitle: {
    marginTop: 4,
  },
  description: {
    marginTop: 8,
    ...TYPOGRAPHY.body,
  },
  descriptionLine: {
    marginTop: 2,
  },
  descriptionAsTitle: {
    marginTop: 8,
  },
  bookmarkButton: {
    marginLeft: 12,
    marginTop: -2,
    padding: 4,
  },
  timeColumn: {
    alignItems: 'flex-start',
    minWidth: 68,
  },
  timeText: {
    textAlign: 'left',
  },
});
