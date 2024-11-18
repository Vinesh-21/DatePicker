"use client";

import React from "react";
import Calander from "../Calander/Calander";
import Modal from "./Modal";
import Form from "../InputForm/Form";
import ListTask from "./ListTask";

export default function AppWrapper() {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-10">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Calander />
        {/* <Recurrence /> */}
        <Modal>
          <Form />
        </Modal>
      </div>
      <div className="overflow-auto rounded-md border border-slate-400/40">
        <ListTask />
      </div>
    </div>
  );
}
