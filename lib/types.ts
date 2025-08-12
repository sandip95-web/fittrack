export type ExerciseTemplate = { name: string; prescription: string; note?: string };
export type DayTemplate = { title: string; exercises: ExerciseTemplate[] };
export type SettingsShape = { darkMode: boolean; accentColor: string; logoDataUrl?: string };
export type AppData = { program: Record<string, DayTemplate>; settings: SettingsShape };
