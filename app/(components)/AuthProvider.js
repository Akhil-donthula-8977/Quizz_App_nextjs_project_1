"use client"
import { SessionProvider } from "next-auth/react";


// this is only for client side
const AuthProvider=({children})=>{
    return <SessionProvider>{children}</SessionProvider>
}
export default AuthProvider;