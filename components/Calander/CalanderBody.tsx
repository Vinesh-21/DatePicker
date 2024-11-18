import { useDatepickerContext } from "@/context/DatepickerContext";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  isWeekend,
  startOfMonth,
} from "date-fns";

export default function CalanderBody() {
  //Context
  const {
    currentDate,
    repeat,
    selectedDate,
    selectedEndDate,
    switchDate,
    dispatch,
  } = useDatepickerContext();

  const monthStartDayGap = Array.from(
    {
      length: new Date(
        switchDate.getFullYear(),
        switchDate.getMonth(),
        1,
      ).getDay(),
    },
    (_, i) => i + 1,
  );

  const monthEndDate = eachDayOfInterval({
    start: startOfMonth(switchDate),
    end: endOfMonth(switchDate),
  });

  let selected: Date[] = [];

  if (repeat === "None") {
    selected.push(selectedDate);
  } else if (repeat === "Daily") {
    selected = [
      ...eachDayOfInterval({
        start: selectedDate,
        end: new Date(
          selectedDate.getFullYear() + 10,
          selectedDate.getMonth(),
          selectedDate.getDate(),
        ),
      }),
    ];
  } else if (repeat === "Weekly") {
    selected.push(selectedDate);
    for (let i = 0; i < 500 && (selectedEndDate ?? true); i++) {
      selected.push(
        new Date(
          selected[i].getFullYear(),
          selected[i].getMonth(),
          selected[i].getDate() + 7,
        ),
      );
    }
  } else if (repeat === "Monthly") {
    for (let i = 0; i < 150 && (selectedEndDate ?? true); i++) {
      selected.push(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + i,
          selectedDate.getDate(),
        ),
      );
    }
  } else if (repeat === "Yearly") {
    for (let i = 0; i < 50 && (selectedEndDate ?? true); i++) {
      selected.push(add(selectedDate, { years: i }));
    }
  } else if (repeat === "Every Weekday") {
    for (let i = 0; i < 1000 && (selectedEndDate ?? true); i++) {
      if (isWeekend(add(selectedDate, { days: i }))) continue;
      selected.push(add(selectedDate, { days: i }));
    }
  } else if (repeat === "Custom") {
    selected.push(selectedDate);
  }
  if (selectedEndDate) {
    selected = selected.filter((date) => date <= selectedEndDate);
  }

  return (
    <div className="my-2 grid w-full grid-cols-7 gap-3">
      {/* gap */}

      {monthStartDayGap.map((num) => {
        return <div key={num} className="text-white"></div>;
      })}

      {/* Month Start */}

      {monthEndDate.map((num) => {
        const calanderDate = new Date(
          switchDate.getFullYear(),
          switchDate.getMonth(),
          num.getDate(),
        );
        const isToday = isSameDay(currentDate, calanderDate);

        const isSelected = selected.some((date) =>
          isSameDay(date, calanderDate),
        );
        return (
          <button
            onClick={() => {
              dispatch({
                type: "setSelectedDate",
                payload: num,
              });
            }}
            key={num.getDate()}
            className={` ${isToday ? (isSelected && "bg-orange-400") || "bg-white" : ""} ${isSelected && "bg-orange-400"} flex aspect-square cursor-pointer items-center justify-center rounded-full outline-none transition-all duration-150 hover:bg-slate-500/50`}
          >
            <span
              className={`text-xs ${isToday ? (isSelected && "text-white") || "text-black" : "text-white"}`}
            >
              {num.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
