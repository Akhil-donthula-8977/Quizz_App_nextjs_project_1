import mongoose from "mongoose";

const studentSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"STUDENT"
    },
    incharges:[{type:mongoose.Schema.Types.ObjectId,ref:"Teacher"}],
    quizzes:[{type:mongoose.Schema.Types.ObjectId,ref:"Quizz"}],
    submittedQuizzes:[{type:mongoose.Schema.Types.ObjectId,ref:"Quizz"}],
    results:[{type:mongoose.Schema.Types.ObjectId}] 

})

export const Student= mongoose.models.Student || mongoose.model("Student",studentSchema,"Student");
