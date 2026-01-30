const express = require("express")
const path = require("path")
const bodyparser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv").config()

// Middlewares
const ErrorMiddlware = require("./Middlewares/Error")

const app = express()

app.use(cors())

// Data Passing And Receving
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes Import
const UserRoutes = require("./Routes/UserRoutes")
// DB Import
const ConnectDB = require("./DBConfig/DbConfig")

// Routes
app.use("/api/v1", UserRoutes)



// Data Base Connection
ConnectDB()

app.use(ErrorMiddlware);


app.listen(process.env.PORT, () => {
    console.log(`Server Running At The Port : http://localhost:${process.env.PORT}`)
})
