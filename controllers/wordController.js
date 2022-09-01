const mongoose = require('mongoose')
const Word = require('../models/wordModel')

//add a word
const addWord = async (req, res) =>{

    const {word} = req.body
    console.log(word)
    const user_id = req.user._id

    try{

        if(!word){
            throw Error('please provide a word')
        }

        const exists = await Word.findOne(({user_id: user_id, word: word}))
        if(exists){
            throw Error('word already added')
        }


        const newWord = await Word.create({word, user_id})
        res.status(200).json({newWord, message: 'word saved'})

    }catch(error){

        console.log(error)
        res.status(400).json({error: error.message})
    }
}




//delete a word
const deleteWord = async (req, res) =>{
    const id = req.params.id
    try{
        if(!id){
            throw Error('please provide id')
        }
        const deletedWord = await Word.findOneAndDelete({_id: id})
        res.status(200).json({deletedWord, message: 'word deleted'})

    }catch(error){

        console.log(error)
        res.status(400).json({error: error.message})

    }
}

//get  words
const getWords = async (req, res) =>{
    const user_id = req.user._id 
    try{
        const allWords = await Word.find({user_id}).sort({createdAt: -1})
        res.status(200).json(allWords)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//get single
const getSingleWord = async (req, res) =>{
    const  id  = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such id'})
    }
    try{
        const word = await Word.findById(id)
        if(!word){
            return res.status(400).json({error: 'no such word'})
        }
        res.status(200).json(word)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    addWord, deleteWord, getWords, getSingleWord
}