"use client"
import React from 'react'
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const AddDialog = () => {
   const [code,setCode]=useState();
   const handleChange = (e) => {
    const { name, value } = e.target;
    setCode(value);
};
    return (
        <div>
            <Dialog className="mb-3 md:ml-2" >
                <DialogTrigger >
                    <Button className="bg-black text-white hover:text-black hove:bg-white border border-[1px] border-black" >Enter Quizz code</Button> </DialogTrigger>
                <DialogContent className="max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Enter the quizzz code</DialogTitle>
                        <DialogDescription>
                            Please enter a valid quizz code:
                        </DialogDescription>
                        <input
                        value={code}
                        name="code"
                        onChange={handleChange}
                         className='border text-sm p-1 pl-2 border-slate-400 rounded-[6px]  '></input>
                        <DialogFooter>
                            <Link type="submit" href={`/exams/${code}`}>enter quizz</Link>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddDialog