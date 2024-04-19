"use server"
import { Teacher } from "@/app/(models)/teacher";
import { connectToDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function signUpTeacher(data){
      
    await connectToDB()
    // validation
    //store in data
    console.log(data)
     const userr=await Teacher.create(data);
     revalidatePath("/")
     return JSON.parse(JSON.stringify(userr))
    }