"use client";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getProducts, useAsync } from "@/lib/api";
import { taka, pct } from "@/lib/bn";
import { badge } from "@/components/ProductCard";
import NotFound from "@/components/NotFound";
export default function Detail({params}:{params:Promise<{slug:string}>}){
  const {slug}=use(params);const router=useRouter();
  const {data:session,isPending}=authClient.useSession();
  useEffect(()=>{if(!isPending&&!session){toast.error("বিস্তারিত দেখতে লগইন করুন");router.replace("/signin");}},[isPending,session]);
  const {data,loading}=useAsync(()=>getProducts(),[]);
  if(isPending||loading||!session) return <div className="space-y-4"><div className="skeleton h-32"/><div className="skeleton h-24"/><div className="skeleton h-48"/></div>;
  const p=data?.find(x=>x.slug===slug||x.id===slug);
  if(!p) return <NotFound msg="পণ্যটি খুঁজে পাওয়া যায়নি"/>;
  return(<div className="space-y-6">
    <div className="card bg-base-100 shadow"><div className="card-body">
      <div className="flex items-center gap-4"><span className="text-6xl">{p.emoji}</span>
        <div><h1 className="text-2xl font-bold">{p.name}</h1><p className="text-gray-600">{p.description}</p></div></div>
      <div className="flex flex-wrap gap-2 items-center">{p.category&&<span className="badge badge-outline">{p.category}</span>}<span className="badge badge-ghost">{p.unit}</span>
        <span className={`badge ${badge(p.change)} text-white`}>{pct(p.change)}</span></div></div></div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[["সর্বনিম্ন দাম",p.min],["সর্বোচ্চ দাম",p.max],["গড় দাম",p.avg]].map(([l,v])=>
        <div key={l as string} className="stat bg-base-100 shadow rounded-box"><div className="stat-title">{l}</div><div className="stat-value text-primary text-2xl">{taka(Math.round(v as number))}</div></div>)}</div>
    <div className="card bg-base-100 shadow"><div className="card-body"><h2 className="font-bold text-lg">বাজারভিত্তিক আজকের দাম</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{p.markets.map((m,i)=>
        <div key={i} className="border rounded-lg p-3"><div className="font-medium">{m.name}</div><div className="text-xs text-gray-500">{m.division}</div><div className="mt-1 font-bold text-primary">{taka(m.min)} – {taka(m.max)}</div></div>)}
        {!p.markets.length&&<p className="text-gray-500">বাজারভিত্তিক তথ্য নেই</p>}</div></div></div></div>);
}
