import { useState } from "react";
import { createContainer } from "react-tracked";

export interface EnginnersDataType {
  id: number;
  avatar: string;
  name: string;
}

export interface EngineersShiftsType {
  day: Date;
  assignedEngineers: {
    engineerId: number;
    hour: string;
  }[];
}

type AuthContextType = {
  engineersDataCx: EnginnersDataType[];
  engineersShifts: EngineersShiftsType[];
  appLoading: boolean;
};

const useValue = () =>
  useState<AuthContextType>({
    engineersDataCx: [],
    engineersShifts: [],
    appLoading: true,
  });

export const { Provider: GlobalProvider, useTracked: useGlobalContext } =
  createContainer(useValue);
