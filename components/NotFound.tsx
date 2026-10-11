import Link from "next/link";
export default function NotFound({msg="পাতাটি খুঁজে পাওয়া যায়নি"}:{msg?:string}){
  return(<div className="text-center py-20"><div className="text-6xl font-bold text-primary">৪০৪</div>
    <p className="my-4 text-lg">{msg}</p><Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link></div>);
}
