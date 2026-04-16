import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
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

// --- کامپوننت مارکر متحرک روی نقشه ---
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
      <Image source={marker.icon} style={styles.fullIcon} resizeMode="contain" />
    </Animated.View>
  );
};

// --- کامپوننت آیتم لگند با قابلیت تشخیص موقعیت و افکت هوور ---
const LegendItem = ({ 
  marker, 
  isActive, 
  onPress, 
  onLayout 
}: { 
  marker: MarkerType, 
  isActive: boolean, 
  onPress: () => void,
  onLayout: (y: number) => void 
}) => {
  const hoverValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const activeOrHover = hoverValue.value === 1 || isActive;
    return {
      backgroundColor: withTiming(isActive ? 'rgba(30, 144, 255, 0.1)' : (hoverValue.value === 1 ? 'rgba(30, 144, 255, 0.05)' : '#fff'), { duration: 200 }),
      borderColor: withTiming(activeOrHover ? '#1e90ff' : '#ddd', { duration: 200 }),
      shadowOpacity: withTiming(hoverValue.value === 1 ? 0.3 : 0, { duration: 200 }),
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onLayout={(event) => onLayout(event.nativeEvent.layout.y)}
      style={styles.legendItemWrapper}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: () => (hoverValue.value = 1),
        onMouseLeave: () => (hoverValue.value = 0),
      } : {
        onPressIn: () => (hoverValue.value = 1),
        onPressOut: () => (hoverValue.value = 0),
      })}
    >
      <Animated.View style={[styles.legendItem, animatedStyle]}>
        <Image source={marker.icon} style={styles.legendIcon} />
        <Text style={[styles.legendText, isActive && styles.activeLegendText]} numberOfLines={1}>
          {marker.title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function MapScreen() {
  const [floor, setFloor] = useState(1);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  
  const mapScrollRef = useRef<ScrollView>(null);
  const legendScrollRef = useRef<ScrollView>(null);
  const itemPositions = useRef<{ [key: string]: number }>({});

  const allMarkers = React.useMemo(() => ({
    floor1: [
      { id: "v_lounge",
        title: "Volunteers lounge",
        icon: require("../../../assets/images/Icons/Volunteers_lounge_restricted_access.png"),
        top: "47.22%",
        left: "18.70%",
        width: 25,
        height: 25
      },
      { id: "s_lounge",
        title: "Speakers lounge",
        icon: require("../../../assets/images/Icons/Speakers_lounge_restricted_access.png"),
        top: "48.68%",
        left: "9.72%",
        width: 25,
        height: 25
      },
      { id: "c_lounge",
        title: "Community lounge",
        icon: require("../../../assets/images/Icons/Community_lounge_food_and_drinks.png"),
        top: "58.75%",
        left: "16.20%",
        width: 25,
        height: 25
      },
      { id: "water_f1",
        title: "Water refill station",
        icon: require("../../../assets/images/Icons/Water_refill_station.png"),
        top: "58.93%", left: "41.20%",
        width: 20,
        height: 20
      },
      { id: "reg_tickets",
        title: "Registration and tickets",
        icon: require("../../../assets/images/Icons/Registration_and_tickets.png"),
        top: "45.66%",
        left: "72.68%",
        width: 20,
        height: 20
      },
      // { id: "venue_map_f1", title: "Venue map and schedule", icon: require("../../../assets/images/Icons/Venue_map_and_schedule.png"), top: "40.5%", left: "39.5%", width: 35, height: 35 },
      { 
        id: "entrance",
        title: "Entrance and exit",
        icon: require("../../../assets/images/Icons/Enterance_and_exit.png"),
        top: "50.91%",
        left: "78.70%",
        width: 25,
        height: 25
      },
      { id: "lockers_f1",
        title: "Lockers 1 dollar",
        icon: require("../../../assets/images/Icons/Lockers_1_dollar.png"),
        top: "58.08%",
        left: "35.85%",
        width: 20,
        height: 20
      },
      { id: "c_stage",
        title: "Community stage",
        icon: require("../../../assets/images/Icons/Community_stage.png"),
        top: "53.32%", left: "26.50%",
        width: 25,
        height: 25 
      },
      { id: "c_experience",
        title: "Cloud community experience",
        icon: require("../../../assets/images/Icons/Cloud_community_experience.png"),
        top: "49.75%", left: "25.74%",
        width: 20,
        height: 20
      },
      { id: "elev_f1_1",
        title: "Elevator first",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "50.86%",
        left: "30.20%",
        width: 20,
        height: 20
      },
      { id: "elev_f1_2",
        title: "Elevator second",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "47.94%", left: "60.11%",
        width: 20,
        height: 20
      },

      { id: "wash_men_f1",
        title: "Men's Washrooms",
        icon: require("../../../assets/images/Icons/Washrooms.png"),
        top: "55.66%", left: "40.76%",
        width: 20,
        height: 20 
      },
      { 
        id: "wash_women_f1",
        title: "Women's Washrooms",
        icon: require("../../../assets/images/Icons/Washrooms.png"),
        top: "55.03%", left: "45.94%",
        width: 20,
        height: 20
      }
    ],
    floor2: [
      {
        id: "main_stage",
        title: "Main stage",
        icon: require("../../../assets/images/Icons/Main_stage.png"),
        top: "58.01%",
        left: "51.59%",
        width: 25,
        height: 25
      },
      { id: "cloud_chamber",
        title: "Cloud chamber",
        icon: require("../../../assets/images/Icons/Cloud_chamber.png"),
        top: "40.79%",
        left: "26.57%",
        width: 25,
        height: 25
      },

      {
        id: "ai_exp",
        title: "Artificial Intelligence experience",
        icon: require("../../../assets/images/Icons/Artifical_Intelligence_experience.png"),
        top: "42.760%",
        left: "21.50%",
        width: 25,
        height: 25
      },
      
      
      { id: "hackathon_room",
        title: "Hackathon teams room",
        icon: require("../../../assets/images/Icons/Hackathon_teams_room.png"),
        top: "40.7%",
        left: "39.37%",
        width: 25,
        height: 25
       },
      { id: "sound_exp",
        title: "Sound and visual experience",
        icon: require("../../../assets/images/Icons/Sound_and_visual_experience.png"),
        top: "45.24%",
        left: "29.26%",
        width: 20,
        height: 20
      },
      { id: "venue_map_f2_1",
        title: "Venue map/schedule first",
        icon: require("../../../assets/images/Icons/Venue_map_and_schedule.png"),
        top: "47.82%", left: "27.20%",
        width: 20,
        height: 20 
      },
      
      { id: "venue_map_f2_2",
        title: "Venue map/schedule second",
        icon: require("../../../assets/images/Icons/Venue_map_and_schedule.png"),
        top: "51.82%", left: "42.20%",
        width: 20,
        height: 20 
      },

      { 
        id: "cloud_security",
        title: "Cloud security experience",
        icon: require("../../../assets/images/Icons/Cloud_security_experience.png"),
        top: "57.08%",
        left: "37%",
        width: 20,
        height: 20 
      },
      { 
        id: "water_f2",
        title: "Water refill station",
        icon: require("../../../assets/images/Icons/Water_refill_station.png"),
        top: "46%",
        left: "53.8%",
        width: 20,
        height: 20
      },
      { 
        id: "quiet_area",
        title: "Quiet area to take phone calls",
        icon: require("../../../assets/images/Icons/Quiet_area_to_take_phone_calls.png"),
        top: "47.40%",
        left: "60.74%",
        width: 25,
        height: 25
      },
      { id: "lockers_f2",
        title: "Lockers 1 dollar",
        icon: require("../../../assets/images/Icons/Lockers_1_dollar.png"),
        top: "52.81%", 
        left: "44.55%",
        width: 23,
        height: 23 
      },
      { id: "no_food",
        title: "No food or drink allowed",
        icon: require("../../../assets/images/Icons/No_food_or_drink_allowed.png"),
        top: "45.%",
        left: "35.74%",
        width: 20,
        height: 20 
      },
      { 
        id: "after_party",
        title: "After party entrance",
        icon: require("../../../assets/images/Icons/After_party_enterance.png"),
        top: "58.27%",
        left: "29.26%",
        width: 25,
        height: 25
      },
      { id: "wash_men_f2",
        title: "Men's Washrooms",
        icon: require("../../../assets/images/Icons/Washrooms.png"),
        top: "48.01%",
        left: "43%",
        width: 25,
        height: 25
      },
      { id: "wash_women_f2",
        title: "Women's Washrooms",
        icon: require("../../../assets/images/Icons/Washrooms.png"),
        top: "45.11%",
        left: "48.91%",
        width: 25,
        height: 25
      },
      { id: "elev_f2_1",
        title: "Elevator first",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "46.03%",
        left: "68.00%",
        width: 25,
        height: 25
      },
      { id: "elev_f2_2",
        title: "Elevator second",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "49.41%", left: "35.81%",
        width: 25,
        height: 25
      },

    ],
  }), []);

  const currentMarkers = floor === 1 ? allMarkers.floor1 : allMarkers.floor2;

  const focusOnMarker = (marker: MarkerType) => {
    setActiveMarkerId(marker.id);
    
    // ۱. اسکرول نقشه به سمت مارکر
    const topPos = (parseFloat(marker.top) / 100) * MAP_HEIGHT;
    const leftPos = (parseFloat(marker.left) / 100) * screenWidth;
    mapScrollRef.current?.scrollTo({
      x: leftPos - screenWidth / 2 + marker.width / 2,
      y: topPos - 200,
      animated: true,
    });

    // ۲. اسکرول لگند به سمت آیتم مربوطه
    const itemY = itemPositions.current[marker.id];
    if (itemY !== undefined) {
      legendScrollRef.current?.scrollTo({
        y: itemY - 10, // کمی فاصله از بالا برای زیبایی
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {[1, 2].map((lvl) => (
          <TouchableOpacity 
            key={lvl}
            onPress={() => { setFloor(lvl); setActiveMarkerId(null); itemPositions.current = {}; }} 
            style={[styles.tab, floor === lvl && styles.activeTab]}
          >
            <Text style={floor === lvl ? styles.activeTabText : styles.tabText}>Level {lvl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Map */}
      <ScrollView ref={mapScrollRef} maximumZoomScale={5} minimumZoomScale={1} contentContainerStyle={styles.scrollContent}>
        <TouchableWithoutFeedback onPress={() => setActiveMarkerId(null)}>
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
        <Text style={styles.legendTitle}>Tap to find • Scroll for more</Text>
        <ScrollView ref={legendScrollRef} style={styles.legendScrollArea} showsVerticalScrollIndicator={true}>
          <View style={styles.legendList}>
            {currentMarkers.map((marker) => (
              <LegendItem
                key={marker.id}
                marker={marker}
                isActive={activeMarkerId === marker.id}
                onPress={() => focusOnMarker(marker)}
                onLayout={(y) => { itemPositions.current[marker.id] = y; }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  scrollContent: { flexGrow: 1 },
  mapImage: { width: screenWidth, height: MAP_HEIGHT },
  markerTouchable: { position: 'absolute', zIndex: 10 },
  markerContainer: { alignItems: "center", justifyContent: "center" },
  fullIcon: { width: "100%", height: "100%" },

  legendContainer: { padding: 15, backgroundColor: '#f9f9f9', borderTopWidth: 1, borderColor: '#eee', paddingBottom: 10 },
  legendTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 12, color: '#666' },
  legendScrollArea: { maxHeight: 210 }, 
  legendList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  legendItemWrapper: { width: '48.5%', marginBottom: 8 },
  legendItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 8, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#ddd',
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  legendIcon: { width: 18, height: 18, marginRight: 6 },
  legendText: { fontSize: 10, color: '#444', flex: 1 },
  activeLegendText: { color: '#1e90ff', fontWeight: 'bold' },

  tabContainer: { flexDirection: "row", paddingVertical: 15, justifyContent: "center", backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#f0f0f0' },
  tab: { paddingHorizontal: 25, paddingVertical: 10, borderRadius: 20, backgroundColor: "#f1f2f6", marginHorizontal: 8 },
  activeTab: { backgroundColor: "#1e90ff" },
  tabText: { color: "#57606f", fontWeight: "600" },
  activeTabText: { color: "#fff", fontWeight: "bold" },
});