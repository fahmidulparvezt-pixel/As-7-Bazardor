import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
export const metadata={title:"বাজার দর — BazarDor",description:"প্রয়োজনীয় পণ্যের দাম এক নজরে।"};
export default function Root({children}:{children:React.ReactNode}){
  return(<html lang="bn" data-theme="bazar"><head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"/></head>
    <body className="bg-base-200 min-h-screen flex flex-col"><Toaster position="top-right"/>
    <Navbar/><Ticker/><main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">{children}</main><Footer/></body></html>);
}
