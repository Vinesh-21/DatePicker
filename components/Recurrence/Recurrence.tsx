import React, { useState } from "react";
import Calander from "../Calander/Calander";
import { useForm } from "react-hook-form";
import { useDatepickerContext } from "@/context/DatepickerContext";
import {
  add,
  addDays,
  addMonths,
  addWeeks,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import Week from "./Week";
import { daysOfWeek } from "@/utils/constants";
import Month from "./Month";
import { start } from "repl";
import Year from "./Year";
import MonthOnTheNth from "./MonthOnTheNth";

interface CustomFormProps {
  closeModal: () => void;
  setFreq: (freq: string | ((freq: string) => string)) => void;
  freq: string;
}
export default function Recurrence({
  freq,
  setFreq,
  closeModal,
}: CustomFormProps) {
  const [onThe, setOnThe] = useState<"onTh" | null>("onTh");

  //Hook-Form
  const { register, handleSubmit, reset, formState } = useForm();

  //Context
  const {
    currentDate,
    taskName,
    selectedDate,
    selectedWeek,
    customTaskFrequency,
    selectedDatesInMonth,
    selectedDateInYear,
    selectedNthSettings,
    selectedEndDate,

    dispatch,
  } = useDatepickerContext();

  //onsubmit handler
  const onSubmit = (data: any) => {
    if (customTaskFrequency === "Day") {
      let occurrences = [selectedDate];
      for (let i = 0; i < 500; i++) {
        occurrences.push(
          addDays(
            new Date(
              occurrences[i].getFullYear(),
              occurrences[i].getMonth(),
              occurrences[i].getDate(),
            ),

            Number(data.gap),
          ),
        );
      }

      if (selectedEndDate) {
        occurrences = occurrences.filter((date) => date <= selectedEndDate);
      }

      dispatch({
        type: "addCustomTask",
        payload: {
          taskName: taskName,
          frequency: { gap: Number(data.gap), dateType: customTaskFrequency },
          dates: occurrences,
          endDate: selectedEndDate,
        },
      });
    }

    if (customTaskFrequency === "Week") {
      let occurrences: Date[] = [];

      //we are getting the current selected dates entire week
      const currentWeek = eachDayOfInterval({
        start: startOfWeek(selectedDate),
        end: endOfWeek(selectedDate),
      }).filter((date) => selectedWeek.includes(daysOfWeek[date.getDay()]));

      //Findig the next occurence
      currentWeek.forEach((date) => {
        occurrences.push(addDays(date, Number(data.gap) * 7));
      });

      //generating more occurence

      for (let i = 0; i < 500; i++) {
        const temp: Date[] = [];
        for (
          let j = occurrences.length - 1;
          j > occurrences.length - 1 - selectedWeek.length;
          j--
        ) {
          temp.push(addDays(occurrences[j], Number(data.gap) * 7));
        }
        occurrences.push(...temp);
      }

      //current week's selected days
      const currentWeekSelectedDays = eachDayOfInterval({
        start: selectedDate,
        end: endOfWeek(selectedDate),
      }).filter((date) => selectedWeek.includes(daysOfWeek[date.getDay()]));

      if (selectedEndDate) {
        occurrences = occurrences.filter((date) => date <= selectedEndDate);
      }

      dispatch({
        type: "addCustomTask",
        payload: {
          taskName: taskName,
          frequency: { gap: Number(data.gap), dateType: customTaskFrequency },
          dates: occurrences,
          endDate: selectedEndDate,
        },
      });
    }

    //Month
    if (customTaskFrequency === "Month") {
      let occurrences: Date[] = [];

      if (onThe === null) {
        //Current Month Selected dates
        const currentMonthOccurenceDates = eachDayOfInterval({
          start: selectedDate,
          end: endOfMonth(selectedDate),
        }).filter((date) => selectedDatesInMonth.includes(date.getDate()));

        if (
          (selectedDatesInMonth.includes(28) ||
            selectedDatesInMonth.includes(29)) &&
          selectedDate.getMonth() == 1
        ) {
          currentMonthOccurenceDates.push(endOfMonth(selectedDate));
        }
        if (
          selectedDatesInMonth.includes(31) &&
          endOfMonth(selectedDate).getDate() === 30
        ) {
          currentMonthOccurenceDates.push(endOfMonth(selectedDate));
        }

        occurrences.push(...currentMonthOccurenceDates);

        let nextSelectedMonth = addMonths(selectedDate, Number(data.gap));
        for (let i = 0; i < 500; i++) {
          //Next Occuerence Month

          //Next Occuerence Month Selected Dates
          const nextOccurenceMonthDates = eachDayOfInterval({
            start: startOfMonth(nextSelectedMonth),
            end: endOfMonth(nextSelectedMonth),
          }).filter((date) => selectedDatesInMonth.includes(date.getDate()));
          occurrences.push(...nextOccurenceMonthDates);

          // setting NextMonth Occurence
          nextSelectedMonth = addMonths(nextSelectedMonth, Number(data.gap));
        }
      }
      //OnThe Logic
      else if (onThe === "onTh") {
        const isNextDayFunction = [
          nextSunday,
          nextMonday,
          nextTuesday,
          nextWednesday,
          nextThursday,
          nextFriday,
          nextSaturday,
        ];

        let selectedMonthDate = selectedDate;

        for (let i = 0; i < 100; i++) {
          const selectedMonthAllDates = eachDayOfInterval({
            start: startOfMonth(selectedMonthDate),
            end: endOfMonth(selectedMonthDate),
          });

          const idxOfSelectedDay = daysOfWeek.indexOf(selectedNthSettings.day);

          if (selectedNthSettings.nth === "First") {
            if (startOfMonth(selectedMonthDate).getDay() === idxOfSelectedDay) {
              occurrences.push(startOfMonth(selectedMonthDate));
            } else {
              occurrences.push(
                isNextDayFunction[idxOfSelectedDay](
                  startOfMonth(selectedMonthDate),
                ),
              );
            }
          }

          if (selectedNthSettings.nth === "Second") {
            if (startOfMonth(selectedMonthDate).getDay() === idxOfSelectedDay) {
              occurrences.push(
                isNextDayFunction[idxOfSelectedDay](
                  startOfMonth(selectedMonthDate),
                ),
              );
            } else {
              occurrences.push(
                isNextDayFunction[idxOfSelectedDay](
                  isNextDayFunction[idxOfSelectedDay](
                    startOfMonth(selectedMonthDate),
                  ),
                ),
              );
            }
          }

          if (selectedNthSettings.nth === "Third") {
            let date = startOfMonth(selectedMonthDate);
            for (let i = 0; i < 3; i++) {
              date = isNextDayFunction[idxOfSelectedDay](date);
            }
            occurrences.push(date);
          }

          if (selectedNthSettings.nth === "Fourth") {
            let date = startOfMonth(selectedMonthDate);
            for (let i = 0; i < 4; i++) {
              date = isNextDayFunction[idxOfSelectedDay](date);
            }
            occurrences.push(date);
          }

          if (selectedNthSettings.nth === "Fifth") {
            let date = startOfMonth(selectedMonthDate);
            for (let i = 0; i < 5; i++) {
              date = isNextDayFunction[idxOfSelectedDay](date);
            }
            if (date.getMonth() === selectedMonthDate.getMonth()) {
              occurrences.push(date);
            }
          }

          if (selectedNthSettings.nth === "Last") {
            const reversedDates = [...selectedMonthAllDates].reverse();
            for (const date of reversedDates) {
              if (date.getDay() === idxOfSelectedDay) {
                occurrences.push(date);
                break;
              }
            }
          }
          selectedMonthDate = addMonths(selectedMonthDate, Number(data.gap));
        }
      }
      if (selectedEndDate) {
        occurrences = occurrences.filter((date) => date <= selectedEndDate);
      }

      dispatch({
        type: "addCustomTask",
        payload: {
          taskName: taskName,
          frequency: { gap: Number(data.gap), dateType: customTaskFrequency },
          dates: occurrences,
          endDate: selectedEndDate,
        },
      });
    }

    //Year
    if (customTaskFrequency === "Year") {
      let occurrences: Date[] = [];

      //Getting Current Year Selected date
      const currentYearSelectedDate = eachDayOfInterval({
        start: currentDate,
        end: endOfYear(currentDate),
      }).filter(
        (date) =>
          date.getDate() === selectedDateInYear.getDate() &&
          date.getMonth() === selectedDateInYear.getMonth(),
      );
      occurrences.push(...currentYearSelectedDate);

      let nextOccurenceYearStart = startOfYear(
        addYears(currentDate, Number(data.gap)),
      );

      for (let i = 0; i < 100; i++) {
        const nextYearOccurenceDate = eachDayOfInterval({
          start: nextOccurenceYearStart,
          end: endOfYear(nextOccurenceYearStart),
        }).filter(
          (date) =>
            date.getDate() === selectedDateInYear.getDate() &&
            date.getMonth() === selectedDateInYear.getMonth(),
        );

        occurrences.push(...nextYearOccurenceDate);

        nextOccurenceYearStart = addYears(
          nextOccurenceYearStart,
          Number(data.gap),
        );
      }

      if (selectedEndDate) {
        occurrences = occurrences.filter((date) => date <= selectedEndDate);
      }

      dispatch({
        type: "addCustomTask",
        payload: {
          taskName: taskName,
          frequency: { gap: Number(data.gap), dateType: customTaskFrequency },
          dates: occurrences,
          endDate: selectedEndDate,
        },
      });
    }

    closeModal();
    reset();
  };
  return (
    <div className="h-full w-full">
      <h1 className="text-2xl font-semibold">Custom</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-1 flex h-full w-full flex-col px-3 py-2"
      >
        <div className="flex w-full flex-col justify-center pr-16">
          <div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <div>
                <h1 className="font-semibold">Every</h1>

                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="mr-2 w-16 rounded-md border border-slate-300/40 bg-transparent px-1 py-2 text-slate-300 outline-none focus:ring-1 focus:ring-slate-300/50 focus:ring-offset-1"
                  {...register("gap", { required: "this field is required" })}
                />

                <select
                  className="w-30 h-10 rounded-md border border-slate-300/40 bg-transparent px-3 py-2 text-white outline-none"
                  id=""
                  // value={customTaskFrequency}
                  {...register("frequency")}
                  onChange={(e) =>
                    dispatch({
                      type: "changeFrequency",
                      payload: e.target.value as
                        | "Day"
                        | "Week"
                        | "Month"
                        | "Year",
                    })
                  }
                >
                  {["Day", "Week", "Month", "Year"].map((dateType) => {
                    return (
                      <option
                        className="text-black"
                        key={dateType}
                        value={dateType}
                      >
                        {dateType}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="w-full">
                <div className="flex w-full items-center justify-center">
                  {customTaskFrequency === "Week" && <Week />}
                  {customTaskFrequency === "Month" && (
                    <div className="flex w-full flex-col">
                      <div className="my-3 flex w-full justify-center">
                        <button
                          onClick={() =>
                            setOnThe((prev) =>
                              prev === "onTh" ? null : "onTh",
                            )
                          }
                          type="button"
                          className={`flex w-16 cursor-pointer items-center justify-center gap-1 rounded-full border border-slate-400/40 px-2 py-1 text-sm font-light text-white transition-all duration-150 hover:w-20 hover:bg-slate-700/60 ${onThe === "onTh" ? "bg-orange-500/90 text-white hover:border-orange-500 hover:bg-orange-400/60" : "bg-slate-700/30"}`}
                        >
                          OnThe
                        </button>
                      </div>
                      <div className="flex w-full justify-center">
                        {onThe === "onTh" ? <MonthOnTheNth /> : <Month />}
                      </div>
                    </div>
                  )}
                  {customTaskFrequency === "Year" && <Year />}
                </div>
              </div>
              {/*  */}

              <button
                type="submit"
                className="h-8 w-16 rounded-md bg-white px-4 py-1 text-black transition-all duration-150 hover:bg-white/80"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
