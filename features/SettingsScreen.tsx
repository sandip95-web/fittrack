"use client";
import React, { useRef, useState } from "react";
import { AppData } from "../lib/types";

export default function SettingsScreen({ data, setData }:{ data:AppData; setData:React.Dispatch<React.SetStateAction<AppData>> }){
  const [dark, setDark] = useState<boolean>(data.settings.darkMode);
  const [accent, setAccent] = useState<string>(data.settings.accentColor);
  const [logoUrl, setLogoUrl] = useState<string>(data.settings.logoDataUrl || "");
  const logoRef = useRef<HTMLInputElement|null>(null);

  function save(){
    setData(d => ({ ...d, settings: { ...d.settings, darkMode: dark, accentColor: accent, logoDataUrl: logoUrl } }));
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.setProperty("--accent", accent);
  }

  function onLogoFile(file: File){
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="font-semibold mb-2">Theme</div>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm">Dark Mode
            <select className="input mt-1" value={dark? '1':'0'} onChange={e=>setDark(e.target.value==='1')}>
              <option value="0">Light</option>
              <option value="1">Dark</option>
            </select>
          </label>
          <label className="text-sm">Accent
            <input type="color" className="input mt-1" value={accent} onChange={e=>setAccent(e.target.value)} />
          </label>
        </div>
      </div>

      <div className="card">
        <div className="font-semibold mb-2">Logo</div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent }}>
            {logoUrl ? <img src={logoUrl} alt="logo" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) invert(1)' }} /> : <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />}
          </div>
          <div className="flex-1 flex gap-2">
            <button className="btn" onClick={()=>logoRef.current?.click()}>Upload Logo</button>
            <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e=>{ const f=e.target.files?.[0]; if(f) onLogoFile(f); }} />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn-primary btn" onClick={save}>Save Settings</button>
      </div>
    </div>
  );
}
