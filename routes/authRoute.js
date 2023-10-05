const express = require('express')

const { createStudent } = require('../controller/studentController')

const router = express.Router()

// create normal student 
router.use('/student/create', createStudent )




module.exports = router




