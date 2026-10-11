import Link from "next/link";
import { Product } from "@/lib/api";
import { taka, pct } from "@/lib/bn";
export const badge=(c:number)=>c>0?"badge-success":c<0?"badge-error":"badge-ghost";
export default function ProductCard({p}:{p:Product}){
  return(<Link href={`/product/${p.slug}`} className="card bg-base-100 shadow hover:shadow-lg transition">
    <div className="card-body p-4 gap-1"><div className="text-4xl">{p.emoji}</div>
      <h3 className="font-semibold">{p.name}</h3><p className="text-xs text-gray-500">{p.unit}</p>
      <div className="flex items-center justify-between mt-2"><span className="text-xs text-gray-500">আজকের দাম</span>
        <span className={`badge ${badge(p.change)} badge-sm text-white`}>{pct(p.change)}</span></div>
      <div className="font-bold text-primary">{taka(p.price)}</div></div></Link>);
}
export const Grid=({items}:{items:Product[]})=><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{items.map(p=><ProductCard key={p.id} p={p}/>)}</div>;
export const GridSkeleton=({n=8}:{n?:number})=><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{Array.from({length:n},(_,i)=><div key={i} className="skeleton h-36 w-full"/>)}</div>;
