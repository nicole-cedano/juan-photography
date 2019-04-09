const express = require("express")
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 7000

//middleware 
app.use(express.json())
app.use(morgan("dev"))

//Connect to DB
mongoose.connect("mongodb://localhost:27017/juansphotography", {useNewUrlParser: true}, () => {
    console.log( `[+] Connected to the DB.`)
})


// Routes
app.use("/api", expressJwt({secret: process.env.SECRET}))
app.use("/adminAuth", require("./routes/authRouter.js"))
app.use("/images", require("./routes/imageRouter.js"))
app.use("/videos", require('./routes/videoRouter.js'))
app.use("/contact", require('./routes/contactRouter.js'))

//Global Err Handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

//SERVER LISTEN
app.listen(PORT, ()=> {
    console.log(`[o] Server is running on Port ${PORT}`)
})


