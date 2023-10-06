const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } = require('../controller/courseController')

const router = require('express').Router()

router.post('/create',createCourse)
router.get('/all',getAllCourses)
router.get('/:id',getCourse)
router.put('/:id',updateCourse)
router.delete('/:id',deleteCourse)



module.exports = router