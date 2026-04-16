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
  View
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
        withSequence(
          withTiming(-15, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
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
        style={styles.fullIcon} // tintColor حذف شد تا رنگ اصلی حفظ شود
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default function MapScreen() {
  const [floor, setFloor] = useState(1);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const allMarkers = React.useMemo(() => ({
    floor1: [
      {
        id: "v_lounge",
        title: "Volunteers lounge",
        icon: require("../../../assets/images/Icons/Volunteers_lounge_restricted_access.png"),
        top: "47.22%",
        left: "18.70%",
        width: 25,
        height: 25
      },
      {
        id: "s_lounge",
        title: "Speakers lounge",
        icon: require("../../../assets/images/Icons/Speakers_lounge_restricted_access.png"),
        top: "48.68%",
        left: "9.72%",
        width: 25,
        height: 25
      },
      {
        id: "c_lounge",
        title: "Community lounge",
        icon: require("../../../assets/images/Icons/Community_lounge_food_and_drinks.png"),
        top: "58.75%",
        left: "16.20%",
        width: 25,
        height: 25
      },
      {
        id: "water_f1",
        title: "Water refill station",
        icon: require("../../../assets/images/Icons/Water_refill_station.png"),
        top: "58.93%", left: "41.20%",
        width: 20,
        height: 20
      },
      {
        id: "reg_tickets",
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
      {
        id: "lockers_f1",
        title: "Lockers 1 dollar",
        icon: require("../../../assets/images/Icons/Lockers_1_dollar.png"),
        top: "58.08%",
        left: "35.85%",
        width: 20,
        height: 20
      },
      {
        id: "c_stage",
        title: "Community stage",
        icon: require("../../../assets/images/Icons/Community_stage.png"),
        top: "53.32%", left: "26.50%",
        width: 25,
        height: 25
      },
      {
        id: "c_experience",
        title: "Cloud community experience",
        icon: require("../../../assets/images/Icons/Cloud_community_experience.png"),
        top: "49.75%", left: "25.74%",
        width: 20,
        height: 20
      },
      {
        id: "elev_f1_1",
        title: "Elevator Number 1",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "50.86%",
        left: "30.20%",
        width: 20,
        height: 20
      },
      {
        id: "elev_f1_2",
        title: "Elevator Number 2",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "47.94%", left: "60.11%",
        width: 20,
        height: 20
      },

      {
        id: "wash_men_f1",
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
      {
        id: "cloud_chamber",
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


      {
        id: "hackathon_room",
        title: "Hackathon teams room",
        icon: require("../../../assets/images/Icons/Hackathon_teams_room.png"),
        top: "40.7%",
        left: "39.37%",
        width: 25,
        height: 25
      },
      {
        id: "sound_exp",
        title: "Sound and visual experience",
        icon: require("../../../assets/images/Icons/Sound_and_visual_experience.png"),
        top: "45.24%",
        left: "29.26%",
        width: 20,
        height: 20
      },
      {
        id: "venue_map_f2",
        title: "Venue map and schedule",
        icon: require("../../../assets/images/Icons/Venue_map_and_schedule.png"),
        top: "51.2%",
        left: "42%",
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
      {
        id: "lockers_f2",
        title: "Lockers 1 dollar",
        icon: require("../../../assets/images/Icons/Lockers_1_dollar.png"),
        top: "52.81%",
        left: "44.55%",
        width: 23,
        height: 23
      },
      {
        id: "no_food",
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
      {
        id: "wash_men_f2",
        title: "Men's Washrooms",
        icon: require("../../../assets/images/Icons/Washrooms.png"),
        top: "48.01%",
        left: "43%",
        width: 25,
        height: 25
      },
      {
        id: "wash_women_f2",
        title: "Women's Washrooms",
        icon: require("../../../assets/images/Icons/Washrooms.png"),
        top: "45.11%",
        left: "48.91%",
        width: 25,
        height: 25
      },
      {
        id: "elev_f2_1",
        title: "Elevator Number 1",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "46.03%",
        left: "68.00%",
        width: 25,
        height: 25
      },
      {
        id: "elev_f2_2",
        title: "Elevator Number 2",
        icon: require("../../../assets/images/Icons/Elevator.png"),
        top: "49.41%", left: "35.81%",
        width: 25,
        height: 25
      },

    ],
  }), []);

  const currentMarkers = floor === 1 ? allMarkers.floor1 : allMarkers.floor2;

  const handleMapPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const topPercent = ((locationY / MAP_HEIGHT) * 100).toFixed(2);
    const leftPercent = ((locationX / screenWidth) * 100).toFixed(2);
    console.log(`top: "${topPercent}%", left: "${leftPercent}%"`);
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
      {/* Tabs (At the top) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => { setFloor(1); setActiveMarkerId(null); }}
          style={[styles.tab, floor === 1 && styles.activeTab]}
        >
          <Text style={floor === 1 ? styles.activeTabText : styles.tabText}>Level 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setFloor(2); setActiveMarkerId(null); }}
          style={[styles.tab, floor === 2 && styles.activeTab]}
        >
          <Text style={floor === 2 ? styles.activeTabText : styles.tabText}>Level 2</Text>
        </TouchableOpacity>
      </View>

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

      {/* Legend Area (Bottom) */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Tap to find • Scroll for more</Text>

        {/* اضافه کردن اسکرول عمودی با ارتفاع محدود */}
        <ScrollView
          style={styles.legendScrollArea}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.legendList}>
            {currentMarkers.map((marker) => (
              <TouchableOpacity
                key={marker.id}
                style={[
                  styles.legendItem,
                  activeMarkerId === marker.id && styles.activeLegendItem
                ]}
                onPress={() => focusOnMarker(marker)}
              >
                <Image
                  source={marker.icon}
                  style={styles.legendIcon}
                />
                <Text
                  style={[styles.legendText, activeMarkerId === marker.id && styles.activeLegendText]}
                  numberOfLines={1}
                >
                  {marker.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // محفظه اصلی صفحه
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    paddingTop: 40 
  },

  // استایل اسکرول ویو نقشه
  scrollContent: { 
    flexGrow: 1 
  },

  // تصویر نقشه
  mapImage: { 
    width: screenWidth, 
    height: MAP_HEIGHT 
  },

  // تاچ‌بل‌های روی نقشه (مارکرها)
  markerTouchable: { 
    position: 'absolute', 
    zIndex: 10 
  },

  // کانتینر داخلی انیمیشن مارکر
  markerContainer: { 
    alignItems: "center", 
    justifyContent: "center" 
  },

  // آیکون مارکر
  fullIcon: { 
    width: "100%", 
    height: "100%" 
  },

  // --- بخش Legend (پایین صفحه) ---
  legendContainer: { 
    padding: 15, 
    backgroundColor: '#f9f9f9', 
    borderTopWidth: 1, 
    borderColor: '#eee',
    paddingBottom: 10,
  },

  legendTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    color: '#666' 
  },

  // ایجاد محدودیت ارتفاع برای ۵ ردیف و قابلیت اسکرول
  legendScrollArea: {
    maxHeight: 210, 
  },

  // چیدمان دو ستونی آیتم‌ها
  legendList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },

  // هر آیتم در لیست لگند
  legendItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 8, 
    borderRadius: 10, 
    marginBottom: 8, 
    borderWidth: 1, 
    borderColor: '#ddd',
    width: '48.5%', // اختصاص فضا برای دو ستون
  },

  activeLegendItem: { 
    borderColor: '#1e90ff', 
    backgroundColor: '#e6f2ff' 
  },

  legendIcon: { 
    width: 18, 
    height: 18, 
    marginRight: 6 
  },

  legendText: { 
    fontSize: 10, 
    color: '#444', 
    flex: 1 
  },

  activeLegendText: { 
    color: '#1e90ff', 
    fontWeight: 'bold' 
  },

  // --- استایل‌های تب (Level 1 / Level 2) ---
  tabContainer: { 
    flexDirection: "row", 
    paddingVertical: 15, 
    justifyContent: "center", 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderColor: '#f0f0f0' 
  },

  tab: { 
    paddingHorizontal: 25, 
    paddingVertical: 10, 
    borderRadius: 20, 
    backgroundColor: "#f1f2f6", 
    marginHorizontal: 8 
  },

  activeTab: { 
    backgroundColor: "#1e90ff" 
  },

  tabText: { 
    color: "#57606f", 
    fontWeight: "600" 
  },

  activeTabText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
});