import express from "express";
import {
    authentication,
    authorization
} from "../middlewares/auth.middleware.js";
import {
    updateMyProfile,
    deleteMyAccount,
    getMyProfile,
    getStudentById,
    getAllUsers,
    becomeTeacher,
    approveTeacher,
    getRoleRequests,
} from "../controllers/user.controllers.js";


const router = express.Router()


// Protected Routes
router.get("/me", authentication, getMyProfile);
router.patch("/me", authentication, updateMyProfile);
router.delete("/me", authentication, deleteMyAccount);
router.get("/all", authentication, getAllUsers)
router.patch('/become-teacher', authentication, becomeTeacher)

// Admin Routes
router.get("/one/:userId",
    authentication, authorization(["teacher", "superadmin"]),
    getStudentById
)
router.get("/requests",
    authentication, authorization(["superadmin"]),
    getRoleRequests
)
router.patch("/approve/:teacher",
    authentication, authorization(["superadmin"]),
    approveTeacher
)

export default router