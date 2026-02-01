const express = require("express")
const path = require("path")
const bodyparser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv").config()

// Middlewares
const ErrorMiddlware = require("./src/Middlewares/Error.js")

const app = express()


// Data Passing And Receving & Default Middleware
app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes Import
const UserRoutes = require("./src/Routes/UserRoutes.js")
// DB Import
const ConnectDB = require("./src/DBConfig/DbConfig.js")

// Routes
app.use("/api/v1", UserRoutes)



// Data Base Connection
ConnectDB()

app.use(ErrorMiddlware);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Profile Manager Server Started"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server Running At The Port : http://localhost:${process.env.PORT}`)
})
