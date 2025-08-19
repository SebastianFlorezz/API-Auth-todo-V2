const express = require("express")
const app = express()
require("dotenv").config()
const routes = require("./routes/index.js")

port = process.env.PORT

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api",routes)

app.listen(port, (req,res)=>{
    console.log("Server running in port:", port)
})

