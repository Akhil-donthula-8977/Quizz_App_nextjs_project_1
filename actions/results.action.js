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
    const answers=await SelectedAnswer.find({ studentId:userId, quizzId:quizzCode })
        .select({ questionId: 1, option: 1, quizzId: 1 })
        .populate({
          path: 'questionId',
        }).populate({
          path: 'quizzId',
        }).exec()
        console.log("answers",answers)
    let res;
    let marks = 0;
    let totalmarks;
    for (let i in answers) {
      //console.log(answersConstant[answers[i].questionId.correctoption] == answers[i].option,answersConstant[answers[i].questionId.correctoption],answers[i].option)
      if (answersConstant[answers[i].questionId.correctoption] == answers[i].option) marks+=answers[i].questionId.marksForQuestion;
    }
    if (!check) {
       totalmarks=answers[0].quizzId.noOfMarks ? answers[0].quizzId.noOfMarks : 10
      res = await Result.create({
        quizId: quizzCode,
        StudentId:userId,
        totalMarks:totalmarks,
        gainedMarks:marks
      })
    }
    else {
      totalmarks=answers[0].quizzId.noOfMarks ? answers[0].quizzId.noOfMarks : 10
     res= await Result.findByIdAndUpdate(check._id,{gainedMarks:marks,totalMarks:totalmarks})
    }
    console.log("totlamarks",totalmarks)
    console.log("marks",marks)
    revalidatePath("/");
    return JSON.parse(JSON.stringify(res)) ;
  }
  catch (e) {

  }
}

export async function getAllResultData(userId) {
  try {
    await connectToDB();
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
   

    return JSON.parse(JSON.stringify(resultData));

  }
  catch (e) {

  }


}

export async function getQuizzResultSummary(userId,quizzCode){
   try{
    console.log(userId,quizzCode)
    const answers=await SelectedAnswer.find({ studentId:userId, quizzId:quizzCode })
    .select({ questionId: 1, option: 1, quizzId: 1 })
    .populate({
      path:'questionId',
    }).populate({
      path: 'quizzId',
    })
    .exec()
    console.log("answers",answers)
    return JSON.parse(JSON.stringify(answers))
      
   }
   catch(e){

   }
}