import { useDatepickerContext } from "@/context/DatepickerContext";
import React from "react";

function Month() {
  const { selectedDatesInMonth, dispatch } = useDatepickerContext();
  return (
    <div className="h-[240px] w-[300px] rounded-md border border-slate-300/40 bg-[[#09090b]] px-1 py-4 backdrop-blur-md">
      <div className="my-2 grid w-full grid-cols-7 gap-3">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
          const isSelected = selectedDatesInMonth.includes(date);

          return (
            <button
              type="button"
              onClick={() =>
                isSelected
                  ? dispatch({ type: "removeMonthDate", payload: date })
                  : dispatch({ type: "addMonthDate", payload: date })
              }
              key={date}
              className={`flex aspect-square cursor-pointer items-center justify-center rounded-full outline-none transition-all duration-150 ${isSelected ? "bg-orange-400" : "hover:bg-slate-500/50"}`}
            >
              <span className={`text-xs`}>{date}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Month;
