import mongoose, { Mongoose } from "mongoose";
const resultSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quizz"
    },
    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    totalMarks:{
        type:Number
    },
    gainedMarks:{
        type:Number
    },
    selectedAnswers:[{type:mongoose.Schema.Types.ObjectId,ref:"SelectedAnswer"}]
});

export const Result=mongoose.models.Result || mongoose.model("Result",resultSchema);
