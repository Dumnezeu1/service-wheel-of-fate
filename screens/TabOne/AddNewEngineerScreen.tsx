import { useNavigation } from "@react-navigation/native";
import React from "react";
import EngineerForm from "../../components/EngineerForm";
import {
  EnginnersDataType,
  useEngineersContext,
} from "../../context/engineersContext";

function AddNewEngineerScreen() {
  const navigation = useNavigation();

  const [engineersData, setEngineersData] = useEngineersContext();

  const submitEngineerChanges = (name: string, avatar: string, id: number) => {
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
    navigation.goBack();
  };

  return (
    <EngineerForm
      submitButtonTitle="Change details"
      submitEngineerChanges={submitEngineerChanges}
    />
  );
}
export default AddNewEngineerScreen;
