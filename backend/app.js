require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors");
const e = require("cors");

const port = process.env.PORT;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

const router =require("./routers/Router")

app.use(router)

app.listen(port,() => {
  console.log(`App rodando na porta ${port}`)
})