"use client";
import Image from "next/image";
import { getProducts, useAsync } from "@/lib/api";
import { Grid, GridSkeleton } from "@/components/ProductCard";
export default function Home(){
  const {data,loading}=useAsync(()=>getProducts(),[]);
  const risers=[...(data??[])].filter(p=>p.change>0).sort((a,b)=>b.change-a.change).slice(0,6);
  const fallers=[...(data??[])].filter(p=>p.change<0).sort((a,b)=>a.change-b.change).slice(0,6);
  const S=({t,id,sub,items}:{t:string;id?:string;sub?:string;items:any[]})=>(<section id={id} className="mt-10 scroll-mt-28">
    <h2 className="text-2xl font-bold">{t}</h2>{sub&&<p className="text-gray-500 mb-3">{sub}</p>}<div className="mt-3">{loading?<GridSkeleton n={6}/>:<Grid items={items}/>}</div></section>);
  return(<>
    <section className="grid md:grid-cols-2 items-center gap-6 bg-base-100 rounded-2xl p-6 md:p-10 shadow">
      <div><p className="text-primary font-semibold text-sm">আজকের বাজার দর</p>
        <h1 className="text-3xl md:text-5xl font-bold my-3 leading-tight">প্রয়োজনীয় পণ্যের দাম এক নজরে</h1>
        <p className="text-gray-600 mb-5">চাল, ডাল, সবজি, মাছ ও মাংসের দৈনিক বাজার দর — তুলনা করুন, সিদ্ধান্ত নিন।</p>
        <a href="#সব-পণ্য" className="btn btn-primary">সব পণ্য দেখুন</a></div>
      <div className="flex justify-center"><Image src="/hero.png" alt="বাজার" width={315} height={263} priority/></div></section>
    <S t="আজ দাম বেড়েছে ▲" items={risers}/><S t="আজ দাম কমেছে ▼" items={fallers}/>
    <S t="সব পণ্য" id="সব-পণ্য" sub="আজকের সব পণ্যের বাজার দর" items={data??[]}/></>);
}
