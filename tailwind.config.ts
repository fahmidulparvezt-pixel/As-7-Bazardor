import type { Config } from "tailwindcss";
import daisyui from "daisyui";
export default { content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
  theme:{extend:{}}, plugins:[daisyui],
  daisyui:{themes:[{bazar:{primary:"#16a34a","primary-content":"#fff",secondary:"#f59e0b",accent:"#0ea5e9",neutral:"#1f2937","base-100":"#ffffff","base-200":"#f5f7f4",success:"#16a34a",error:"#dc2626"}}]}} satisfies Config;
