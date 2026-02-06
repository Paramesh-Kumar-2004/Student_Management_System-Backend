import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import APIFeatures from "../utils/apiFeatures.js";
import asyncHandler from "../utils/asyncHandler.js";



const updateMyProfile = asyncHandler(async (req, res) => {
    console.log("Entered Into Update User Details Controller")
    const { _id } = req.user;
    const {
        fullName,
        phoneNumber,
    } = req.body

    if (!_id || !fullName || !phoneNumber) {
        throw new ApiError(404, "Enter All The Fields")
    }

    const user = await User.findByIdAndUpdate(_id,
        { fullName, phoneNumber },
        { new: true }
    )

    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    res.status(200).json({
        message: "User Updated Successfully",
        user
    })
})


const getMyProfile = asyncHandler(async (req, res) => {
    console.log("Entered Into Get My Profile Controller")
    const { _id } = req.user;
    const user = await User.findOne({ _id })

    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    res.status(200).json({
        message: "My Profile Fetched Successfully",
        user
    })
})


const deleteMyAccount = asyncHandler(async (req, res) => {
    console.log("Entered Into Delete My Account Controller")

    const { _id } = req.user;

    if (!_id) {
        throw new ApiError(404, "Id Is Required")
    }

    const deleteAccount = await User.findByIdAndUpdate(
        _id,
        { isDeleted: true },
        { new: true }
    )
    if (!deleteAccount) {
        throw new ApiError(404, "User Not Found")
    }

    res.status(200).json({
        message: "User Deleted Successfully",
        deleteAccount
    })
})


// Get All 
const getAllUsers = asyncHandler(async (req, res) => {
    console.log("Entered Into Get All Users Controller")

    const features = new APIFeatures(
        User.find().select("-isDeleted"),
        req.query
    ).filter().search(["fullName"]).paginate()
    const users = await features.query
    const countDocument = await User.countDocuments()

    res.status(200).json({
        message: "Users Fetched Successfully",
        totalDocument: countDocument,
        count: users.length,
        users
    })
})


const getStudentById = asyncHandler(async (req, res) => {
    console.log("Entered Into Get User By Id Controller")
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(404, "User Id Is Required")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    res.status(200).json({
        message: "User Fetched Successfully By User ID",
        user
    })
})


// Role Request
const becomeTeacher = asyncHandler(async (req, res) => {
    console.log("Entered Into Become A Teacher")
    const id = req.user._id

    const request = await User.findByIdAndUpdate(
        id,
        { roleRequest: true },
        { new: true }
    )
    if (!request) {
        throw new ApiError(404, "User Not Found")
    }

    res.status(200).json({
        message: "Role Request Send Successfully"
    })
})


// Admin, SuperAdmin
const getRoleRequests = asyncHandler(async (req, res) => {
    console.log("Entered Into Get Role Requests")
    const requests = await User.find({ roleRequest: true })
        .select("fullName email department roleRequest")

    res.status(200).json({
        message: "Requests Fetched Successfully",
        requests
    })
})


const approveTeacher = asyncHandler(async (req, res) => {
    console.log("Entered Into Approve Teacher")
    const { teacher } = req.params

    const approve = await User.findByIdAndUpdate(
        teacher,
        { role: "teacher", roleRequest: false },
        { new: true }
    )
    if (!approve) {
        throw new ApiError(404, "User Role Request Not Found")
    }

    res.status(200).json({
        message: "Role Update Successfully"
    })

})



export {
    updateMyProfile,
    getMyProfile,
    deleteMyAccount,
    getStudentById,
    getAllUsers,
    becomeTeacher,

    // Admin
    getRoleRequests,
    approveTeacher,
}