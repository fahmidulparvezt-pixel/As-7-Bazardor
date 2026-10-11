"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function AuthForm({mode}:{mode:"signin"|"signup"}){
  const up=mode==="signup";const router=useRouter();const [busy,setBusy]=useState(false);
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();const f=new FormData(e.currentTarget);
    const name=String(f.get("name")||""),email=String(f.get("email")),password=String(f.get("password"));
    if(password.length<8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setBusy(true);
    const {error}=up?await authClient.signUp.email({name,email,password}):await authClient.signIn.email({email,password});
    setBusy(false);
    if(error) return toast.error(error.message||"কিছু ভুল হয়েছে");
    toast.success(up?"নিবন্ধন সফল! এখন সাইন ইন করুন":"সাইন ইন সফল হয়েছে");
    router.push(up?"/signin":"/");
  };
  const social=(provider:"google"|"github")=>authClient.signIn.social({provider,callbackURL:"/"});
  return(<div className="max-w-md mx-auto card bg-base-100 shadow"><div className="card-body">
    <h1 className="text-2xl font-bold text-center">{up?"নতুন অ্যাকাউন্ট তৈরি করুন":"সাইন ইন করুন"}</h1>
    <form onSubmit={submit} className="space-y-3">
      {up&&<input name="name" required placeholder="নাম" className="input input-bordered w-full"/>}
      <input name="email" type="email" required placeholder="ইমেইল" className="input input-bordered w-full"/>
      <input name="password" type="password" required placeholder="পাসওয়ার্ড" className="input input-bordered w-full"/>
      <button disabled={busy} className="btn btn-primary w-full">{busy?<span className="loading loading-spinner"/>:up?"রেজিস্টার":"লগইন"}</button></form>
    <div className="divider">অথবা</div>
    <button onClick={()=>social("google")} className="btn btn-outline w-full">Google দিয়ে চালিয়ে যান</button>
    <button onClick={()=>social("github")} className="btn btn-outline w-full">GitHub দিয়ে চালিয়ে যান</button>
    <p className="text-center text-sm mt-2">{up?<>আগে থেকেই অ্যাকাউন্ট আছে? <Link className="link link-primary" href="/signin">লগইন</Link></>:<>অ্যাকাউন্ট নেই? <Link className="link link-primary" href="/signup">রেজিস্টার</Link></>}</p>
  </div></div>);
}
