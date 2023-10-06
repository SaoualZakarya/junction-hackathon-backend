const Course = require('../module/courseModule')
const asyncHandler = require('express-async-handler')

const createCourse = asyncHandler(async(req,res)=>{
    try {
        const createNewCourse = await Course.create(req.body)
        res.json(createNewCourse)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCourse = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const updateTheOldCourse = await Course.findByIdAndUpdate(id,{
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        image:req.body.image},
        {new:true})
        res.json(updateTheOldCourse)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCourse = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const deleteTheCourse = await Course.findByIdAndDelete(id
        ,{new:true})
        res.json(deleteTheCourse)
    } catch (error) {
        throw new Error(error)
    }
})

const getCourse = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const getTheCourse = await Course.findById(id)
        res.json(getTheCourse)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCourses = asyncHandler(async(req,res)=>{
    try {
        const getTheCourse = await Course.find()
        res.json(getTheCourse)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {createCourse,getCourse,deleteCourse,updateCourse,getAllCourses}