"use client";
import { getProducts, useAsync } from "@/lib/api";
import { taka, pct } from "@/lib/bn";
export default function Ticker(){
  const {data}=useAsync(()=>getProducts(),[]);
  if(!data?.length) return <div className="h-9 bg-neutral"/>;
  const items=[...data,...data];
  return(<div className="bg-neutral text-neutral-content overflow-hidden h-9 flex items-center text-sm">
    <div className="marquee">{items.map((p,i)=><span key={i} className="px-5 whitespace-nowrap">{p.emoji} {p.name} {taka(p.price)}/{p.unit.replace("প্রতি ","")}{" "}
      <b className={p.change>0?"text-green-400":p.change<0?"text-red-400":"text-gray-400"}>{pct(p.change)}</b></span>)}</div></div>);
}
