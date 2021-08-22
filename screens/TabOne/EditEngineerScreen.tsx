import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import EngineerForm from "../../components/EngineerForm";
import {
  EnginnersDataType,
  useGlobalContext,
} from "../../context/globalContext";

interface EditEngineerScreenProps {
  route: {
    params: {
      engineerData: EnginnersDataType;
    };
  };
}

function EditEngineerScreen({ route }: EditEngineerScreenProps) {
  const { engineerData } = route.params;

  const navigation = useNavigation();

  const [engineersData, setEngineersData] = useGlobalContext();

  const submitEngineerChanges = async (
    name: string,
    avatar: string,
    id: number
  ) => {
    const newItemObject = {
      id,
      avatar,
      name,
    };
    const listWithItemEdited = engineersData.engineersDataCx.map((item) => {
      if (item.id === id) {
        return newItemObject;
      }
      return item;
    });

    setEngineersData((prev) => {
      return {
        ...prev,
        engineersDataCx: listWithItemEdited,
      };
    });
    await AsyncStorage.setItem(
      "engineersData",
      JSON.stringify(listWithItemEdited)
    );
    navigation.goBack();
  };

  return (
    <EngineerForm
      engineerData={engineerData}
      submitButtonTitle="Change details"
      submitEngineerChanges={submitEngineerChanges}
    />
  );
}
export default EditEngineerScreen;
