const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } = require('../controller/courseController')
const {isTeacher} = require('../middleware/checkLogin')
const router = require('express').Router()

router.get('/all',getAllCourses)
router.get('/:id',getCourse)
router.post('/create',isTeacher,createCourse)
router.put('/:id',isTeacher,updateCourse)
router.delete('/:id',isTeacher,deleteCourse)



module.exports = router