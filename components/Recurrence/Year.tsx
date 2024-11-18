import { useDatepickerContext } from "@/context/DatepickerContext";
import { addMonths, format, isSameDay, setDate, subMonths } from "date-fns";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Year() {
  const [month, setMonth] = useState(new Date());

  const { selectedDateInYear, dispatch } = useDatepickerContext();
  return (
    <div className="h-[275px] w-[300px] rounded-md border border-slate-300/40 bg-[[#09090b]] px-1 py-4 backdrop-blur-md">
      <div className="mb-4 flex w-full justify-between px-4 text-white">
        <button
          type="button"
          onClick={() => setMonth((date) => subMonths(date, 1))}
          className="flex size-6 items-center justify-center rounded-md border border-slate-300/40 p-1 transition-all duration-150 hover:bg-slate-500/50"
        >
          <IoIosArrowBack size={14} />
        </button>

        <h2 className="font-semiabold text-sm">{format(month, "MMMM")}</h2>

        <button
          type="button"
          onClick={() => setMonth((date) => addMonths(date, 1))}
          className="flex size-6 items-center justify-center rounded-md border border-slate-300/40 p-1 transition-all duration-150 hover:bg-slate-500/50"
        >
          <IoIosArrowForward size={14} />
        </button>
      </div>

      <div className="my-2 grid w-full grid-cols-7 gap-3">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
          if (format(month, "MMMM") === "February" && date >= 29) return null;

          const thisMonthDate = setDate(
            new Date(month.getFullYear(), month.getMonth(), 1),
            date,
          );
          const isSelected = isSameDay(thisMonthDate, selectedDateInYear);
          return (
            <button
              onClick={() =>
                dispatch({
                  type: "setSelectedDateInYear",
                  payload: thisMonthDate,
                })
              }
              type="button"
              key={date}
              className={`flex aspect-square cursor-pointer items-center justify-center rounded-full outline-none transition-all duration-150 ${isSelected ? "bg-orange-500" : ""}`}
            >
              <span className={`|| "text-black" : "text-white"} text-xs`}>
                {date}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ${isSelected ? "bg-orange-400" : "hover:bg-slate-500/50"}

export default Year;
