const mongoose = require("mongoose")
require("dotenv").config()


const dbUser = process.env.DBUSER
const dbPassword = process.env.DBPASSWORD

const conn = async () => {
  try {
    const dbConn = mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@reactgram.txnqvdv.mongodb.net/?retryWrites=true&w=majority`
    )

    console.log('Conectou ao banco')
    return dbConn
  } catch (error) {
    console.log("error")
  }
}

conn()

module.exports = conn