"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDatepickerContext } from "@/context/DatepickerContext";
import { recurrenceOptions } from "@/utils/constants";
import { add, eachDayOfInterval, format, isWeekend } from "date-fns";
import Modal from "../ui/Modal";
import CustomForm from "../Recurrence/Recurrence";
import Recurrence from "../Recurrence/Recurrence";

function Form() {
  const { selectedDate, repeat, task, taskName, selectedEndDate, dispatch } =
    useDatepickerContext();

  const { register, handleSubmit } = useForm();

  const [freq, setFreq] = useState("Day");

  console.log(task);
  //onsubmit handler
  const onSubmit = (data: any) => {
    // data?.preventDefault();
    if (repeat === "None") {
      dispatch({
        type: "addTask",
        payload: {
          taskName: taskName,
          repeat: repeat,
          dates: [selectedDate],
          endDate: selectedEndDate,
        },
      });
    } else if (repeat === "Daily") {
      let daily = eachDayOfInterval({
        start: selectedDate,
        end: new Date(
          selectedDate.getFullYear() + 10,
          selectedDate.getMonth(),
          selectedDate.getDate(),
        ),
      });
      if (selectedEndDate) {
        daily = daily.filter((date) => date <= selectedEndDate);
      }
      dispatch({
        type: "addTask",
        payload: {
          taskName: taskName,
          repeat: repeat,
          dates: [...daily],
          endDate: selectedEndDate,
        },
      });
    } else if (repeat === "Weekly") {
      let weekly = [selectedDate];
      for (let i = 0; i < 500 && (selectedEndDate ?? true); i++) {
        weekly.push(
          new Date(
            weekly[i].getFullYear(),
            weekly[i].getMonth(),
            weekly[i].getDate() + 7,
          ),
        );
        if (selectedEndDate) {
          weekly = weekly.filter((date) => date <= selectedEndDate);
        }
      }
      dispatch({
        type: "addTask",
        payload: {
          taskName: taskName,
          repeat: repeat,
          dates: [...weekly],
          endDate: selectedEndDate,
        },
      });
    } else if (repeat === "Monthly") {
      const monthly = [];
      for (let i = 0; i < 150 && (selectedEndDate ?? true); i++) {
        monthly.push(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + i,
            selectedDate.getDate(),
          ),
        );
      }
      dispatch({
        type: "addTask",
        payload: {
          taskName: taskName,
          repeat: repeat,
          dates: [...monthly],
          endDate: selectedEndDate,
        },
      });
    } else if (repeat === "Yearly") {
      let yearly = [];
      for (let i = 0; i < 50 && (selectedEndDate ?? true); i++) {
        yearly.push(add(selectedDate, { years: i }));
      }

      if (selectedEndDate) {
        yearly = yearly.filter((date) => date <= selectedEndDate);
      }

      dispatch({
        type: "addTask",
        payload: {
          taskName: taskName,
          repeat: repeat,
          dates: [...yearly],
          endDate: selectedEndDate,
        },
      });
    } else if (repeat === "Every Weekday") {
      let weekday = [];
      for (let i = 0; i < 1000 && (selectedEndDate ?? true); i++) {
        if (isWeekend(add(selectedDate, { days: i }))) continue;
        weekday.push(add(selectedDate, { days: i }));
      }

      if (selectedEndDate) {
        weekday = weekday.filter((date) => date <= selectedEndDate);
      }

      dispatch({
        type: "addTask",
        payload: {
          taskName: taskName,
          repeat: repeat,
          dates: [...weekday],
          endDate: selectedEndDate,
        },
      });
    }
  };

  function optionSubSpan(recurrence: string) {
    if (recurrence === "Weekly")
      return `${recurrence} (${format(selectedDate, "EEEE")})`;
    else if (recurrence === "Monthly")
      return `${recurrence} (the ${format(selectedDate, "do")} day)`;
    else if (recurrence === "Yearly")
      return `${recurrence} (${format(selectedDate, "d MMM")})`;
    else if (recurrence === "Every Weekday") return `${recurrence} (Mon-Fri)`;
    else return recurrence;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-5"
      >
        <input
          type="text"
          placeholder="Enter task name...."
          className="rounded-md border border-slate-300/40 bg-black px-1 py-2 text-slate-300 outline-none focus:ring-1 focus:ring-slate-300/50 focus:ring-offset-1"
          {...register("taskName", { required: "this field is required" })}
          onChange={(e) =>
            dispatch({ type: "setTaskName", payload: e.target.value })
          }
        />
        <select
          name="repeat"
          id="repeat"
          className="w-30 h-10 rounded-md border border-slate-300/40 bg-transparent px-3 py-2 text-white outline-none"
          value={repeat}
          onChange={(e) =>
            dispatch({ type: "setRepeat", payload: e.target.value })
          }
        >
          {recurrenceOptions.map((option) => {
            return (
              <option key={option} value={option} className="text-black">
                {optionSubSpan(option)}
              </option>
            );
          })}
        </select>
        <input
          onChange={(e) =>
            dispatch({ type: "setEndDate", payload: new Date(e.target.value) })
          }
          type="date"
          className="w-30 h-10 rounded-md border border-slate-300/40 bg-transparent px-3 py-2 text-white outline-none"
        />

        {repeat === "Custom" && (
          <Modal.OpenButton modalName="Custom">
            <button className="h-8 w-40 rounded-md bg-white px-4 py-1 text-black transition-all duration-150 hover:bg-white/80">
              Add Custom
            </button>
          </Modal.OpenButton>
        )}
        <button
          type="submit"
          className="h-8 w-16 rounded-md bg-white px-4 py-1 text-black transition-all duration-150 hover:bg-white/80"
        >
          Add
        </button>

        <Modal.ModalWindow windowName="Custom">
          <Recurrence freq={freq} setFreq={setFreq} />
        </Modal.ModalWindow>
      </form>

      {/* <Modal.OpenButton modalName="Custom">
      </Modal.OpenButton>
      */}
    </div>
  );
}

export default Form;
