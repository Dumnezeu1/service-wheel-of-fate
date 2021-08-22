import { useMemo } from "react";
import { useGlobalContext } from "../context/globalContext";

export interface CompleteShiftDataType {
  day: Date;
  engineers: {
    id?: number | undefined;
    avatar?: string | undefined;
    name?: string | undefined;
    engineerId: number;
    hour: string;
  }[];
}

function useCompleteShiftData() {
  const [engineersData, setEngineersData] = useGlobalContext();

  const result: CompleteShiftDataType[] = useMemo(() => {
    let mergeList = engineersData.engineersShifts.map((shift) => {
      const { assignedEngineers, day } = shift;
      const engineers = assignedEngineers.map((engineerData) => {
        const { engineerId } = engineerData;
        const otherList = engineersData.engineersDataCx.find(
          ({ id }) => engineerId === id
        );
        return {
          ...engineerData,
          ...otherList,
        };
      });
      return { day, engineers };
    });

    return mergeList;
  }, [engineersData]);

  return result;

  // return (
  //     <div>

  //     </div>
  // )
}

export default useCompleteShiftData;
