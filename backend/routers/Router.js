const express = require("express")
const router = express()

router.use("/api/users", require("./UserRouters"))
router.use("/api/photos", require("./PhotoRoutes"))

const validade = require("../middlewares/handleValidation")

router.get("/", (req,res) => {
  res.send("API Working")
})

module.exports  = router