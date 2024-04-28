"use server"
import { Student } from "@/app/(models)/student";
import { connectToDB } from "@/lib/db";
import { handleError } from "./quizz.action";
import mongoose from "mongoose";
import { Quizz } from "@/app/(models)/quiz";
import { revalidatePath } from "next/cache";

export async function signUpStudent(data) {
    await connectToDB()
    const dataa = await Student.create(data);
    revalidatePath("/")
    return JSON.parse(JSON.stringify(dataa));
}
export async function studentExamAttempt(quizzId,studentId) {
    try {
        await connectToDB();
        const data = await Student.findOne(
            { _id: studentId, submittedQuizzes: { $in: [quizzId] } }
        ).select({ submittedQuizzes: 1 })
        console.log("check student attempt",data);
        return data;
    }
    catch (e) {
        console.log(e)
    }
}

export async function submitQuizz(quizzId, studentId) {
    try {
        await connectToDB();
        const res = await Student.findOneAndUpdate(
            { _id: studentId },
            {
                $push: { submittedQuizzes: quizzId }
            },
            { new: true } // to return the updated document
        );
        return res;
    }
    catch (e) {

    }
}
