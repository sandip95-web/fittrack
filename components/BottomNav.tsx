"use client";
import React from "react";

export type TabKey = "home" | "program" | "settings";

export function BottomNav({ tab, setTab }:{ tab:TabKey; setTab:(t:TabKey)=>void }){
  const Item = ({k,label}:{k:TabKey;label:string}) => (
    <button onClick={()=>setTab(k)} className={`flex flex-col items-center py-2 text-xs ${tab===k?'text-gray-900 dark:text-white':'text-gray-500 dark:text-gray-400'}`}>
      <span>{label}</span>
    </button>
  );
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="max-w-md mx-auto grid grid-cols-3">
        <Item k="home" label="Home" />
        <Item k="program" label="Program" />
        <Item k="settings" label="Settings" />
      </div>
    </nav>
  );
}
