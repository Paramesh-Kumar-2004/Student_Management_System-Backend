import mongoose from "mongoose";



const ClassSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


export const Class = mongoose.model("Class", ClassSchema)