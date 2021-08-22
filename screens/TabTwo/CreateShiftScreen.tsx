import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Text } from "react-native";
import {
  EnginnersDataType,
  useGlobalContext,
} from "../../context/globalContext";
import Colors from "../../constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { toastCustom } from "../../components/ToastCustom";

export interface SelectedEngineersType {
  engineerId: number;
  engineerName: string;
  engineerAvatar: string;
}

export const CreateShiftScreen = () => {
  const navigation = useNavigation();

  const [engineersData, setEngineersData] = useGlobalContext();

  const [shiftDate, setShiftDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [selectedEngineers, setSelectedEngineers] = useState<
    SelectedEngineersType[]
  >([]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || shiftDate;
    setShow(Platform.OS === "ios");
    setSelectedEngineers([]);
    setShiftDate(currentDate);
  };

  const showPicker = () => {
    setShow(true);
  };

  const goToAssignShift = () => {
    if (shiftDate && selectedEngineers.length === 2) {
      navigation.navigate("AssignShift", {
        shiftDate,
        selectedEngineers,
      });
    } else {
      toastCustom({
        type: "error",
        text: "Please select two engineers",
      });
    }
  };

  const Item = (engineerData: EnginnersDataType) => {
    const { id, name, avatar } = engineerData;

    const selectUser = () => {
      if (selectedEngineers.length < 2)
        setSelectedEngineers((prev) => [
          ...prev,
          {
            engineerId: id,
            engineerName: name,
            engineerAvatar: avatar,
          },
        ]);
      else {
        setSelectedEngineers((prev) => [
          prev[0],
          {
            engineerId: id,
            engineerName: name,
            engineerAvatar: avatar,
          },
        ]);
      }
    };

    const removeUser = () => {
      setSelectedEngineers((prev) =>
        prev.filter(({ engineerId }) => engineerId !== id)
      );
    };

    return (
      <View
        style={[
          styles.engineerItemContainer,
          {
            backgroundColor:
              selectedEngineers[0]?.engineerId === id ||
              selectedEngineers[1]?.engineerId === id
                ? Colors.light.tint
                : "white",
          },
        ]}
      >
        <View style={styles.itemsContainer}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.avatar}
          />
          <Text
            style={{
              color:
                selectedEngineers[0]?.engineerId === id ||
                selectedEngineers[1]?.engineerId === id
                  ? "white"
                  : "black",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={styles.itemsContainer}>
          {selectedEngineers[0]?.engineerId === id ||
          selectedEngineers[1]?.engineerId === id ? (
            <Pressable style={[styles.actionButton]} onPress={removeUser}>
              <FontAwesome name="remove" color={"black"} size={20} />
            </Pressable>
          ) : (
            <Pressable style={[styles.actionButton]} onPress={selectUser}>
              <AntDesign name="select1" color={"black"} size={20} />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  const getYesterDay = useMemo(() => {
    const nowDate = new Date(shiftDate);

    nowDate;

    nowDate.setDate(nowDate.getDate() - 1);

    return nowDate;
  }, [shiftDate]);

  const lastDayShifts = useMemo(() => {
    const getYesterDayShift = engineersData.engineersShifts.filter(
      ({ day }) => {
        return (
          moment(day).format("DD MMM") === moment(getYesterDay).format("DD MMM")
        );
      }
    );

    const getAvaibleEngineers = engineersData.engineersDataCx.filter(
      ({ id }) => {
        return getYesterDayShift.every(({ assignedEngineers }) => {
          return assignedEngineers.every(({ engineerId }) => engineerId !== id);
        });
      }
    );

    return getAvaibleEngineers;
  }, [getYesterDay, engineersData]);

  const existingShiftThisDay = useMemo(() => {
    const getYesterDayShift = engineersData.engineersShifts.some(({ day }) => {
      return (
        moment(day).format("DD MMM") === moment(shiftDate).format("DD MMM")
      );
    });

    return getYesterDayShift;
  }, [engineersData, shiftDate]);

  const renderItem = React.useMemo(
    () =>
      ({ item: { name, id, avatar } }: { item: EnginnersDataType }) =>
        <Item name={name} avatar={avatar} id={id} />,
    [lastDayShifts, selectedEngineers]
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.selectDateButton} onPress={showPicker}>
        <Text style={{ color: "white" }}>Select shift Date</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={shiftDate}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
      <View style={styles.selectedDateContainer}>
        <Text>Selected Date: </Text>
        <Text>{moment(shiftDate).format("DD MMM")}</Text>
      </View>

      <FlatList
        data={lastDayShifts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10, backgroundColor: "white" }}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
      />
      <Pressable
        style={[styles.selectDateButton, { marginTop: 10 }]}
        disabled={existingShiftThisDay}
        onPress={goToAssignShift}
      >
        <Text style={{ color: "white" }}>
          {existingShiftThisDay ? "Existing shift this day" : "Next"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  selectDateButton: {
    backgroundColor: Colors.light.tint,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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

  actionButton: {
    backgroundColor: "rgba(229, 229, 229,1)",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
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
});

export default CreateShiftScreen;
