const Opinion = require('../model/opinion')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const createOpinion = asyncHandler(async(req,res)=>{
    const { id } = req.params
    try{
        const createNewOpinion = await Opinion.create(req.body)
        const findTheUser = await User.findByIdAndUpdate(id,{
            $push:{ opinion:createNewOpinion._id}
        },{new:true})
        res.json(createNewOpinion)
    }catch(err){
        throw new Error(err)
    }
})


module.exports = {createOpinion}