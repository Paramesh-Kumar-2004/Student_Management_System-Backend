const User = require("../Models/UserModel")
const CatchAsyncError = require("../Middlewares/CatchAsyncError")
const ErrorHandler = require("../Utils/ErrorHandler")



const addChar = CatchAsyncError(async (req, res, next) => {
    try {

        const { name, nickname, village, orgin } = req.body;
        if (!name || !nickname || !village || !orgin) {
            return res.status(417).json({
                "message": "Some Fields Are Missing"
            })
        }

        const user = await User.create({ name, nickname, village, orgin })

        if (user) {
            res.json({
                "message": "User Created Successfully",
                user
            })
        }

    } catch (error) {
        next(new ErrorHandler(error, 404))
    }
})


const getSingleChar = CatchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(404).json({
                "id": id,
                "message": "Given Id Is Not Valid"
            })
        }

        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({
                "id": id,
                "message": "Character Not Found For Given ID"
            })
        }

        res.status(200).json({
            "message": "Success",
            user
        })

    }
    catch (error) {
        next(new ErrorHandler(error, 404))
    }
})


const getChar = CatchAsyncError(async (req, res, next) => {
    try {

        // const { id } = req.query;

        // if (id) {
        //     const characters = await User.findById(id)

        //     if (!characters) {
        //         return res.status(200).json({
        //             "id": id,
        //             "message": "Character Not Found For Given id",
        //         })
        //     }

        //     return res.status(200).json({
        //         "message": "Character Found Successfully",
        //         "data": characters
        //     })
        // }

        const characters = await User.find().select("+name")

        if (!characters) {
            return res.status(404).json({
                "message": "Users Not Found"
            })
        }

        return res.status(200).json({
            "messgae": "Characters Found Successfully",
            "characters": characters.length,
            "data": characters
        })

    }
    catch (error) {
        next(new ErrorHandler(error, 404))
    }
})


const delChar = CatchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;

        const characters = await User.findByIdAndDelete(id)
        if (!characters) {
            return res.status(404).json({
                "id": id,
                "message": "Character Not Found For Given Id To Delete"
            })
        }

        return res.status(200).json({
            "message": "Character Deleted Successfully",
            characters
        })

    } catch (error) {
        next(new ErrorHandler(error, 404))
    }
})


const updateChar = CatchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const char = await User.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        )

        if (!char) {
            return res.status(404).json({
                "id": id,
                "message": "Character Not Found For Given Id To Update"
            })
        }

        return res.status(200).json({
            "message": "Character Updated Successfully",
            char
        })

    } catch (error) {
        next(new ErrorHandler(error, 401))
    }
})



module.exports = { addChar, getChar, delChar, updateChar, getSingleChar }