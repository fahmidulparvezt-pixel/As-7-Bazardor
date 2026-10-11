"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function Profile(){
  const {data:s,isPending}=authClient.useSession();const router=useRouter();
  useEffect(()=>{if(!isPending&&!s){toast.error("প্রথমে লগইন করুন");router.replace("/signin");}},[isPending,s]);
  if(!s) return <div className="skeleton h-48 max-w-md mx-auto"/>;
  return(<div className="max-w-md mx-auto card bg-base-100 shadow"><div className="card-body items-center text-center gap-2">
    {s.user.image?<img src={s.user.image} alt="" className="w-24 h-24 rounded-full"/>:<div className="w-24 h-24 rounded-full bg-primary text-white text-4xl flex items-center justify-center">{s.user.name?.[0]}</div>}
    <h1 className="text-xl font-bold">{s.user.name}</h1><p className="text-gray-600">{s.user.email}</p>
    <Link href="/profile/update" className="btn btn-primary mt-2">তথ্য আপডেট করুন</Link></div></div>);
}
