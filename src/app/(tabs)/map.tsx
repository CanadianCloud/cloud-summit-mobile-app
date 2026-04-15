import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");
const MAP_HEIGHT = screenWidth * 1.5;

interface MarkerType {
  id: string;
  title: string;
  top: string;
  left: string;
  icon: any;
  width: number;
  height: number;
}

const AnimatedMarker = ({ marker, isActive }: { marker: MarkerType, isActive: boolean }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      translateY.value = withRepeat(
        withSequence(withTiming(-15, { duration: 300 }), withTiming(0, { duration: 300 })),
        -1,
        true
      );
    } else {
      translateY.value = withTiming(0);
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.markerContainer, { width: marker.width, height: marker.height }, animatedStyle]}>
      <Image
        source={marker.icon}
        style={[styles.fullIcon, isActive && { tintColor: '#1e90ff' }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

// ... (ایمپورت‌ها و اینترفیس ثابت می‌مانند)

export default function MapScreen() {
  const [floor, setFloor] = useState(1);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  // تعریف صحیح مارکرها
  const allMarkers = React.useMemo(() => ({
    floor1: [
      { id: "v_lounge", title: "Volunteers lounge", icon: require("../../../assets/images/Icons/Volunteers_lounge_restricted_access.png"), top: "27.5%", left: "32.8%", width: 35, height: 35 },
      { id: "s_lounge", title: "Speakers lounge", icon: require("../../../assets/images/Icons/Speakers_lounge_restricted_access.png"), top: "33.5%", left: "26.5%", width: 35, height: 35 },
      { id: "c_lounge", title: "Community lounge", icon: require("../../../assets/images/Icons/Community_lounge_food_and_drinks.png"), top: "45.0%", left: "31.0%", width: 35, height: 35 },
      { id: "water_f1", title: "Water refill station", icon: require("../../../assets/images/Icons/Water_refill_station.png"), top: "43.5%", left: "47.5%", width: 30, height: 30 },
      { id: "reg_tickets", title: "Registration and tickets", icon: require("../../../assets/images/Icons/Registration_and_tickets.png"), top: "31.5%", left: "69.5%", width: 35, height: 35 },
      { id: "venue_map_f1", title: "Venue map and schedule", icon: require("../../../assets/images/Icons/Venue_map_and_schedule.png"), top: "40.5%", left: "39.5%", width: 35, height: 35 },
      { id: "entrance", title: "Entrance and exit", icon: require("../../../assets/images/Icons/Enterance_and_exit.png"), top: "39.5%", left: "73.5%", width: 35, height: 35 },
      { id: "lockers_f1", title: "Lockers 1 dollar", icon: require("../../../assets/images/Icons/Lockers_1_dollar.png"), top: "42.5%", left: "45.0%", width: 30, height: 30 },
      { id: "c_stage", title: "Community stage", icon: require("../../../assets/images/Icons/Community_stage.png"), top: "41.5%", left: "36.5%", width: 35, height: 35 },
      { id: "c_experience", title: "Cloud community experience", icon: require("../../../assets/images/Icons/Cloud_community_experience.png"), top: "33.5%", left: "37.5%", width: 35, height: 35 },
      { id: "elev_f1", title: "Elevator", icon: require("../../../assets/images/Icons/Elevator.png"), top: "34.5%", left: "41.5%", width: 35, height: 35 },
      { id: "wash_men_f1", title: "Men's Washrooms", icon: require("../../../assets/images/Icons/Washrooms.png"), top: "43.0%", left: "49.5%", width: 25, height: 25 },
      { id: "wash_women_f1", title: "Women's Washrooms", icon: require("../../../assets/images/Icons/Washrooms.png"), top: "43.0%", left: "52.0%", width: 25, height: 25 }
    ],
    floor2: [
        { id: "main_stage", title: "Main stage", icon: require("../../../assets/images/Icons/Main_stage.png"), top: "54.0%", left: "65.5%", width: 40, height: 40 },
       { id: "cloud_chamber", title: "Cloud chamber", icon: require("../../../assets/images/Icons/Cloud_chamber.png"), top: "30.5%", left: "47.5%", width: 40, height: 40 },
    ],
  }), []);

  // اصلاح ارجاع به allMarkers
  const currentMarkers = floor === 1 ? allMarkers.floor1 : allMarkers.floor2;


  // تابع به دست آوردن مختصات برای جایگذاری مارکرهای جدید
  const handleMapPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const topPercent = ((locationY / MAP_HEIGHT) * 100).toFixed(2);
    const leftPercent = ((locationX / screenWidth) * 100).toFixed(2);
    
    console.log("--- New Marker Coordinates ---");
    console.log(`top: "${topPercent}%", left: "${leftPercent}%"`);
    console.log("------------------------------");
    
    // وقتی جای خالی کلیک می‌شود، فوکوس قبلی حذف شود
    setActiveMarkerId(null);
  };

  const focusOnMarker = (marker: MarkerType) => {
    setActiveMarkerId(marker.id);
    const topPos = (parseFloat(marker.top) / 100) * MAP_HEIGHT;
    const leftPos = (parseFloat(marker.left) / 100) * screenWidth;

    scrollRef.current?.scrollTo({
      x: leftPos - screenWidth / 2 + marker.width / 2,
      y: topPos - 200, 
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        maximumZoomScale={5}
        minimumZoomScale={1}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableWithoutFeedback onPress={handleMapPress}>
          <View>
            <ImageBackground
              source={floor === 1 ? require("../../../assets/images/floor-1.png") : require("../../../assets/images/floor-2.png")}
              style={styles.mapImage}
              resizeMode="contain"
            >
              {currentMarkers.map((marker) => (
                <TouchableOpacity 
                  key={marker.id} 
                  onPress={() => focusOnMarker(marker)}
                  style={[styles.markerTouchable, { top: marker.top as any, left: marker.left as any, width: marker.width, height: marker.height }]}
                >
                  <AnimatedMarker marker={marker} isActive={activeMarkerId === marker.id} />
                </TouchableOpacity>
              ))}
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Legend Area */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Map Legend (Click to Find)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {currentMarkers.map((marker) => (
            <TouchableOpacity
              key={marker.id}
              style={[styles.legendItem, activeMarkerId === marker.id && styles.activeLegendItem]}
              onPress={() => focusOnMarker(marker)}
            >
              <Image source={marker.icon} style={[styles.legendIcon, activeMarkerId === marker.id && { tintColor: '#1e90ff' }]} />
              <Text style={[styles.legendText, activeMarkerId === marker.id && styles.activeLegendText]}>{marker.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => { setFloor(1); setActiveMarkerId(null); }} style={[styles.tab, floor === 1 && styles.activeTab]}>
          <Text style={floor === 1 ? styles.activeTabText : styles.tabText}>Level 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setFloor(2); setActiveMarkerId(null); }} style={[styles.tab, floor === 2 && styles.activeTab]}>
          <Text style={floor === 2 ? styles.activeTabText : styles.tabText}>Level 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1 },
  mapImage: { width: screenWidth, height: MAP_HEIGHT },
  markerTouchable: { position: 'absolute', zIndex: 10 },
  markerContainer: { alignItems: "center", justifyContent: "center" },
  fullIcon: { width: "100%", height: "100%" },
  legendContainer: { padding: 15, backgroundColor: '#f9f9f9', borderTopWidth: 1, borderColor: '#eee' },
  legendTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 8, color: '#666' },
  legendItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 8, borderRadius: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd' },
  activeLegendItem: { borderColor: '#1e90ff', backgroundColor: '#e6f2ff' },
  legendIcon: { width: 18, height: 18, marginRight: 6 },
  legendText: { fontSize: 11, color: '#444' },
  activeLegendText: { color: '#1e90ff', fontWeight: 'bold' },
  tabContainer: { flexDirection: "row", paddingVertical: 15, justifyContent: "center", backgroundColor: '#fff' },
  tab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 15, backgroundColor: "#f1f2f6", marginHorizontal: 5 },
  activeTab: { backgroundColor: "#1e90ff" },
  tabText: { color: "#57606f", fontWeight: "600" },
  activeTabText: { color: "#fff", fontWeight: "bold" },
});