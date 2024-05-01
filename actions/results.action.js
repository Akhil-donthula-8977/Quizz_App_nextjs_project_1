"use server"
import { Result } from "@/app/(models)/result";
import { SelectedAnswer } from "@/app/(models)/selectedAnswer";
import { connectToDB } from "@/lib/db"
import { revalidatePath } from "next/cache";
const answersConstant = {
  'a': "optionA",
  'b': "optionB",
  'c': "optionC",
  'd': "optionD",
  'A': "optionA",
  'B': "optionB",
  'C': "optionC",
  'D': "optionD"
}
export async function setResultForQuizz(userId, quizzCode) {
  try {
    await connectToDB();
    const check =await Result.findOne({ StudentId:userId, quizId:quizzCode })
    const answers=await SelectedAnswer.find({ studentId:userId })
        .select({ questionId: 1, option: 1, quizzId: 1 })
        .populate({
          path: 'questionId',
        }).populate({
          path: 'quizzId',
        }).exec()
    let res;
    let marks = 0;
    for (let i in answers) {
      if (answersConstant[answers[i].questionId.correctoption] == answers[i].option) marks++;
    }
    if (!check) {
      const totalmarks=answers[0].quizzId.noOfMarks ? answers[0].quizzId.noOfMarks : 10
      console.log(totalmarks) 
      res = await Result.create({
        quizId: quizzCode,
        StudentId:userId,
        totalMarks:totalmarks,
        gainedMarks:marks
      })
    }
    else {
      console.log("update entered")
     res= await Result.findByIdAndUpdate(check._id,{gainedMarks:marks})
    }
    revalidatePath("/");
    return JSON.parse(JSON.stringify(res)) ;
  }
  catch (e) {

  }
}

export async function getAllResultData(userId) {
  try {
    await connectToDB();
    console.log(userId)
    const resultData = await Result.find({ StudentId: userId })
    .populate({
        path: 'quizId',
        model: 'Quizz',
        populate: {
            path: 'incharge',
            model: 'Teacher',
            select: 'name email'
        }
    })
    .sort({ 'quizId.deadline': 1 }) // Sort by deadline in ascending order
    .exec();

  
  console.log(resultData); // Log the populated resultData to inspect the populated fields
  
    console.log(resultData)
    return JSON.parse(JSON.stringify(resultData));

  }
  catch (e) {

  }


}