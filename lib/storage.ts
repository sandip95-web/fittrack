"use client";
import { useEffect, useState } from "react";
import { AppData } from "./types";
import { DEFAULT_PROGRAM } from "./defaultProgram";

export const STORAGE_KEY = "fittrack_pro_v1";

const defaultData = (): AppData => ({
  program: DEFAULT_PROGRAM,
  settings: { darkMode: false, accentColor: "#0ea5e9", logoDataUrl: "", bodyWeightKg: 59, intensity: "moderate" },
  sessions: []
});

export function useLocalData(){
  const [data, setData] = useState<AppData>(() => {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as AppData : defaultData(); }
    catch { return defaultData(); }
  });
  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); },[data]);
  return [data, setData] as const;
}
