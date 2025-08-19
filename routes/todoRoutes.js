const { Router } = require("express")
const router = Router()

router.get("/todo", (req,res)=>{
    res.send("Hola")
})


module.exports = router