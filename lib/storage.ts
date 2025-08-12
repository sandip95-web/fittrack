"use client";
import { useEffect, useState } from "react";
import { AppData } from "./types";
import { DEFAULT_PROGRAM } from "./defaultProgram";

export const STORAGE_KEY = "fittrack_mod_v2";

const defaultData = (): AppData => ({
  program: DEFAULT_PROGRAM,
  settings: { darkMode: false, accentColor: "#0ea5e9", logoDataUrl: "" },
});

export function useLocalData() {
  const [data, setData] = useState<AppData>(() => {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as AppData : defaultData(); }
    catch { return defaultData(); }
  });
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);
  return [data, setData] as const;
}
