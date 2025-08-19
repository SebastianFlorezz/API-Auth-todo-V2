const { Router } = require("express")
const router = Router()
const authRoutes = require("./authRoutes.js")
const todoRoutes = require("./todoRoutes.js")

router.use(authRoutes,todoRoutes)

module.exports = router