require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors");
const e = require("cors");

const port = process.env.PORT;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//conection DB

require('./config/db.js')

//cors
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//routes
const router =require("./routers/Router")

app.use(router)

app.listen(port,() => {
  console.log(`App rodando na porta ${port}`)
})