const D="০১২৩৪৫৬৭৮৯";
export const bn=(v:string|number)=>String(v).replace(/\d/g,d=>D[+d]);
export const taka=(n:number)=>bn(Number(n).toLocaleString("en-US"))+" টাকা";
export const pct=(c:number)=>(c>0?"▲ ":c<0?"▼ ":"— ")+bn(Math.abs(c).toFixed(1))+"%";
export const banglaDate=()=>new Intl.DateTimeFormat("bn-BD",{dateStyle:"full"}).format(new Date());
