import mongoose from "mongoose";
import bcrypt from "bcrypt"



const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        enum: ["CSE", "IT", "MECH", "EEE", "ECE", "CIVIL", "CHEMICAL", "PHYSICS", "OTHERS"],
        required: true,
        default: "OTHERS"
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "superadmin"],
        default: "student"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String,
    roleRequest: Boolean
}, { timestamps: true })


UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});


UserSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


export const User = mongoose.model("User", UserSchema);