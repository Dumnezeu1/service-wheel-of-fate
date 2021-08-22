import moment from "moment";
import React from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import useCompleteShiftData, {
  CompleteShiftDataType,
} from "../../components/useCompleteShiftData";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");

function CarrouselViewScreen() {
  const engineersShifts = useCompleteShiftData();

  const Item = (shiftData: CompleteShiftDataType) => {
    const { day, engineers } = shiftData;
    return (
      <View style={styles.shiftContainer}>
        <View style={styles.shiftDateContainer}>
          <Text style={styles.shiftDataText}>
            {moment(day).format("DD MMM")}
          </Text>
        </View>
        <View>
          {engineers.map(({ name, id, avatar, hour }) => {
            return (
              <View key={id} style={styles.engineerItemContainer}>
                <View style={styles.itemsContainer}>
                  <Image
                    source={{
                      uri: avatar,
                    }}
                    style={styles.avatar}
                  />
                  <Text>{name}</Text>
                </View>
                <View style={styles.shiftHourContainer}>
                  <Text style={{ color: "white" }}>
                    {hour.charAt(0).toUpperCase() + hour.slice(1)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = React.useMemo(
    () =>
      ({ item: { day, engineers } }: { item: CompleteShiftDataType }) =>
        <Item day={day} engineers={engineers} />,
    [engineersShifts]
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={engineersShifts}
        renderItem={renderItem}
        keyExtractor={(item) => moment(item.day).format("DD MMM")}
        pagingEnabled={true}
        decelerationRate={"fast"}
        snapToAlignment={"start"}
        contentContainerStyle={{ padding: 10 }}
        snapToInterval={width}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shiftContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    margin: 5,
    width: width - 50,
  },
  shiftDateContainer: {
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  shiftDataText: { color: "white" },
  itemsContainer: { flexDirection: "row", alignItems: "center" },
  engineerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 5,
  },
  avatar: { width: 40, height: 40, marginRight: 10, borderRadius: 5 },
  shiftHourContainer: {
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    padding: 5,
    borderRadius: 5,
  },
});

export default CarrouselViewScreen;
