"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getCategories, useAsync } from "@/lib/api";
import { banglaDate } from "@/lib/bn";
export default function Navbar(){
  const path=usePathname();const router=useRouter();
  const {data:session,isPending}=authClient.useSession();
  const {data:cats}=useAsync(getCategories,[]);
  const out=async()=>{await authClient.signOut();toast.success("সফলভাবে সাইন আউট হয়েছে");router.push("/");};
  return(<header className="bg-base-100 border-b sticky top-0 z-30">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <Link href="/" className="leading-tight"><div className="font-bold text-lg sm:text-xl text-primary">🛒 বাজার দর</div>
        <div className="text-xs text-gray-500" suppressHydrationWarning>{banglaDate()}</div></Link>
      <div className="flex items-center gap-2">
        {isPending?<div className="skeleton h-8 w-24"/>:session?<>
          <Link href="/profile" className="btn btn-ghost btn-sm sm:btn-md">{session.user.name}</Link>
          <button onClick={out} className="btn btn-outline btn-primary btn-sm sm:btn-md">সাইন আউট</button></>:<>
          <Link href="/signin" className="btn btn-outline btn-primary btn-sm sm:btn-md">সাইন ইন</Link>
          <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link></>}
      </div></div>
    <nav className="max-w-6xl mx-auto px-4 pb-2 flex gap-2 overflow-x-auto">
      <Link href="/" className={`btn btn-sm ${path==="/"?"btn-primary":"btn-ghost"}`}>সব</Link>
      {cats?.map(c=><Link key={c.slug} href={`/category/${c.slug}`} className={`btn btn-sm whitespace-nowrap ${path===`/category/${c.slug}`?"btn-primary":"btn-ghost"}`}>{c.emoji} {c.name}</Link>)}
    </nav></header>);
}
