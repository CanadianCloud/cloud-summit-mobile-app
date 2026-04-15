import { schedule } from "@/constants/schedule";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, Text, View } from "react-native";

export default function Schedule() {
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

  return (
    <View>
      <FlatList
        data={schedule}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: "white",
              margin: 4,
              flex: 1,
              flexDirection: "row",
              padding: 10,
            }}
          >
            {/* Left side (activities) */}
            <View style={{ flex: 1, marginRight: 30 }}>
              {item.activities?.map((activity, i) => (
                <Text key={i}>
                  {i < item.activities.length - 1 ? activity + "\n" : activity}
                </Text>
              ))}
            </View>

            {/* Right side (time) */}
            <Text style={{ flexShrink: 0, alignSelf: "center" }}>
              {item.startTime} - {item.endTime}
            </Text>

            <MaterialIcons
              style={{ alignSelf: "center" }}
              size={48}
              name="bookmark-outline"
            ></MaterialIcons>
          </View>
        )}
      />
    </View>
  );
}
