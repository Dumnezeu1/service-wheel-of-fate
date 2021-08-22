import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { toastCustom } from "../../components/ToastCustom";
import Colors from "../../constants/Colors";
import {
  EngineersShiftsType,
  useGlobalContext,
} from "../../context/globalContext";
import { SelectedEngineersType } from "./CreateShiftScreen";

interface EditEngineerScreenProps {
  route: {
    params: {
      shiftDate: Date;
      selectedEngineers: SelectedEngineersType[];
    };
  };
}

function AssignShiftScreen({ route }: EditEngineerScreenProps) {
  const navigation = useNavigation();
  const { shiftDate, selectedEngineers } = route.params;

  const [engineersData, setEngineersData] = useGlobalContext();

  const [shifts, setShifts] = useState(["first", "second"]);

  const switchShifts = () => {
    const reverseShifts = shifts.slice().reverse();
    setShifts(reverseShifts);
  };

  const createShift = () => {
    const shiftArray: EngineersShiftsType[] = [
      {
        engineerId: selectedEngineers[0].engineerId,
        day: selectedEngineers[0].shiftDate,
        hour: shifts[0],
      },
      {
        engineerId: selectedEngineers[1].engineerId,
        day: selectedEngineers[1].shiftDate,
        hour: shifts[1],
      },
    ];
    setEngineersData((prev) => {
      return {
        ...prev,
        engineersShifts: [...prev.engineersShifts, ...shiftArray],
      };
    });
    toastCustom({
      type: "success",
      text: "Shift created",
    });

    navigation.navigate("TabTwoScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedDateContainer}>
        <Text>Selected Date: </Text>
        <Text>{moment(shiftDate).format("DD MMM")}</Text>
      </View>

      {selectedEngineers?.map(
        ({ engineerId, engineerName, engineerAvatar }, index) => {
          return (
            <View
              key={engineerId}
              style={[
                styles.engineerItemContainer,
                {
                  backgroundColor: "white",
                },
              ]}
            >
              <View style={styles.itemsContainer}>
                <Image
                  source={{
                    uri: engineerAvatar,
                  }}
                  style={styles.avatar}
                />
                <Text>{engineerName}</Text>
              </View>

              <SwitchShifts
                shifts={shifts}
                switchShifts={switchShifts}
                index={index}
              />
            </View>
          );
        }
      )}
      <Pressable
        style={[styles.selectDateButton, { marginTop: 10 }]}
        onPress={createShift}
      >
        <Text style={{ color: "white" }}>Create shift</Text>
      </Pressable>
    </View>
  );
}

const SwitchShifts = ({
  shifts,
  switchShifts,
  index,
}: {
  shifts: string[];
  switchShifts: () => void;
  index: number;
}) => {
  return (
    <View style={styles.shiftButtonsContainer}>
      <Pressable
        style={[
          styles.shiftButton,
          {
            backgroundColor:
              shifts[index] === "first"
                ? Colors.light.tint
                : "rgba(229, 229, 229, 1)",
          },
        ]}
        onPress={switchShifts}
      >
        <Text style={{ color: shifts[index] === "first" ? "white" : "black" }}>
          First
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.shiftButton,
          {
            backgroundColor:
              shifts[index] === "second"
                ? Colors.light.tint
                : "rgba(229, 229, 229, 1)",
          },
        ]}
        onPress={switchShifts}
      >
        <Text style={{ color: shifts[index] === "second" ? "white" : "black" }}>
          Second
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  selectedDateContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(229, 229, 229, 1)",
    height: 40,
    borderRadius: 5,
  },
  itemsContainer: { flexDirection: "row", alignItems: "center" },
  engineerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 5,
  },
  avatar: { width: 40, height: 40, marginRight: 10, borderRadius: 5 },
  shiftButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  shiftButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    padding: 10,
    minWidth: 100,
  },
  selectDateButton: {
    backgroundColor: Colors.light.tint,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AssignShiftScreen;
