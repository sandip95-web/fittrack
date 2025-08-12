"use client";
import React, { useMemo } from "react";
import { AppData } from "../lib/types";
function computeWeek(data:AppData){
  const end=new Date();const start=new Date();start.setDate(end.getDate()-6);
  const inRange=(iso:string)=>{const d=new Date(iso);d.setHours(0,0,0,0);return d>=new Date(start)&&d<=new Date(end);};
  const sessions=data.sessions.filter(s=>inRange(s.date));
  const minutes=sessions.reduce((a,s)=>a+s.minutes,0);
  const calories=sessions.reduce((a,s)=>a+s.calories,0);
  const exercises=sessions.reduce((a,s)=>a+s.completed.length,0);
  const days=new Set(sessions.map(s=>s.date)).size;
  return{minutes,calories,exercises,days,sessions};
}
export default function HomeScreen({data}:{data:AppData}){
  const W=useMemo(()=>computeWeek(data),[data]);
  return (<div className="space-y-4">
    <div className="card">
      <div className="text-sm text-gray-500 dark:text-gray-400">This week (last 7 days)</div>
      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
        <div className="badge">Minutes: <b className="ml-1">{W.minutes}</b></div>
        <div className="badge">Calories: <b className="ml-1">{W.calories}</b></div>
        <div className="badge">Exercises: <b className="ml-1">{W.exercises}</b></div>
        <div className="badge">Days trained: <b className="ml-1">{W.days}</b></div>
      </div>
    </div>
    <div className="card">
      <div className="font-semibold mb-2">Recent Sessions</div>
      <div className="space-y-2 text-sm">
        {W.sessions.slice(-5).reverse().map(s=>(<div key={s.id} className="flex justify-between"><div>{s.date} • {s.dayKey}</div><div>{s.minutes} min • {s.calories} kcal</div></div>))}
        {!W.sessions.length && <div className="text-gray-500 dark:text-gray-400">No sessions yet. Start a workout!</div>}
      </div>
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
  </div>);
}
