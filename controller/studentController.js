const Student = require('../module/studentModule')
const asyncHandler = require('express-async-handler')



const createStudent = asyncHandler(async (req,res) => {

    const email = req.body.email
    try {
        const findStudent = await Student.findOne({email})
        if (!findStudent) {
            const createNewStudent = await Student.create(req.body)
            res.json(createNewStudent)
        }else{
            throw new Error('User already exist')
        }
        
    } catch (error) {
        throw new Error(error)
    }

})


module.exports = {createStudent}