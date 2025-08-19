const { Router } = require("express")
const verifyToken = require("../middlewares/verifyToken")
const router = Router()

router.get("/todo", verifyToken, (req,res)=>{
    res.send("Hola")
})


module.exports = router