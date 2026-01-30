const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter The Name"],
        // select: false
    },
    nickname: {
        type: String,
        required: [true, "Enter The Name"],
        unique: [true, "This Nick Name Is Already Present"]
    },
    village: String,
    orgin: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("user", UserSchema)

