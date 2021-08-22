import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import EngineerForm from "../../components/EngineerForm";
import { toastCustom } from "../../components/ToastCustom";
import { useGlobalContext } from "../../context/globalContext";

function AddNewEngineerScreen() {
  const navigation = useNavigation();

  const [engineersData, setEngineersData] = useGlobalContext();

  const submitEngineerChanges = async (
    name: string,
    avatar: string,
    id: number
  ) => {
    if (name && avatar) {
      const highestId = engineersData.engineersDataCx.sort(
        (a, b) => b.id - a.id
      )[0]?.id;
      const highestIdToSet = highestId ? highestId + 1 : 1;

      const newItem = {
        id: highestIdToSet,
        avatar,
        name,
      };

      const whereToBeAdded = [...engineersData.engineersDataCx, newItem].sort(
        (a, b) => {
          const firstGreater = a.id < b.id;
          const secondGrater = a.id > b.id;

          if (secondGrater) {
            return -1;
          }
          if (firstGreater) {
            return 1;
          }
          return 0;
        }
      );

      setEngineersData((prev) => {
        return {
          ...prev,
          engineersDataCx: whereToBeAdded,
        };
      });
      await AsyncStorage.setItem(
        "engineersData",
        JSON.stringify(whereToBeAdded)
      );
      toastCustom({
        type: "success",
        text: "Engineer added",
      });
      navigation.goBack();
    } else {
      toastCustom({
        type: "info",
        text: "Please select an avatar and an username for the engineer",
      });
    }
  };

  return (
    <EngineerForm
      submitButtonTitle="Add Engineer"
      submitEngineerChanges={submitEngineerChanges}
    />
  );
}
export default AddNewEngineerScreen;
