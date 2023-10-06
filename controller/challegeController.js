const Challenge = require('../model/challengeModel')
const asyncHandler = require('express-async-handler')

const createChallenge = asyncHandler(async(req,res)=>{
    try {
        const createNewChallenge = await Challenge.create(req.body)
        res.json(createNewChallenge)
    } catch (error) {
        throw new Error(error)
    }
})


const getAllChallenges = asyncHandler(async(req,res)=>{
    try {
        const getTheChallenge = await Challenge.find()
        res.json(getTheChallenge)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {createChallenge,getAllChallenges}