"use client";

import CalanderHeader from "@/components/Calander/CalanderHeader";
import CalanderBody from "./CalanderBody";

export default function Calander() {
  return (
    <div className="from to h-[340px] w-[300px] rounded-md border border-slate-300/50 bg-slate-300/5 bg-gradient-to-t via-[#19191d] to-[#09090b] px-1 py-4 backdrop-blur-md">
      <CalanderHeader />
      <CalanderBody />
    </div>
  );
}
