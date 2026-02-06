import { Class } from "../models/class.model.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";



const newStudent = asyncHandler(async (req, res) => {
    console.log("Entered Into New Student")
    const { student } = req.params
    const teacher = req.user._id

    const existingStudent = await User.findById(student)
    if (!existingStudent) {
        throw new ApiError(404, "User Not Found")
    }

    const existingClass = await Class.findOne({ student, teacher })

    if (existingClass) {
        throw new ApiError(400, "He Is Already Your Student")
    }

    if (!student) {
        throw new ApiError(404, "Student Is Required")
    }

    const addNewStudent = await Class.create({ student, teacher })

    res.status(200).json({
        message: "Student Added To Your Class",
    })

})


const getMyStudents = asyncHandler(async (req, res) => {
    console.log("Entered Into Get My Students")
    const teacher = req.user._id

    const students = await Class.find({ teacher })
        .populate({
            path: "student",
            select: "fullName email department phoneNumber"
        })

    res.status(200).json({
        messgae: "My Students List",
        students
    })
})


const getMyTeachers = asyncHandler(async (req, res) => {
    console.log("Entered Into Get My Students")
    const student = req.user._id

    const teachers = await Class.find({ student })
        .populate({
            path: "teacher",
            select: "fullName email department"
        })

    res.status(200).json({
        messgae: "My Students List",
        teachers
    })
})


const removeMyStudent = asyncHandler(async (req, res) => {
    console.log("Entered Into Delete My Student")
    const { student } = req.params
    const teacher = req.user._id

    if (!student) {
        throw new ApiError(404, "Student Is Required")
    }

    const removeStudent = await Class.findOneAndDelete({ student, teacher })
    if (!removeStudent) {
        throw new ApiError(404, "Student Not Found")
    }

    res.status(200).json({
        message: "Student Removed From Your Class"
    })
})



export {
    newStudent,
    getMyStudents,
    getMyTeachers,
    removeMyStudent
}