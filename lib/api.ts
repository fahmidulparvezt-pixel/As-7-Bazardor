import { useEffect, useState } from "react";
export const API=process.env.NEXT_PUBLIC_API_URL||"https://api.api-store.workers.dev/api/bazardor";
export const ALT="https://api.abcz.workers.dev/api/bazardor";
export type Market={name:string;division:string;min:number;max:number;price:number};
export type Product={id:string;slug:string;name:string;emoji:string;unit:string;price:number;change:number;category:string;description:string;markets:Market[];min:number;max:number;avg:number};
export type Category={slug:string;name:string;emoji:string};
const arr=(j:any):any[]=>Array.isArray(j)?j:j?.data??j?.products??j?.categories??j?.items??[];
// Tolerant normalizer: adjust key names here if your API differs.
const UNITS:Record<string,string>={kg:"প্রতি কেজি",litre:"প্রতি লিটার",liter:"প্রতি লিটার",l:"প্রতি লিটার",dozen:"প্রতি ডজন",piece:"প্রতি পিস",pcs:"প্রতি পিস",hali:"প্রতি হালি"};
export function normProduct(p:any):Product{
  const markets:Market[]=(p.markets??[]).map((m:any)=>({name:m.market,division:m.division,min:Number(m.min),max:Number(m.max),price:Math.round((Number(m.min)+Number(m.max))/2)}));
 const change=Number(p.change?.pct??0);
  return {id:String(p.id),slug:String(p.slug??p.id),name:p.nameBn,emoji:p.image??p.categoryIcon??"🛒",
    unit:UNITS[String(p.unit).toLowerCase()]??("প্রতি "+p.unit),price:Number(p.today),change,
    category:p.categoryNameBn??p.category??"",description:"",markets,
    min:markets.length?Math.min(...markets.map(m=>m.min)):Number(p.today),
    max:markets.length?Math.max(...markets.map(m=>m.max)):Number(p.today),
    avg:markets.length?Math.round(markets.reduce((a,m)=>a+m.price,0)/markets.length):Number(p.today)};
} 
export const normCat=(c:any):Category=>({slug:String(c.slug??c.id),name:c.nameBn??c.name_bn??c.name??c.title,emoji:c.emoji??c.icon??"🛒"});
async function get(path:string){
  for(const base of [API,ALT]){ try{const r=await fetch(base+path);if(r.ok)return await r.json();}catch{} }
  throw new Error("API error");
}
export const getProducts=async(cat?:string)=>arr(await get("/products"+(cat?`?category=${cat}`:""))).map(normProduct);
export const getCategories=async()=>arr(await get("/categories")).map(normCat);
export function useAsync<T>(fn:()=>Promise<T>,deps:any[]){
  const [data,set]=useState<T|null>(null);const [loading,setL]=useState(true);const [error,setE]=useState(false);
  useEffect(()=>{setL(true);setE(false);fn().then(set).catch(()=>setE(true)).finally(()=>setL(false));},deps);
  return {data,loading,error};
}
