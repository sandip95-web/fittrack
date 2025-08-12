"use client";
import React from "react";
import { AppData } from "../lib/types";

export default function HomeScreen({ data }:{ data:AppData }){
  const today = new Date().toISOString().slice(0,10);
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-sm text-gray-500 dark:text-gray-400">Today</div>
        <div className="text-lg font-semibold">{today}</div>
      </div>
      <div className="card">
        <div className="font-semibold mb-2">This Week Plan</div>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Sun — Day 1: Upper A</li>
          <li>Mon — Day 2: Lower A</li>
          <li>Wed — Day 3: Upper B</li>
          <li>Fri — Day 4: Lower B</li>
          <li>Sat (opt.) — Arms • Abs • Conditioning</li>
        </ul>
      </div>
    </div>
  );
}
