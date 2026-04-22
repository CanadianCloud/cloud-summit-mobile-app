import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { schedule } from "@/constants/schedule";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "@/components/AppText";
import { COLORS } from "@/theme/colors";
import { TYPOGRAPHY } from "@/theme/typography";
import { handleAsyncStorageError } from "@/utils/handleAsyncStorageError";
import {
  getSessionId,
  loadSavedSessionIds,
  saveSavedSessionIds,
} from "@/utils/savedSessions";

export default function Saved() {
  const titleStyleActivities = [
    "Community Stage: Session 1",
    "Community Stage: Session 2",
    "Community Stage: Session 3",
    "Community Stage: Session 4",
    "Community Stage: HackerRivals Round 1",
    "Community Stage: HackerRivals Round 2 Elimination Round",
  ];
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const items = useMemo(() => {
    return schedule
      .map((item) => ({
        ...item,
        id: getSessionId(item),
        title: item.activities[0],
        subtitle: item.activities[1],
        description:
          item.activities.length > 2 ? item.activities.slice(2).join("\n") : undefined,
      }))
      .filter((item) => savedIds.includes(item.id));
  }, [savedIds]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setSavedIds(await loadSavedSessionIds());
        } catch (e) {
          handleAsyncStorageError(e as never);
        }
      })();
    }, [])
  );

  async function removeSaved(id: string) {
    const nextIds = savedIds.filter((savedId) => savedId !== id);
    setSavedIds(nextIds);

    try {
      await saveSavedSessionIds(nextIds);
    } catch (e) {
      handleAsyncStorageError(e as never);
    }
  }

  return (
    <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.root}>
      <View style={styles.header}>
        <AppText style={TYPOGRAPHY.screenHeader}>Saved</AppText>
      </View>
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <AppText style={styles.emptyTitle}>No saved sessions</AppText>
          <AppText style={styles.emptyBody}>
            Bookmark sessions in Schedule and they will appear here.
          </AppText>
        </View>
      ) : (
      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
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
                    titleStyleActivities.includes(item.subtitle?.trim() ?? "")
                      ? [TYPOGRAPHY.title, styles.subtitleAsTitle]
                      : [TYPOGRAPHY.subtitle, styles.subtitleSpacing]
                  }
                >
                  {item.subtitle}
                </AppText>
              )}
              {!!item.description &&
                item.description.split("\n").map((line, lineIndex) => {
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
                      }
                    >
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
                accessibilityRole="button"
                onPress={() => removeSaved(item.id)}
                style={styles.bookmarkButton}
              >
              <MaterialIcons
                size={22}
                name="bookmark"
                color="#FFFFFF"
              />
              </Pressable>
            </View>
          </View>
        )}
      />
      )}
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
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.25,
  },
  list: { backgroundColor: COLORS.appBg },
  listContent: { paddingHorizontal: 12, paddingVertical: 12 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    ...TYPOGRAPHY.title,
    textAlign: "center",
  },
  emptyBody: {
    ...TYPOGRAPHY.body,
    marginTop: 8,
    textAlign: "center",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.borderSubtle,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rowLeft: { flex: 1, paddingRight: 12 },
  rowRight: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
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
    alignItems: "flex-start",
    minWidth: 68,
  },
  timeText: {
    textAlign: "left",
  },
});
