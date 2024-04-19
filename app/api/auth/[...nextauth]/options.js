import { Student } from "@/app/(models)/student"
import { Teacher } from "@/app/(models)/teacher"
import { connectToDB } from "@/lib/db";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation"
export const options = {
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
      },
      async authorize(credentials){
       console.log(credentials)
        try{
               let flag="";
               await connectToDB();
               let foundUser=null;
              if(credentials.role=="TEACHER"){
                foundUser=await Teacher.findOne({email:credentials.email}).lean().exec()
              }
              else if(credentials.role=="STUDENT"){
                foundUser=await Student.findOne({email:credentials.email}).lean().exec()
              }
              console.log("credential",credentials)
              if(foundUser){
                 console.log("found user",foundUser)
                    delete foundUser.password
                    return foundUser;
              }
        }
        catch(e){
        console.log(e)
        }
        return null;
    }
    })
  ],
  callbacks:{
  
         async jwt({token,user}){
          console.log("user jwt",user)
          if(user) {
            token.role=user.role
            token._id=user._id
          }
          return token;
      },
      //client side
      async session({session,token}){
          console.log("session user",session?.user)
          if(session?.user){
            session.user.role=token.role
             session.user._id=token._id
          }
          return session
      }
  },
  pages:{
    signIn:"/auth/signIn",
    
  }
}