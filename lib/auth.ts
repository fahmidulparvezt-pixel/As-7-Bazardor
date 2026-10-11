import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
const db=new MongoClient(process.env.MONGODB_URI!).db();
export const auth=betterAuth({
  database:mongodbAdapter(db),
  emailAndPassword:{enabled:true,autoSignIn:false},
  socialProviders:{
    google:{clientId:process.env.GOOGLE_CLIENT_ID||"",clientSecret:process.env.GOOGLE_CLIENT_SECRET||""},
    github:{clientId:process.env.GITHUB_CLIENT_ID||"",clientSecret:process.env.GITHUB_CLIENT_SECRET||""},
  },
});
