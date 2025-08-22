const { Router } = require("express")
const verifyToken = require("../middlewares/verifyToken")
const router = Router()
const { createTask, getTask, getTaskById, updateTask, deleteTask } = require("../controllers/todoController.js")


router.get("/todo", verifyToken, getTask)
router.post("/todo", verifyToken, createTask)

router.get("/todo/:id", verifyToken, getTaskById)

router.put("/todo/:id", verifyToken, updateTask)
router.delete("/todo/:id", verifyToken, deleteTask)



module.exports = router