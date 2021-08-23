import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useCompleteShiftData, {
  CompleteShiftDataType,
} from "../../components/useCompleteShiftData";
import Colors from "../../constants/Colors";

const itemsPerRow = 2;

function TabelScreen() {
  const engineersShifts = useCompleteShiftData();

  const [engineersTableData, setEngineersTableData] = useState<
    CompleteShiftDataType[]
  >([]);

  const [page, setPage] = useState(0);

  const tablePageCount = engineersShifts.length / itemsPerRow;

  const gotoNextPage = () => {
    if (page + 1 !== tablePageCount) setPage((prev) => prev + 1);
  };

  const gotoBackPage = () => {
    if (page !== 0) setPage((prev) => prev - 1);
  };

  useEffect(() => {
    const engineersShiftsSlice = engineersShifts.slice(
      page * itemsPerRow,
      page * itemsPerRow + itemsPerRow
    );
    setEngineersTableData(engineersShiftsSlice);
  }, [engineersShifts]);

  useEffect(() => {
    const engineersShiftsSlice = engineersShifts.slice(
      page * itemsPerRow,
      page * itemsPerRow + itemsPerRow
    );
    setEngineersTableData(engineersShiftsSlice);
  }, [page]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeaderContainer}>
            <Text style={styles.dayHeader}>Day</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.engineerTitle}>Engineers</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.engineersValues}>Name</Text>
                <Text style={styles.engineersValues}>Shift</Text>
              </View>
            </View>
          </View>
          {engineersTableData.map(({ day, engineers }, idx) => {
            const formatDate = moment(day).format("DD MMM");
            return (
              <View
                key={formatDate}
                style={[
                  styles.tableItemContainer,
                  {
                    backgroundColor:
                      idx % 2 ? "rgba(229, 229, 229,1)" : "white",
                  },
                ]}
              >
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.dateValue}>
                    {moment(day).format("DD MMM")}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  {engineers.map(({ id, name, hour }) => {
                    return (
                      <View key={id} style={styles.engineerDetailsContainer}>
                        <Text style={styles.engineerValuesText}>{name}</Text>
                        <Text style={styles.engineerValuesText}>
                          {hour.charAt(0).toUpperCase() + hour.slice(1)}
                        </Text>
                      </View>
                    );
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
        <Text>
          {page + 1}/{tablePageCount}
        </Text>
        <Pressable onPress={gotoNextPage}>
          <MaterialIcons name="navigate-next" color="black" size={40} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    margin: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tableHeaderContainer: {
    minHeight: 70,
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayHeader: {
    width: 100,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  engineerTitle: { textAlign: "center", color: "white", fontWeight: "bold" },
  engineersValues: {
    textAlign: "center",
    color: "white",
    flex: 1,
    fontWeight: "bold",
  },
  tableItemContainer: {
    flexDirection: "row",
    height: 100,
    padding: 5,
  },
  dateValue: { width: 100, textAlign: "center" },
  engineerDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  engineerValuesText: { textAlign: "center", flex: 1 },

  tableNavigationButtonsContainer: {
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TabelScreen;
