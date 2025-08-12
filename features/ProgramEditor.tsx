"use client";
import React, { useEffect, useState } from "react";
import { AppData, DayTemplate, ExerciseTemplate } from "../lib/types";
import { DEFAULT_PROGRAM } from "../lib/defaultProgram";
export default function ProgramEditor({ data, setData }:{ data:AppData; setData:React.Dispatch<React.SetStateAction<AppData>> }){
  const [selectedKey,setSelectedKey]=useState<string>(Object.keys(data.program)[0]||"");
  useEffect(()=>{ if(!selectedKey && Object.keys(data.program)[0]) setSelectedKey(Object.keys(data.program)[0]); },[data.program]);
  const day=data.program[selectedKey];
  function addDay(){ const base="New Day"; let n=1; let key=`${base} ${n}`; while(data.program[key]){ n++; key=`${base} ${n}`; } const nd:DayTemplate={title:key,exercises:[]}; setData(d=>({...d,program:{...d.program,[key]:nd}})); setSelectedKey(key); }
  function removeDay(k:string){ const entries=Object.entries(data.program).filter(([kk])=>kk!==k); const next=Object.fromEntries(entries); setData(d=>({...d,program:next})); const first=Object.keys(next)[0]||""; setSelectedKey(first); }
  function renameDay(k:string,title:string){ if(!title.trim()||k===title) return; const { [k]:old, ...rest} = data.program; setData(d=>({...d,program:{...rest,[title]:{...old,title}}})); setSelectedKey(title); }
  function addExercise(){ const ex:ExerciseTemplate={name:"",prescription:"3×10",note:""}; setData(d=>({...d,program:{...d.program,[selectedKey]:{...d.program[selectedKey],exercises:[...d.program[selectedKey].exercises,ex]}}})); }
  function updateExercise(idx:number,field:keyof ExerciseTemplate,value:string){ setData(d=>({...d,program:{...d.program,[selectedKey]:{...d.program[selectedKey],exercises:d.program[selectedKey].exercises.map((e,i)=>i===idx?{...e,[field]:value}:e)}}})); }
  function removeExercise(idx:number){ setData(d=>({...d,program:{...d.program,[selectedKey]:{...d.program[selectedKey],exercises:d.program[selectedKey].exercises.filter((_,i)=>i!==idx)}}})); }
  function resetDefaults(){ if(confirm("Reset program to default?")){ setData(d=>({...d,program:DEFAULT_PROGRAM})); setSelectedKey(Object.keys(DEFAULT_PROGRAM)[0]); } }
  return (<div className="space-y-4">
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Program Editor</div>
        <div className="flex gap-2">
          <button className="btn" onClick={addDay}>Add Day</button>
          <button className="btn" onClick={resetDefaults} style={{backgroundColor:'#ef4444',color:'#fff'}}>Reset</button>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.keys(data.program).map(k=>(<button key={k} onClick={()=>setSelectedKey(k)} className={`btn whitespace-nowrap ${selectedKey===k?'text-white':''}`} style={selectedKey===k?{backgroundColor:'var(--accent)',borderColor:'var(--accent)'}:{}}>{data.program[k].title}</button>))}
      </div>
      {day && (<div className="space-y-3 mt-2">
        <div className="flex gap-2 items-center">
          <input className="input flex-1" value={day.title} onChange={e=>renameDay(selectedKey,e.target.value)} />
          <button className="btn" onClick={()=>removeDay(selectedKey)}>Delete Day</button>
        </div>
        <div className="flex items-center justify-between"><div className="font-medium">Exercises</div><button className="btn-primary btn" onClick={addExercise}>Add Exercise</button></div>
        <div className="space-y-3">
          {day.exercises.map((ex,i)=>(<div key={i} className="rounded-2xl border p-4">
            <div className="grid gap-3" style={{gridTemplateColumns:'2fr 1fr 1fr'}}>
              <input className="input w-full" placeholder="Name (full width)" value={ex.name} onChange={e=>updateExercise(i,'name',e.target.value)} />
              <input className="input" placeholder="Sets×Reps/Time" value={ex.prescription} onChange={e=>updateExercise(i,'prescription',e.target.value)} />
              <input className="input" placeholder="Note (optional)" value={ex.note||''} onChange={e=>updateExercise(i,'note',e.target.value)} />
            </div>
            <div className="grid gap-3 mt-2" style={{gridTemplateColumns:'2fr 1fr'}}>
              <input className="input w-full" placeholder="GIF URL (optional) — paste a direct .gif or image link" value={(ex as any).gif || ''} onChange={e=>updateExercise(i,'gif',e.target.value)} />
              <a className="btn" href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(ex.name + ' exercise gif')}`} target="_blank" rel="noreferrer">Find GIF</a>
            </div>
            <div className="flex justify-end mt-2"><button className="btn" onClick={()=>removeExercise(i)}>Remove</button></div>
          </div>))}
          {!day.exercises.length && <div className="text-sm text-gray-500">No exercises yet. Add one.</div>}
        </div>
      </div>)}
    </div>
  </div>);
}
