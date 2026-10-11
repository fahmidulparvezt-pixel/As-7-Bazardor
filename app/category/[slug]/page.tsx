"use client";
import { use, useState } from "react";
import { getCategories, getProducts, useAsync } from "@/lib/api";
import { Grid, GridSkeleton } from "@/components/ProductCard";
import NotFound from "@/components/NotFound";
export default function Category({params}:{params:Promise<{slug:string}>}){
  const {slug}=use(params);const [sort,setSort]=useState("default");
  const {data,loading}=useAsync(()=>getProducts(slug),[slug]);
  const {data:cats}=useAsync(getCategories,[]);
  const cat=cats?.find(c=>c.slug===slug);
  if(!loading&&!data?.length) return <NotFound msg="এই ক্যাটাগরিতে কোনো পণ্য নেই"/>;
  const items=[...(data??[])];
  if(sort==="asc") items.sort((a,b)=>a.price-b.price); else if(sort==="desc") items.sort((a,b)=>b.price-a.price);
  return(<><div className="flex flex-wrap items-center justify-between gap-3 mb-5">
    <h1 className="text-2xl font-bold">{cat?.emoji} {cat?.name??slug}</h1>
    <label className="flex items-center gap-2 text-sm">সাজান:
      <select className="select select-bordered select-sm" value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select></label></div>
    {loading?<GridSkeleton/>:<Grid items={items}/>}</>);
}
