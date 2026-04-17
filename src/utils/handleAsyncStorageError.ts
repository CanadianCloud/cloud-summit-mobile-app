import { AsyncStorageError } from "@react-native-async-storage/async-storage";

export function handleAsyncStorageError(e: AsyncStorageError) {
  if (e instanceof AsyncStorageError) {
    switch (e.type) {
      case AsyncStorageError.Type.SqliteStorageError:
        console.warn("SQLite failure:", e.message);
        break;
      case AsyncStorageError.Type.WebStorageError:
        console.warn("IndexedDB failure:", e.message);
        break;
      default:
        console.warn("AsyncStorage error:", e.message);
    }
  } else {
    console.warn("Unexpected error:", e);
  }
}
