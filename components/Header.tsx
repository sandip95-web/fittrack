"use client";
import React from "react";
import { SettingsShape } from "../lib/types";

export function Header({ title, settings }:{ title:string; settings: SettingsShape }){
  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-900/70 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: settings.accentColor }}>
          {settings.logoDataUrl ? (
            <img src={settings.logoDataUrl} alt="logo" className="w-7 h-7 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          ) : (
            <img src="/logo.png" alt="logo" className="w-7 h-7 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }} />
          )}
          {!settings.logoDataUrl && <span className="text-white text-sm font-semibold">FT</span>}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">FitTrack Mobile</div>
          <div className="text-base font-semibold">{title}</div>
        </div>
      </div>
    </div>
  );
}
