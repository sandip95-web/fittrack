"use client";
import React from "react";

export type TabKey = "home" | "workout" | "program" | "plan" | "settings";

// Simple inline SVG icons (no extra deps)
const IconBase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} />
);
const HomeIcon = (p: any) => (
  <IconBase {...p}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
  </IconBase>
);
const DumbbellIcon = (p: any) => (
  <IconBase {...p}>
    <path d="M3 14v-4" />
    <path d="M21 14v-4" />
    <rect x="5" y="10" width="2" height="4" rx="1" />
    <rect x="17" y="10" width="2" height="4" rx="1" />
    <path d="M7 12h10" />
  </IconBase>
);
const EditIcon = (p: any) => (
  <IconBase {...p}>
    <path d="M3 21h6" />
    <path d="M3 17.25 16.81 3.44a2 2 0 0 1 2.83 2.83L5.83 20.08 3 21z" />
  </IconBase>
);
const SaladIcon = (p: any) => (
  <IconBase {...p}>
    <path d="M7 21a9 9 0 1 1 10 0" />
    <path d="M12 12c-2 0-4-1-5-3 3 0 5-1 6-3 1 2 3 3 6 3-1 2-3 3-5 3z" />
  </IconBase>
);
const SettingsIcon = (p: any) => (
  <IconBase {...p}>
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.07a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.07a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.02 3.4l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.07a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.39 1.26 1 1.51.31.13.64.2.99.2H21a2 2 0 1 1 0 4h-.07c-.35 0-.68.07-.99.2-.61.25-1 .85-1 1.51z" />
  </IconBase>
);

function TabButton({
  active,
  label,
  onClick,
  Icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  Icon: React.ElementType;
}) {
  return (
    <button
      onClick={() => {
        onClick();
        try { navigator.vibrate?.(10); } catch {}
      }}
      aria-current={active ? "page" : undefined}
      className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 transition-all
        ${active ? "text-[var(--accent)]" : "text-gray-500 dark:text-gray-400"}`}
    >
      <div
        className={`flex items-center justify-center w-12 h-8 rounded-lg
          ${active ? "bg-[var(--accent)]/10" : ""}`}
      >
        <Icon />
      </div>
      <span className="text-[11px]">{label}</span>
    </button>
  );
}

export function BottomNav({
  tab,
  setTab,
}: {
  tab: TabKey;
  setTab: (t: TabKey) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="max-w-md mx-auto px-2 pt-1 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        <div className="grid grid-cols-5 gap-1">
          <TabButton Icon={HomeIcon} active={tab === "home"} label="Home" onClick={() => setTab("home")} />
          <TabButton Icon={DumbbellIcon} active={tab === "workout"} label="Workout" onClick={() => setTab("workout")} />
          <TabButton Icon={EditIcon} active={tab === "program"} label="Program" onClick={() => setTab("program")} />
          <TabButton Icon={SaladIcon} active={tab === "plan"} label="Nutrition" onClick={() => setTab("plan")} />
          <TabButton Icon={SettingsIcon} active={tab === "settings"} label="Settings" onClick={() => setTab("settings")} />
        </div>
      </div>
    </nav>
  );
}
