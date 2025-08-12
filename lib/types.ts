export type ExerciseTemplate={name:string;prescription:string;note?:string;gif?:string};
export type DayTemplate={title:string;exercises:ExerciseTemplate[]};
export type SettingsShape={darkMode:boolean;accentColor:string;logoDataUrl?:string;bodyWeightKg:number;intensity:'light'|'moderate'|'hard'};
export type WorkoutSession={id:string;date:string;dayKey:string;start:string;end?:string;minutes:number;calories:number;completed:string[]};
export type AppData={program:Record<string,DayTemplate>;settings:SettingsShape;sessions:WorkoutSession[]};
