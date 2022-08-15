const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, 'hello', { expiresIn: '3d'})
}


//post user
const createUser = async (req, res) =>{
    
    const {email, password} = req.body
    try{
        if(!email || !password){
            throw Error('all fields must be filled')
        }

        const exists = await User.findOne({email})

        if(exists){
            throw Error('email already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({email, password: hash})

        const token = createToken(user._id)

        res.status(200).json({email, token})
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//signin user
const loginUser = async (req, res) =>{

    const {email, password} = req.body
    try{
        if(!email || !password){
            throw Error('all fields must be filled')
        }

        const user = await User.findOne({email})

        if(!user){
            throw Error('incorrect email')
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match){
            throw Error('incorrect password')
        }

        const token = createToken(user._id)

        res.status(200).json({email, token})
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    createUser,
    loginUser,
}