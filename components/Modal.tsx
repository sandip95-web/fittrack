"use client";
import React from "react";

export default function Modal({ open, onClose, title, children }:{ open:boolean; onClose:()=>void; title?:string; children:React.ReactNode }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-x-4 top-20 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="font-semibold">{title}</div>
          <button className="px-3 py-1 rounded-lg border" onClick={onClose}>Close</button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
