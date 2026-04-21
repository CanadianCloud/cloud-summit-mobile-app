import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@/components/AppText';
import { COLORS } from '@/theme/colors';
import { TYPOGRAPHY } from '@/theme/typography';

const { width: screenWidth } = Dimensions.get('window');
// floor-1.png / floor-2.png are 2544×1903 → aspect ratio ≈ 0.748
const MAP_HEIGHT = screenWidth * 0.748;

interface MarkerType {
  id: string;
  title: string;
  subtitle?: string;
  top: string;
  left: string;
  icon: any;
  width: number;
  height: number;
}

const AnimatedMarker = ({
  marker,
  isActive,
}: {
  marker: MarkerType;
  isActive: boolean;
}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-15, { duration: 300 }),
          withTiming(0, { duration: 300 }),
        ),
        -1,
        true,
      );
    } else {
      translateY.value = withTiming(0);
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.markerContainer,
        { width: marker.width, height: marker.height },
        animatedStyle,
      ]}>
      <Image
        source={marker.icon}
        style={styles.fullIcon}
        resizeMode='contain'
      />
    </Animated.View>
  );
};

const LegendItem = ({
  marker,
  isActive,
  onPress,
  onLayout,
}: {
  marker: MarkerType;
  isActive: boolean;
  onPress: () => void;
  onLayout: (y: number) => void;
}) => {
  const hoverValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const activeOrHover = hoverValue.value === 1 || isActive;
    return {
      backgroundColor: withTiming(
        isActive
          ? 'rgba(30, 144, 255, 0.1)'
          : hoverValue.value === 1
            ? 'rgba(30, 144, 255, 0.05)'
            : COLORS.panelDark,
        { duration: 200 },
      ),
      borderColor: withTiming(
        activeOrHover ? '#1e90ff' : 'rgba(255,255,255,0.12)',
        {
          duration: 200,
        },
      ),
      shadowOpacity: withTiming(hoverValue.value === 1 ? 0.3 : 0, {
        duration: 200,
      }),
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onLayout={(event) => onLayout(event.nativeEvent.layout.y)}
      style={styles.legendItemWrapper}
      {...(Platform.OS === 'web'
        ? {
            onMouseEnter: () => (hoverValue.value = 1),
            onMouseLeave: () => (hoverValue.value = 0),
          }
        : {
            onPressIn: () => (hoverValue.value = 1),
            onPressOut: () => (hoverValue.value = 0),
          })}>
      <Animated.View style={[styles.legendItem, animatedStyle]}>
        <Image source={marker.icon} style={styles.legendIcon} />
        <View style={styles.legendTextWrap}>
          <AppText
            style={[styles.legendText, isActive && styles.activeLegendText]}
            numberOfLines={1}>
            {marker.title}
          </AppText>
          {!!marker.subtitle && (
            <AppText style={styles.legendSubtext} numberOfLines={1}>
              {marker.subtitle}
            </AppText>
          )}
        </View>
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

  const allMarkers = React.useMemo(
    () => ({
      floor1: [
        // Row 1
        {
          id: 'v_lounge',
          title: 'Volunteers lounge',
          subtitle: 'restricted access',
          icon: require('../../../assets/images/Icons/Volunteers_lounge_restricted_access.png'),
          top: '42.22%',
          left: '18.70%',
          width: 25,
          height: 25,
        },
        {
          id: 'c_lounge',
          title: 'Community lounge',
          subtitle: 'food and drinks',
          icon: require('../../../assets/images/Icons/Community_lounge_food_and_drinks.png'),
          top: '66.75%',
          left: '15.20%',
          width: 25,
          height: 25,
        },
        // Row 2
        {
          id: 's_lounge',
          title: 'Speakers lounge',
          subtitle: 'restricted access',
          icon: require('../../../assets/images/Icons/Speakers_lounge_restricted_access.png'),
          top: '48.68%',
          left: '9.72%',
          width: 25,
          height: 25,
        },
        {
          id: 'water_f1',
          title: 'Water refill station',
          icon: require('../../../assets/images/Icons/Water_refill_station.png'),
          top: '70.93%',
          left: '41.20%',
          width: 20,
          height: 20,
        },
        // Row 3

        {
          id: 'reg_tickets',
          title: 'Registration and tickets',
          icon: require('../../../assets/images/Icons/Registration_and_tickets.png'),
          top: '42.66%',
          left: '71.68%',
          width: 20,
          height: 20,
        },
        // Row 4
        {
          id: 'venue_map_f1',
          title: 'Venue map and schedule',
          icon: require('../../../assets/images/Icons/Venue_map_and_schedule.png'),
          top: '41.5%',
          left: '74.68%',
          width: 20,
          height: 20,
        },
        {
          id: 'entrance',
          title: 'Entrance and exit',
          icon: require('../../../assets/images/Icons/Enterance_and_exit.png'),
          top: '52.91%',
          left: '78.70%',
          width: 25,
          height: 25,
        },
        // Row 5
        {
          id: 'lockers_f1',
          title: 'Lockers 1 dollar',
          subtitle: '$1',
          icon: require('../../../assets/images/Icons/Lockers_1_dollar.png'),
          top: '67.08%',
          left: '36.85%',
          width: 20,
          height: 20,
        },
        {
          id: 'c_stage',
          title: 'Community stage',
          icon: require('../../../assets/images/Icons/Community_stage.png'),
          top: '57.32%',
          left: '26.50%',
          width: 25,
          height: 25,
        },
        // Row 6
        {
          id: 'elev_f1_1',
          title: 'Elevator first',
          icon: require('../../../assets/images/Icons/Elevator.png'),
          top: '50.86%',
          left: '30.20%',
          width: 20,
          height: 20,
        },
        {
          id: 'elev_f1_2',
          title: 'Elevator second',
          icon: require('../../../assets/images/Icons/Elevator.png'),
          top: '43.94%',
          left: '60.11%',
          width: 20,
          height: 20,
        },
        {
          id: 'c_experience',
          title: 'Cloud community experience',
          icon: require('../../../assets/images/Icons/Cloud_community_experience.png'),
          top: '50.75%',
          left: '26.74%',
          width: 20,
          height: 20,
        },
        {
          id: 'wash_men_f1',
          title: "Men's Washrooms",
          icon: require('../../../assets/images/Icons/Washrooms.png'),
          top: '60.66%',
          left: '40.76%',
          width: 20,
          height: 20,
        },
        // Extras (kept for map markers, shown at end of legend)
        {
          id: 'wash_women_f1',
          title: "Women's Washrooms",
          icon: require('../../../assets/images/Icons/Washrooms.png'),
          top: '60.03%',
          left: '44.94%',
          width: 20,
          height: 20,
        },
      ],
      floor2: [
        {
          id: 'ai_exp',
          title: 'Artificial Intelligence',
          subtitle: 'experience',
          icon: require('../../../assets/images/Icons/Artifical_Intelligence_experience.png'),
          top: '38.76%',
          left: '21.50%',
          width: 25,
          height: 25,
        },
        {
          id: 'no_food',
          title: 'No food or drink allowed',
          icon: require('../../../assets/images/Icons/No_food_or_drink_allowed.png'),
          top: '40%',
          left: '35.74%',
          width: 20,
          height: 20,
        },
        {
          id: 'water_f2',
          title: 'Water refill station',
          icon: require('../../../assets/images/Icons/Water_refill_station.png'),
          top: '43%',
          left: '53.8%',
          width: 20,
          height: 20,
        },
        {
          id: 'lockers_f2',
          title: 'Lockers',
          subtitle: '$1',
          icon: require('../../../assets/images/Icons/Lockers_1_dollar.png'),
          top: '56.81%',
          left: '44.55%',
          width: 23,
          height: 23,
        },
        {
          id: 'main_stage',
          title: 'Main stage',
          icon: require('../../../assets/images/Icons/Main_stage.png'),
          top: '66.01%',
          left: '51.59%',
          width: 25,
          height: 25,
        },
        {
          id: 'elev_f2_1',
          title: 'Elevator',
          icon: require('../../../assets/images/Icons/Elevator.png'),
          top: '42.03%',
          left: '68.00%',
          width: 25,
          height: 25,
        },
        {
          id: 'elev_f2_2',
          title: 'Elevator',
          icon: require('../../../assets/images/Icons/Elevator.png'),
          top: '49.41%',
          left: '35.81%',
          width: 25,
          height: 25,
        },
        {
          id: 'wash_men_f2',
          title: "Men's Washrooms",
          icon: require('../../../assets/images/Icons/Washrooms.png'),
          top: '44.01%',
          left: '43%',
          width: 25,
          height: 25,
        },
        {
          id: 'wash_women_f2',
          title: "Women's Washrooms",
          icon: require('../../../assets/images/Icons/Washrooms.png'),
          top: '40.11%',
          left: '48.91%',
          width: 25,
          height: 25,
        },

        // RIGHT COLUMN

        {
          id: 'sound_exp',
          title: 'Sound and visual',
          subtitle: 'experience',
          icon: require('../../../assets/images/Icons/Sound_and_visual_experience.png'),
          top: '42.24%',
          left: '29.26%',
          width: 20,
          height: 20,
        },
        {
          id: 'hackathon_room',
          title: 'Hackathon teams room',
          icon: require('../../../assets/images/Icons/Hackathon_teams_room.png'),
          top: '32.7%',
          left: '39.37%',
          width: 25,
          height: 25,
        },
        {
          id: 'venue_map_f2_1',
          title: 'Venue map and schedule',
          icon: require('../../../assets/images/Icons/Venue_map_and_schedule.png'),
          top: '47.82%',
          left: '27.20%',
          width: 20,
          height: 20,
        },
        {
          id: 'venue_map_f2_2',
          title: 'Venue map and schedule',
          icon: require('../../../assets/images/Icons/Venue_map_and_schedule.png'),
          top: '51.82%',
          left: '42.20%',
          width: 20,
          height: 20,
        },
        {
          id: 'quiet_area',
          title: 'Quiet area to take phone calls',
          icon: require('../../../assets/images/Icons/Quiet_area_to_take_phone_calls.png'),
          top: '43.40%',
          left: '60.74%',
          width: 25,
          height: 25,
        },
        {
          id: 'cloud_security',
          title: 'Cloud security',
          subtitle: 'experience',
          icon: require('../../../assets/images/Icons/Cloud_security_experience.png'),
          top: '66.08%',
          left: '37%',
          width: 20,
          height: 20,
        },
        {
          id: 'after_party',
          title: 'After party entrance',
          subtitle: 'restricted access',
          icon: require('../../../assets/images/Icons/After_party_enterance.png'),
          top: '65.27%',
          left: '29.26%',
          width: 25,
          height: 25,
        },
        {
          id: 'cloud_chamber',
          title: 'Cloud chamber',
          icon: require('../../../assets/images/Icons/Cloud_chamber.png'),
          top: '34.79%',
          left: '26.57%',
          width: 25,
          height: 25,
        },
      ],
    }),
    [],
  );

  const currentMarkers = floor === 1 ? allMarkers.floor1 : allMarkers.floor2;

  const focusOnMarker = (marker: MarkerType) => {
    setActiveMarkerId(marker.id);

    const topPos = (parseFloat(marker.top) / 100) * MAP_HEIGHT;
    const leftPos = (parseFloat(marker.left) / 100) * screenWidth;
    mapScrollRef.current?.scrollTo({
      x: leftPos - screenWidth / 2 + marker.width / 2,
      y: topPos - 200,
      animated: true,
    });

    const itemY = itemPositions.current[marker.id];
    if (itemY !== undefined) {
      legendScrollRef.current?.scrollTo({
        y: itemY - 10,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.container}>
      <View style={styles.header}>
        <AppText style={TYPOGRAPHY.screenHeader}>Map</AppText>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {[1, 2].map((lvl) => (
          <TouchableOpacity
            key={lvl}
            onPress={() => {
              setFloor(lvl);
              setActiveMarkerId(null);
              itemPositions.current = {};
            }}
            style={[styles.tab, floor === lvl && styles.activeTab]}>
            <AppText
              style={floor === lvl ? styles.activeTabText : styles.tabText}>
              Floor {lvl}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Map */}
      <ScrollView
        ref={mapScrollRef}
        maximumZoomScale={5}
        minimumZoomScale={1}
        contentContainerStyle={styles.scrollContent}>
        <TouchableWithoutFeedback onPress={() => setActiveMarkerId(null)}>
          <View>
            <ImageBackground
              source={
                floor === 1
                  ? require('../../../assets/images/floor-1.png')
                  : require('../../../assets/images/floor-2.png')
              }
              style={styles.mapImage}
              resizeMode='contain'>
              {currentMarkers.map((marker) => (
                <TouchableOpacity
                  key={marker.id}
                  onPress={() => focusOnMarker(marker)}
                  style={[
                    styles.markerTouchable,
                    {
                      top: marker.top as any,
                      left: marker.left as any,
                      width: marker.width,
                      height: marker.height,
                    },
                  ]}>
                  <AnimatedMarker
                    marker={marker}
                    isActive={activeMarkerId === marker.id}
                  />
                </TouchableOpacity>
              ))}
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Legend Area */}
      <View style={styles.legendContainer}>
        <AppText style={styles.legendTitle}>
          Tap to find • Scroll for more
        </AppText>
        <ScrollView
          ref={legendScrollRef}
          style={styles.legendScrollArea}
          showsVerticalScrollIndicator={true}>
          <View style={styles.legendList}>
            {currentMarkers.map((marker) => (
              <LegendItem
                key={marker.id}
                marker={marker}
                isActive={activeMarkerId === marker.id}
                onPress={() => focusOnMarker(marker)}
                onLayout={(y) => {
                  itemPositions.current[marker.id] = y;
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.appBg },
  header: {
    backgroundColor: COLORS.headerBlue,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  scrollContent: { flexGrow: 1 },
  mapImage: { width: screenWidth, height: MAP_HEIGHT },
  markerTouchable: { position: 'absolute', zIndex: 10 },
  markerContainer: { alignItems: 'center', justifyContent: 'center' },
  fullIcon: { width: '100%', height: '100%' },

  legendContainer: {
    padding: 15,
    backgroundColor: COLORS.appBg,
    borderTopWidth: 1,
    borderColor: COLORS.borderSubtle,
    paddingBottom: 0,
  },
  legendTitle: {
    ...TYPOGRAPHY.label,
    marginBottom: 12,
  },
  legendScrollArea: { maxHeight: 210 },
  legendList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItemWrapper: { width: '48.5%', marginBottom: 8 },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  legendIcon: { width: 18, height: 18, marginRight: 6 },
  legendTextWrap: { flex: 1 },
  legendText: { ...TYPOGRAPHY.bodyLarge, color: COLORS.textPrimary },
  legendSubtext: { ...TYPOGRAPHY.subtitle, marginTop: 2 },
  activeLegendText: { color: '#1e90ff', fontWeight: 'bold' },

  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.appBg,
    borderBottomWidth: 1,
    borderColor: COLORS.borderSubtle,
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: COLORS.panelDark,
    marginHorizontal: 8,
  },
  activeTab: { backgroundColor: COLORS.headerBlue },
  tabText: { ...TYPOGRAPHY.label, color: COLORS.textDim },
  activeTabText: { ...TYPOGRAPHY.label, color: COLORS.textPrimary },
});
