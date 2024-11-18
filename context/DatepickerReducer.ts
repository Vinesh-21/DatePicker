import { ActionType, InitialStateType } from "./DatepickerContext";

// Reducer Function
export default function reducer(
  state: InitialStateType,
  action: ActionType,
): InitialStateType {
  switch (action.type) {
    case "setSelectedDate":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "setEndDate":
      return {
        ...state,
        selectedEndDate: action.payload,
      };
    case "setSwitchDate":
      return { ...state, switchDate: action.payload };

    case "setRepeat":
      return { ...state, repeat: action.payload };

    case "setSelectedTime":
      return { ...state, selectedTime: action.payload };

    case "setTaskName":
      return {
        ...state,
        taskName: action.payload,
      };
    case "addTask":
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case "addCustomTask":
      return {
        ...state,
        customTask: [...state.customTask, action.payload],
      };
    case "addWeek":
      return {
        ...state,
        selectedWeek: [...state.selectedWeek, action.payload],
      };
    case "removeWeek":
      const week = state.selectedWeek.filter((day) => day !== action.payload);

      return {
        ...state,
        selectedWeek: [...week],
      };
    case "addMonthDate":
      return {
        ...state,
        selectedDatesInMonth: [...state.selectedDatesInMonth, action.payload],
      };
    case "removeMonthDate":
      const Dates = state.selectedDatesInMonth.filter(
        (date) => date !== action.payload,
      );
      return {
        ...state,
        selectedDatesInMonth: [...Dates],
      };
    case "changeFrequency":
      return {
        ...state,
        customTaskFrequency: action.payload,
      };
    case "setSelectedDateInYear":
      return {
        ...state,
        selectedDateInYear: action.payload,
      };
    case "setNth":
      return {
        ...state,
        selectedNthSettings: {
          nth: action.payload,
          day: state.selectedNthSettings.day,
        },
      };
    case "setNthDay":
      return {
        ...state,
        selectedNthSettings: {
          day: action.payload,
          nth: state.selectedNthSettings.nth,
        },
      };

    default:
      return state;
  }
}
