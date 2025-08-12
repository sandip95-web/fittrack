"use client";
import React, { useEffect, useState } from "react";
import HomeScreen from "../features/HomeScreen";
import ProgramEditor from "../features/ProgramEditor";
import SettingsScreen from "../features/SettingsScreen";
import { useLocalData } from "../lib/storage";
import { Header } from "../components/Header";
import { BottomNav, TabKey } from "../components/BottomNav";

export default function Page(){
  const [data, setData] = useLocalData();
  const [tab, setTab] = useState<TabKey>("home");

  useEffect(()=>{
    document.documentElement.classList.toggle("dark", data.settings.darkMode);
    document.documentElement.style.setProperty("--accent", data.settings.accentColor);
  }, [data.settings.darkMode, data.settings.accentColor]);

  return (
    <div className="mx-auto max-w-md min-h-screen flex flex-col">
      <Header title={tab==='home'?'Overview': tab==='program'?'Program Editor':'Settings'} settings={data.settings} />
      <main className="flex-1 px-4 pb-24 pt-4">
        {tab==='home' && <HomeScreen data={data} />}
        {tab==='program' && <ProgramEditor data={data} setData={setData} />}
        {tab==='settings' && <SettingsScreen data={data} setData={setData} />}
      </main>
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
