"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function Update(){
  const {data:s,isPending}=authClient.useSession();const router=useRouter();
  if(isPending) return <div className="skeleton h-40 max-w-md mx-auto"/>;
  if(!s){router.replace("/signin");return null;}
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();const name=String(new FormData(e.currentTarget).get("name")).trim();
    if(!name) return toast.error("নাম দিন");
    const {error}=await authClient.updateUser({name});
    if(error) return toast.error(error.message||"আপডেট ব্যর্থ");
    toast.success("তথ্য আপডেট হয়েছে");router.push("/profile");
  };
  return(<form onSubmit={submit} className="max-w-md mx-auto card bg-base-100 shadow"><div className="card-body">
    <h1 className="text-xl font-bold">তথ্য আপডেট করুন</h1>
    <input name="name" defaultValue={s.user.name} className="input input-bordered w-full" placeholder="নাম"/>
    <button className="btn btn-primary">Update Information</button></div></form>);
}
