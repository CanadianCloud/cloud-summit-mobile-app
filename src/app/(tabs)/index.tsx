import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to</Text>
      <Text>Cloud Summit 2026</Text>
      <Text>Friday, May 1st, 2026</Text>
      <View style={{ flexDirection: "row", gap: 50 }}>
        <Link href="/(tabs)/schedule">
          <View style={{ alignItems: "center" }}>
            <MaterialIcons size={56} name="home" />
            <Text>Schedule</Text>
          </View>
        </Link>

        <Link href="/(tabs)/map">
          <View style={{ alignItems: "center" }}>
            <MaterialIcons size={56} name="map" />
            <Text>Map</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}
