import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useCompleteShiftData from "../../components/useCompleteShiftData";
import Colors from "../../constants/Colors";

function CalendarScreen() {
  const engineersShifts = useCompleteShiftData();

  const currentDate = new Date();

  const [page, setPage] = useState(0);

  var futureMonth = moment(currentDate).add(page, "M");

  const currentMonthDates = new Array(moment().daysInMonth())
    .fill(null)
    .map((x, i) => moment(futureMonth).startOf("month").add(i, "days"));

  const gotoNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const gotoBackPage = () => {
    setPage((prev) => prev - 1);
  };

  // const weekArray = moment(n).weekday();

  // console.log("da");
  // console.log(weekArray);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.calendarContainer}>
          {currentMonthDates.map((monthDay) => {
            return (
              <View
                style={styles.calendarItemContainer}
                key={moment(monthDay).format("DD MMM")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "rgba(229, 229, 229,1)",
                  }}
                >
                  {moment(monthDay).format("DD MMM")}{" "}
                </Text>
                <View>
                  {engineersShifts.map(({ day, engineers }) => {
                    if (
                      moment(day).format("DD MMM") ===
                      moment(monthDay).format("DD MMM")
                    ) {
                      return (
                        <View key={moment(day).format("DD MMM")}>
                          {engineers.map(({ name, hour, id }) => {
                            return (
                              <View key={id} style={styles.engineerContainer}>
                                <Text style={styles.engineerText}>{name}</Text>
                                <Text style={styles.engineerText}>
                                  {hour.charAt(0).toUpperCase() + hour.slice(1)}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      );
                    }
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.tableNavigationButtonsContainer}>
        <Pressable onPress={gotoBackPage}>
          <MaterialIcons name="navigate-before" color="black" size={40} />
        </Pressable>

        <Pressable onPress={gotoNextPage}>
          <MaterialIcons name="navigate-next" color="black" size={40} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  calendarItemContainer: {
    borderWidth: 1,
    borderColor: "rgba(229, 229, 229,1)",
    height: 150,
    width: 100,
    backgroundColor: "white",
  },
  engineerContainer: {
    alignItems: "center",
    // backgroundColor: Colors.light.tint,
    marginVertical: 5,
    padding: 5,
  },
  engineerText: { color: Colors.light.tint },
  tableNavigationButtonsContainer: {
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CalendarScreen;
