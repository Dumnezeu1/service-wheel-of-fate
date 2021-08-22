import * as React from "react";

import EnginerShiftsTopTabs from "../../navigation/EnginerShiftsTopTabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const createNewShift = () => {
    navigation.navigate("CreateShift");
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.newShiftContainer} onPress={createNewShift}>
        <Text>Add new shift</Text>

        <View style={[styles.actionButton]}>
          <MaterialIcons name="add" color={"black"} size={20} />
        </View>
      </Pressable>
      <EnginerShiftsTopTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  newShiftContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "rgba(229, 229, 229,1)",
    padding: 5,
    borderRadius: 5,
    height: 30,
    width: 30,
  },
});
