import { useDatepickerContext } from "@/context/DatepickerContext";
import { daysOfWeek } from "@/utils/constants";

function MonthOnTheNth() {
  const { dispatch } = useDatepickerContext();
  return (
    <div className="flex gap-2">
      <select
        onChange={(e) =>
          dispatch({
            type: "setNth",
            payload: e.target.value as
              | "First"
              | "Second"
              | "Third"
              | "Fourth"
              | "Fifth",
          })
        }
        className="w-30 h-10 rounded-md border border-slate-300/40 bg-transparent px-3 py-2 text-white outline-none"
        id=""
      >
        {["First", "Second", "Third", "Fourth", "Fifth", "Last"].map((nTh) => {
          return (
            <option className="text-black" key={nTh} value={nTh}>
              {nTh}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) =>
          dispatch({
            type: "setNthDay",
            payload: e.target.value,
          })
        }
        className="w-30 h-10 rounded-md border border-slate-300/40 bg-transparent px-3 py-2 text-white outline-none"
        id=""
      >
        {daysOfWeek.map((day) => {
          return (
            <option className="text-black" key={day} value={day}>
              {day}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default MonthOnTheNth;
