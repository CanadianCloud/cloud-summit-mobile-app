import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { COLORS } from "@/theme/colors";

// جلوگیری از مخفی شدن خودکار اسپلش اسکرین تا زمان لود کامل فونت‌ها
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "SquadaOne-Regular": require("../../../assets/fonts/SquadaOne-Regular.ttf"),
    "NotoSans-Medium": require("../../../assets/fonts/NotoSans-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      // به محض لود شدن فونت‌ها یا بروز خطا، اسپلش اسکرین را مخفی کن
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // اگر فونت‌ها هنوز لود نشده‌اند و خطایی هم رخ نداده، چیزی رندر نکن
  if (!loaded && !error) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.panelDark },
        headerTintColor: "rgba(255,255,255,0.9)",
        headerTitleStyle: {
          fontWeight: "600",
          fontFamily: "NotoSans-Medium", // اعمال فونت بدنه به هدرها
        },
        tabBarStyle: {
          backgroundColor: COLORS.appMenu,
          borderTopColor: "rgba(255,255,255,0.10)",
        },
        tabBarActiveTintColor: "#60A5FA",
        tabBarInactiveTintColor: "rgba(255,255,255,0.55)",
        tabBarLabelStyle: {
          fontFamily: "NotoSans-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="calendar-today" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="map" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="bookmark-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="about" // نام فایل اسکرین شما
        options={{
          title: "About",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="info-outline" color={color} />
          ),
          headerShown: false, // این خط باعث حذف هدر خودکار بالای صفحه می‌شود
        }}
      />
      {/* اسکرین‌های دیگر در صورت وجود به طور خودکار شناسایی می‌شوند */}
    </Tabs>
  );
}
