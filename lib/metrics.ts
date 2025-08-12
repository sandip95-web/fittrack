export function minutesBetween(startIso:string,endIso:string){const s=new Date(startIso).getTime();const e=new Date(endIso).getTime();return Math.max(0,Math.round((e-s)/60000));}
export function metForIntensity(intensity:'light'|'moderate'|'hard'){return intensity==='light'?3.0:intensity==='hard'?6.0:4.5;}
export function kcalFromMET(minutes:number,met:number,weightKg:number){return Math.round(met*3.5*weightKg/200*minutes);}
