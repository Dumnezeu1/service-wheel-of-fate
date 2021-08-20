import * as React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ShiftsListScreen from "./ShiftsListScreen";
import CarrouselViewScreen from "./CarrouselViewScreen";
import CalendarScreen from "./CalendarScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabTwoScreen() {
  return (
    <Tab.Navigator
      initialRouteName="ShiftsListScreen"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "rgba(229, 229, 229,1)" },
      }}
    >
      <Tab.Screen
        name="ShiftsListScreen"
        component={ShiftsListScreen}
        options={{
          tabBarLabel: "List",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="CarrouselViewScreen"
        component={CarrouselViewScreen}
        options={{
          tabBarLabel: "Carousel",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="CalendarViewScreen"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}
