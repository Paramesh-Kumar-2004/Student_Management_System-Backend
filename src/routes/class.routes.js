import express from "express";
import {
    getMyTeachers,
    getMyStudents,
    newStudent,
    removeMyStudent
} from "../controllers/class.controller.js";
import {
    authentication,
    authorization
} from "../middlewares/auth.middleware.js";


const router = express.Router()


router.post("/:student",
    authentication, authorization(["teacher"]),
    newStudent
)
router.get("/",
    authentication, authorization(["teacher", "student"]),
    getMyStudents
)
router.get("/my-teacher",
    authentication, authorization(["student"]),
    getMyTeachers
)
router.delete("/:student",
    authentication, authorization(["teacher"]),
    removeMyStudent
)


export default router;