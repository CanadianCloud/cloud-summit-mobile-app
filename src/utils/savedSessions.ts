import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Activity } from "@/constants/schedule";

const SAVED_SESSIONS_KEY = "saved-sessions";

export type SavedSession = Activity & {
  id: string;
};

export function getSessionId(item: Activity) {
  return `${item.startTime}-${item.endTime}-${item.activities.join("|")}`;
}

export async function loadSavedSessionIds() {
  const raw = await AsyncStorage.getItem(SAVED_SESSIONS_KEY);
  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
}

export async function saveSavedSessionIds(ids: string[]) {
  await AsyncStorage.setItem(SAVED_SESSIONS_KEY, JSON.stringify(ids));
}

