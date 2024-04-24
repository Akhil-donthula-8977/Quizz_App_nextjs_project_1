import mongoose, { Schema } from "mongoose";
const TeacherSchema=new mongoose.Schema({
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
        default:"TEACHER"
    },
    premiumUser:{
        type:Boolean,
        default:false
    },
    

})

export const Teacher= mongoose.models.Teacher|| mongoose.model("Teacher",TeacherSchema,"Teacher")
