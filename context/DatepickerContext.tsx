"use client";

import React, { createContext, Dispatch, useContext, useReducer } from "react";
import reducer from "./DatepickerReducer";
import { recurrenceOptions, daysOfWeek } from "@/utils/constants";

// Type Definitions

type TaskType = {
  taskName: string;
  repeat: string;
  dates: Date[];
  endDate?: Date;
};

type CustomTaskType = {
  taskName: string;
  frequency: { gap: number; dateType: "Day" | "Week" | "Month" | "Year" };
  dates: Date[];
  endDate?: Date;
};

export type InitialStateType = {
  selectedDate: Date;
  currentDate: Date;
  switchDate: Date;
  repeat: (typeof recurrenceOptions)[number];
  selectedTime: number;
  taskName: string;
  task: TaskType[];
  customTask: CustomTaskType[];
  customTaskFrequency: "Day" | "Week" | "Month" | "Year";
  selectedWeek: (typeof daysOfWeek)[number][];
  selectedDatesInMonth: number[];
  selectedDateInYear: Date;
  selectedNthSettings: {
    nth: "First" | "Second" | "Third" | "Fourth" | "Fifth" | "Last";
    day: (typeof daysOfWeek)[number];
  };
  selectedEndDate?: Date | undefined;
};

//Action Types
export type ActionType =
  | { type: "setSelectedDate"; payload: Date }
  | { type: "setEndDate"; payload: Date }
  | { type: "setSwitchDate"; payload: Date }
  | { type: "setSelectedTime"; payload: number }
  | { type: "setRepeat"; payload: (typeof recurrenceOptions)[number] }
  | { type: "setTaskName"; payload: string }
  | {
      type: "addTask";
      payload: TaskType;
    }
  | {
      type: "addCustomTask";
      payload: CustomTaskType;
    }
  | {
      type: "addWeek";
      payload: (typeof daysOfWeek)[number];
    }
  | {
      type: "removeWeek";
      payload: (typeof daysOfWeek)[number];
    }
  | {
      type: "addMonthDate";
      payload: number;
    }
  | {
      type: "removeMonthDate";
      payload: number;
    }
  | {
      type: "changeFrequency";
      payload: "Day" | "Week" | "Month" | "Year";
    }
  | {
      type: "setSelectedDateInYear";
      payload: Date;
    }
  | {
      type: "setNth";
      payload: "First" | "Second" | "Third" | "Fourth" | "Fifth" | "Last";
    }
  | {
      type: "setNthDay";
      payload: (typeof daysOfWeek)[number];
    };

type DatepickerContextType = {
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
};

const initialState: InitialStateType = {
  selectedDate: new Date(),
  currentDate: new Date(),
  switchDate: new Date(),
  repeat: "None",
  selectedTime: new Date().getTime(),
  taskName: "",
  task: [],
  customTask: [],
  customTaskFrequency: "Day",
  selectedWeek: [daysOfWeek[new Date().getDay()]],
  selectedDatesInMonth: [],
  selectedDateInYear: new Date(),
  selectedNthSettings: { nth: "First", day: "Sunday" },
  selectedEndDate: null,
};

// Create Context
export const DatepickerContext = createContext<DatepickerContextType | null>(
  null,
);

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DatepickerContext.Provider value={{ state, dispatch }}>
      {children}
    </DatepickerContext.Provider>
  );
}

export function useDatepickerContext() {
  const context = useContext(DatepickerContext);
  if (!context) {
    throw new Error("Error In Context");
  }
  const {
    state: {
      currentDate,
      selectedDate,
      switchDate,
      selectedTime,
      repeat,
      task,
      customTask,
      selectedEndDate,
      selectedWeek,
      selectedDatesInMonth,
      selectedDateInYear,
      customTaskFrequency,
      selectedNthSettings,
      taskName,
    },
    dispatch,
  } = context;
  return {
    currentDate,
    selectedDate,
    switchDate,
    selectedTime,
    repeat,
    task,
    selectedEndDate,
    customTask,
    dispatch,
    selectedWeek,
    selectedDatesInMonth,
    customTaskFrequency,
    taskName,
    selectedDateInYear,
    selectedNthSettings,
  };
}
