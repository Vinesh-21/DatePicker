import { useDatepickerContext } from "@/context/DatepickerContext";
import { daysOfWeek } from "@/utils/constants";
import React from "react";
import { HiXMark } from "react-icons/hi2";

function Week() {
  const { selectedWeek, dispatch } = useDatepickerContext();

  return (
    <div className="flex w-[600px] flex-wrap justify-center gap-2 rounded-md border border-slate-300/40 bg-white/10 px-3 py-2 backdrop-blur-sm">
      {daysOfWeek.map((day) => {
        const isSelected = selectedWeek.includes(day);
        return (
          <div
            onClick={() =>
              isSelected
                ? dispatch({ type: "removeWeek", payload: day })
                : dispatch({ type: "addWeek", payload: day })
            }
            key={day}
            className={`flex cursor-pointer items-center justify-center gap-1 rounded-full border border-slate-400/40 px-2 py-1 text-white transition-all duration-150 hover:bg-slate-700/60 ${isSelected ? "bg-orange-500/90 text-white hover:border-orange-500 hover:bg-orange-400/60" : "bg-slate-700/30"}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}

export default Week;
