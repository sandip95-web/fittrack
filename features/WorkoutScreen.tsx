"use client";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { AppData, WorkoutSession } from "../lib/types";
import { minutesBetween, metForIntensity, kcalFromMET } from "../lib/metrics";
function gifSearchUrl(name:string){ return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + ' exercise gif')}`; }
export default function WorkoutScreen({ data, setData }:{ data:AppData; setData:React.Dispatch<React.SetStateAction<AppData>> }){
  const dayKeys=Object.keys(data.program);
  const [dayKey,setDayKey]=useState<string>(dayKeys[0]||"");
  const day=data.program[dayKey];
  const [session,setSession]=useState<WorkoutSession|null>(null);
  const [modalEx, setModalEx] = useState<{name:string; url?:string} | null>(null);
  useEffect(()=>{ if(!dayKey && dayKeys[0]) setDayKey(dayKeys[0]); },[data.program]);
  function startSession(){ if(!day) return; const s:WorkoutSession={id:Math.random().toString(36).slice(2), date:new Date().toISOString().slice(0,10), dayKey, start:new Date().toISOString(), minutes:0, calories:0, completed:[]}; setSession(s); }
  function toggleComplete(name:string){ if(!session) return; setSession(s=>s?{...s, completed:s.completed.includes(name)? s.completed.filter(n=>n!==name):[...s.completed,name]}:s); }
  function endSession(){ if(!session) return; const endIso=new Date().toISOString(); const minutes=minutesBetween(session.start,endIso); const met=metForIntensity(data.settings.intensity); const kcals=kcalFromMET(minutes,met,data.settings.bodyWeightKg); const saved={...session,end:endIso,minutes,calories:kcals}; setData(d=>({...d,sessions:[...d.sessions,saved]})); setSession(null); alert(`Saved: ${minutes} min • ~${kcals} kcal`); }
  const elapsed=session? minutesBetween(session.start,new Date().toISOString()):0;
  return (<div className="space-y-4">
    <div className="card">
      <div className="flex items-center gap-2">
        <select className="input flex-1" value={dayKey} onChange={e=>setDayKey(e.target.value)}>{dayKeys.map(k=>(<option value={k} key={k}>{data.program[k].title}</option>))}</select>
        {!session? <button className="btn-primary btn" onClick={startSession}>Start Session</button> : <button className="btn" onClick={endSession}>End & Save</button>}
      </div>
      {session && <div className="mt-2 text-sm"><b>Timer:</b> {elapsed} min</div>}
    </div>
    {day && (<div className="card">
      <div className="font-semibold mb-2">Exercises</div>
      <div className="space-y-3">
        {day.exercises.map((ex,i)=>(
          <div key={i} className="rounded-2xl border p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <button className="text-left font-medium w-full truncate" onClick={()=>setModalEx({ name: ex.name, url: (ex as any).gif })}>{ex.name}</button>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{ex.prescription}{ex.note?` • ${ex.note}`:""}</div>
              </div>
              {session && (<button className={`badge ${session.completed.includes(ex.name)?'bg-green-600 text-white border-green-600':''}`} onClick={()=>toggleComplete(ex.name)}>{session.completed.includes(ex.name)?'Completed':'Mark done'}</button>)}
            </div>
          </div>
        ))}
      </div>
    </div>)}
    <div className="card text-xs text-gray-500 dark:text-gray-400">• Tap an exercise name to open a GIF search in a new tab.<br/>• Start a session to enable completion tracking and timer.</div>
  
    <Modal open={!!modalEx} onClose={()=>setModalEx(null)} title={modalEx?.name || 'Preview'}>
      {modalEx?.url ? (
        <div className="space-y-2">
          <img src={modalEx.url} alt={modalEx.name} className="w-full rounded-xl object-contain max-h-[60vh]" />
          <div className="text-xs text-gray-500 dark:text-gray-400">Tip: If the GIF doesn't animate, try another direct .gif URL.</div>
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <div>No GIF saved yet for <b>{modalEx?.name}</b>.</div>
          <a className="btn" target="_blank" rel="noreferrer" href={gifSearchUrl(modalEx?.name || '')}>Find GIF on the web</a>
          <div className="text-xs text-gray-500 dark:text-gray-400">Then paste the direct image/GIF link in Program → this exercise’s “GIF URL”.</div>
        </div>
      )}
    </Modal>

  </div>);
}
