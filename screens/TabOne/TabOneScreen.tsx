import * as React from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { Text, View } from "../../components/Themed";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  EngineersShiftsType,
  EnginnersDataType,
  useGlobalContext,
} from "../../context/globalContext";
import { useNavigation } from "@react-navigation/native";
import { toastCustom } from "../../components/ToastCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const [engineersData, setEngineersData] = useGlobalContext();

  const navigation = useNavigation();

  const addNewEngineer = () => {
    navigation.navigate("AddNewEngineer");
  };

  const Item = (engineerData: EnginnersDataType) => {
    const { id, name, avatar } = engineerData;

    const askDeleteEngineer = () => {
      Alert.alert("", `You wan't to delete engineer ${name}?`, [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => deleteEngineer() },
      ]);
    };

    const deleteEngineer = async () => {
      const newEngineerData = engineersData.engineersDataCx.filter(
        (engineerData) => engineerData.id !== id
      );

      const formattedShift: EngineersShiftsType[] =
        engineersData.engineersShifts.filter(({ assignedEngineers }) => {
          return assignedEngineers.some(({ engineerId }) => engineerId !== id);
        });

      setEngineersData((prev) => {
        return {
          ...prev,
          engineersDataCx: newEngineerData,
          engineersShifts: formattedShift,
        };
      });

      await AsyncStorage.setItem(
        "engineersData",
        JSON.stringify(newEngineerData)
      );
      await AsyncStorage.setItem(
        "engineersShifts",
        JSON.stringify(formattedShift)
      );

      toastCustom({
        type: "success",
        text: "Engineer deleted",
      });
    };

    const editEngineerData = () => {
      navigation.navigate("EditEngineerScreen", {
        engineerData,
      });
    };

    return (
      <View style={styles.engineerItemContainer}>
        <View style={styles.itemsContainer}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.avatar}
          />
          <Text>{name}</Text>
        </View>
        <View style={styles.itemsContainer}>
          <Pressable onPress={editEngineerData} style={[styles.actionButton]}>
            <AntDesign name="edit" color={"black"} size={20} />
          </Pressable>
          <Pressable onPress={askDeleteEngineer} style={[styles.actionButton]}>
            <MaterialIcons name="delete-outline" color={"black"} size={20} />
          </Pressable>
        </View>
      </View>
    );
  };

  const EngineersListHeader = () => {
    return (
      <View style={[styles.engineerItemContainer, { marginBottom: 5 }]}>
        <Text>Add new engineer</Text>
        <Pressable onPress={addNewEngineer} style={[styles.actionButton]}>
          <MaterialIcons name="add" color={"black"} size={20} />
        </Pressable>
      </View>
    );
  };

  const renderItem = React.useMemo(
    () =>
      ({ item: { name, id, avatar } }: { item: EnginnersDataType }) =>
        <Item name={name} avatar={avatar} id={id} />,
    [engineersData.engineersDataCx]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={engineersData.engineersDataCx}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
        ListHeaderComponent={EngineersListHeader}
        ListEmptyComponent={
          <View style={{ marginVertical: 100 }}>
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              Empty list
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: "rgba(229, 229, 229,1)",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
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
