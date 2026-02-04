import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Database
import connectDB from "./src/dB/connectDB.js"

// Routes
import AuthRoutes from "./src/routes/auth.routes.js"
import UserRoutes from "./src/routes/user.routes.js"
import ClassRoutes from "./src/routes/class.routes.js"


// Middlewares
import errorMiddleware from "./src/middlewares/error.middleware.js"
import { authentication } from "./src/middlewares/auth.middleware.js"


// Loading Environment Variables First
dotenv.config()

const app = express()


// Default Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static("public"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


// Connect DB
connectDB()


// Routes
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/user", UserRoutes)
app.use("/api/v1/class", ClassRoutes)


// Health Check
app.get("/", authentication, (req, res) => {
    res.status(200).json({
        message: "Tournament Server Running..."
    })
})

// 404 API Not Found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API Not Found"
    })
})


// Error Middleware
app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server Started At The Port : ${PORT}`)
})