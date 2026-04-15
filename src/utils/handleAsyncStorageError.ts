import { AsyncStorageError } from "@react-native-async-storage/async-storage";

export function handleAsyncStorageError(e: AsyncStorageError) {
  if (e instanceof AsyncStorageError) {
    switch (e.type) {
      case AsyncStorageError.Type.SqliteStorageError:
        console.error("SQLite failure:", e.message);
        break;
      case AsyncStorageError.Type.WebStorageError:
        console.error("IndexedDB failure:", e.message);
        break;
      default:
        console.error("AsyncStorage error:", e.message);
    }
  } else {
    console.error("Unexpected error:", e);
  }
}
