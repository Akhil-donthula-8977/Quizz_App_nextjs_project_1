"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Work_Sans} from "next/font/google";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navBarLinks } from "@/constants/index.js"
import React, { useEffect, useState } from 'react'
import { signOut } from "next-auth/react";
const WorkSans=Work_Sans({ subsets: ["latin"] });
const NavBar = () => {
  const pathname = usePathname();
const [check,setCheck]=useState(true);
  const regex = /^\/exams\/[0-9a-fA-F]{24}$/;
  useEffect(()=>{
    //http://localhost:3000/exams/661b9d5b507c7ccf44ef4ada   
    if(regex.test(pathname)){
      setCheck(false);
    }
    else setCheck(true);
  },[pathname])
  if(!check)return null
  return (
    <div className={`p-4 border border-b-[1px]  top-0  left-0 w-full bg-white border-gray-300 flex flex-row justify-between ${WorkSans.className}  `}>
      <nav className={`navbar  hidden sm:flex`}>
        {
          navBarLinks.map((e) => {
            return (
              <Link href={e.url} key={e.url}>{e.name}</Link>
            )
          })
        }</nav>
        <DropdownMenu className="bg-white">
  <DropdownMenuTrigger>profile</DropdownMenuTrigger>
  <DropdownMenuContent>

    <DropdownMenuItem className="bg-white opacity-100" onClick={()=>{
      signOut({ callbackUrl: 'http://localhost:3000/Home' })
    }}>sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    </div>
  )
}

export default NavBar