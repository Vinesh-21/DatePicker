import { useDatepickerContext } from "@/context/DatepickerContext";
import { daysOfWeek } from "@/utils/constants";
import { format } from "date-fns";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CalanderHeader() {
  //Context
  const { switchDate, dispatch } = useDatepickerContext();

  //onClick Handler
  const incrementMonth = () => {
    return dispatch({
      type: "setSwitchDate",
      payload: new Date(switchDate.getFullYear(), switchDate.getMonth() + 1),
    });
  };

  //onClick Handler
  const decrementMonth = () => {
    return dispatch({
      type: "setSwitchDate",
      payload: new Date(switchDate.getFullYear(), switchDate.getMonth() - 1),
    });
  };

  return (
    <header className="mt-2 w-full">
      <div>
        <div className="mb-4 flex w-full justify-between px-4 text-white">
          <button
            onClick={decrementMonth}
            className="flex size-6 items-center justify-center rounded-md border border-slate-300/40 p-1 transition-all duration-150 hover:bg-slate-500/50"
          >
            <IoIosArrowBack size={14} />
          </button>

          <h2 className="text-sm">{format(switchDate, "MMMM yyyy")}</h2>

          <button
            onClick={incrementMonth}
            className="flex size-6 items-center justify-center rounded-md border border-slate-300/40 p-1 transition-all duration-150 hover:bg-slate-500/50"
          >
            <IoIosArrowForward size={14} />
          </button>
        </div>

        {/* Days in a week */}
        <div className="grid w-full grid-cols-7">
          {daysOfWeek.map((day) => {
            return (
              <div key={day} className="flex items-center justify-center">
                <p className="text-xs text-gray-400">{day.slice(0, 2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
