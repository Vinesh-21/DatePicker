import { useDatepickerContext } from "@/context/DatepickerContext";
import React from "react";

function ListTask() {
  const { task, customTask } = useDatepickerContext();

  // Merge and format tasks
  const allTasks = [
    ...task.map(({ taskName, dates, endDate, repeat }) => ({
      taskName,
      startDate: dates[0],
      endDate: endDate || null,
      repeat,
      frequency: null, // Not applicable for regular tasks
    })),
    ...customTask.map(({ taskName, dates, endDate, frequency }) => ({
      taskName,
      startDate: dates[0],
      endDate: endDate || null,
      repeat: "Custom", // Indicate it's a custom task
      frequency, // Custom task frequency details
    })),
  ];

  return (
    <div className="bg-transparent p-4 text-white">
      <h2 className="mb-4 border-b border-gray-700 pb-2 text-2xl font-bold">
        All Tasks
      </h2>
      <ul className="space-y-4">
        {allTasks.map((task, index) => (
          <li
            key={index}
            className="rounded-md border border-gray-700 p-4 transition hover:bg-gray-800"
          >
            <div className="mb-2">
              <span className="font-semibold">Task Name:</span> {task.taskName}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Start Date:</span>{" "}
              {task.startDate.toLocaleDateString()}
            </div>
            <div className="mb-2">
              <span className="font-semibold">End Date:</span>{" "}
              {task.endDate ? task.endDate.toLocaleDateString() : "None"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Repeat:</span> {task.repeat}
            </div>
            {task.frequency && (
              <div>
                <span className="font-semibold">Frequency:</span> Every{" "}
                {task.frequency.gap} {task.frequency.dateType}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTask;
