/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AddNewEngineerScreen from "../screens/TabOne/AddNewEngineerScreen";
import EditEngineerScreen from "../screens/TabOne/EditEngineerScreen";
import TabOneScreen from "../screens/TabOne/TabOneScreen";
import AssignShiftScreen from "../screens/TabTwo/AssignShiftScreen";
import CreateShiftScreen from "../screens/TabTwo/CreateShiftScreen";
import TabTwoScreen from "../screens/TabTwo/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="EngineersList"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="EngineersList"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 10 }}>Engineers List</Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 10 }}>Engineers Shifts</Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Engineers" }}
      />
      <TabOneStack.Screen
        name="EditEngineerScreen"
        component={EditEngineerScreen}
        options={{ headerTitle: "Engineer Profile" }}
      />
      <TabOneStack.Screen
        name="AddNewEngineer"
        component={AddNewEngineerScreen}
        options={{ headerTitle: "Add a new engineer" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Engineers Shifts" }}
      />
      <TabTwoStack.Screen
        name="CreateShift"
        component={CreateShiftScreen}
        options={{ headerTitle: "Create shift" }}
      />
      <TabTwoStack.Screen
        name="AssignShift"
        component={AssignShiftScreen}
        options={{ headerTitle: "Assign shift" }}
      />
    </TabTwoStack.Navigator>
  );
}
