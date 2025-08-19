const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const prisma = require("../prismaClient.js")
const { validate, validateName, validateEmail, validatePassword} = require("../validations/authValidator.js")
const saltRounds = 10

const register = async (req,res) =>{
    const {name, email, password} = req.body

    //required fields
    if(!name || !email || !password) {
        return res.status(400).json({
            error: "Bad request",
            message: "Fields missings",
            timestamp: new Date().toISOString()
        })
    }


    //database validation
    const existingUser = await prisma.user.findUnique({where: { email }})

    if(existingUser) {
        return res.status(409).json({
            error: "Conflict",
            message: "Email is already registered",
            timestamp: new Date().toISOString()
        })
    }

    // regex validations
    const nameValidation = validateName(name)
    if (!nameValidation.isValid) {
        return res.status(400).json({
            error: "Validation Error",
            message: nameValidation.message,
            timestamp: new Date().toISOString()
        })
    }

    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
        return res.status(400).json({
            error: "Validation Error",
            message: emailValidation.message,
            timestamp: new Date().toISOString()
        })
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
        return res.status(400).json({
            error: "Validation Error",
            message: passwordValidation.message,
            timestamp: new Date().toISOString()
        })
    }

    

    try {
        // we hash the password
        const hashedPassword = await bcrypt.hash(password,saltRounds)

        //we send the info to the database with prisma

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        
        const { password:_, ...userWithoutPassword } = newUser

        return res.status(201).json({
            data: userWithoutPassword,
            timestamp: new Date().toISOString()
        })
    } catch (error){
        console.error("Register error", error)
        res.status(500).json({
            error: "Internal server error",
            message: "Could not process register request",
            timestamp: new Date().toISOString()
        })
    }

}

const login = async(req,res) =>{
    const { email, password} = req.body
    // Required fields validation
    if(!email || !password ) {
        return res.status(400).json({
            error: "Bad request",
            message: "Fields missings",
            timestamp: new Date().toISOString()
        })
    }

    try{
        // find if the email exist in the database
        const user = await prisma.user.findUnique({where: { email }})
        

        // if the email doesnt exist
        if(!user) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid email or password", // doesnt specify for security reason
                timestamp: new Date().toISOString()
            })
        }

        // compare the password given by the client and the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password)

        // if the client password doesnt match with the database password
        if(!passwordMatch){
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid email or password", // doesnt specify for security reason
                timestamp: new Date().toISOString()        
            })
        }

        // this is the information i want to store in the token
        const payload = {
            sub: user.id,
            iat: Math.floor(Date.now()/1000),   // issued at
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }

        // create the token with the previous information.
        const token = jwt.sign(payload,JWT_SECRET, { expiresIn: '4h'})

        res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token: {
                    accessToken: token,
                    expiresIn: 14400,
                    tokenType: "Bearer"
                }
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error("Login error",error)
        res.status(500).json({
            error: "Internal Server Error",
            message: "Could not process login request",
            timestamp: new Date().toISOString()
        })
    }
}




module.exports = { register, login}