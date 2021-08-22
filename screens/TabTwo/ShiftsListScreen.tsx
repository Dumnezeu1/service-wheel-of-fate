import React, { useEffect } from "react";
import { Text } from "react-native";
import { useGlobalContext } from "../../context/globalContext";

function ShiftsListScreen() {
  const [engineersData, setEngineersData] = useGlobalContext();

  useEffect(() => {
    console.log("sef");
    console.log(engineersData.engineersShifts);
    console.log("sef2");
  }, [engineersData]);
  return <Text>List</Text>;
}

export default ShiftsListScreen;
