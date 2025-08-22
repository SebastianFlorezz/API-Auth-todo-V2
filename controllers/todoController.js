const prisma = require("../prismaClient.js")


const createTask = async (req,res) => {
    const { title, description, priority, dueDate} = req.body

    if(!title || !priority) {
        return res.status(400).json({
            error: "Bad request",
            message: "Fields missing",
            timestamp: new Date().toISOString()
        })
    }

    const userId = req.user.id

    try {
        const newTask = await prisma.todo.create({
            data: {
                userId,
                title,
                description,
                priority,
                dueDate
            }
        })

        res.status(201).json({
            message: "Task created successfully",
            data: newTask,
            timestamp: new Date().toISOString()
        })
    } catch (error){
        res.status(500).json({
            error: "Internal Server Error",
            message: "Server couldnt create the task",
            timestamp: new Date().toISOString()
        })
    }
}


// Read all task by user

const getTask = async (req,res) =>{
    const userId = req.user.id

    try {
        const tasks = await prisma.todo.findMany({
            where: {userId},
            orderBy: { createdAt: "desc"}
        })

        res.status(200).json({
            message: "Tasks retrieved succesfully",
            data: tasks,
            timestamp: new Date().toISOString()
        })
    } catch(error){
        res.status(500).json({
            error: "Internal Serve Error",
            message: "Server couldnt fetch tasks",
            timestamp: new Date().toISOString()
        })
    }
}


const getTaskById = async (req, res) =>{
    const { id } = req.params
    const userId = req.user.id

    try{
        const task = await prisma.todo.findFirst({
            where: {id: Number(id), userId}
        })
        
        if(!task){
            return res.status(404).json({
                error: "Not Found",
                message: "Task not found",
                timestamp: new Date().toISOString()
            })
        }

        res.status(200).json({
            message: "Task retrieved successfully",
            data: task,
            timestamp: new Date().toISOString()
        })
    } catch (error){
        res.status(500).json({
            error: "Internal Server Error",
            message: "Server couldnt fetch the task",
            timestamp: new Date().toISOString
        })
    }
}

//update task

const updateTask = async (req,res)=>{
    const { id } = req.params
    const { title, description, priority, status, dueDate} = req.body
    const userId = req.user.id


    try {
        const task = await prisma.todo.findFirst({
            where: { id: Number(id), userId}
        })

        if(!task){
            res.status(404).json({
                error: "Not found",
                message: "Task not found",
                timestamp: new Date().toISOString
            })
        }

        const updateTask = await prisma.todo.update({
            where: { id: Number(id)},
            data: { title, description, priority, status, dueDate}
        })

        res.status(200).json({
            message: "Task updated successfully",
            data: updateTask,
            timestamp: new Date().toISOString()
        })
    } catch(error){
        res.status(500).json({
            error: "Internal Server Error",
            message: "Server couldnt update the task",
            timestamp: new Date().toISOString()
        })
    }
}


// delete task


const deleteTask = async (req,res) =>{
    const { id } = req.params
    const userId = req.user.id

    try {
        const task = await prisma.todo.findFirst({
            where: {id: Number(id), userId}
        })

        if(!task){
            res.status(404).json({
                error: "Not found",
                message: "Task not found",
                timestamp: new Date().toISOString()
            })
        }

        await prisma.todo.delete({where: {id: Number(id)}})

        res.status(200).json({
            message: "Task deleted successfully",
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: "Server couldnt delete the task",
            timestamp: new Date().toISOString()
        })
    }
}

module.exports = {
  createTask,
  getTask,
  getTaskById,
  updateTask,
  deleteTask
}