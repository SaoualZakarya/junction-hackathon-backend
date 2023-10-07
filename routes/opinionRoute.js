const { createOpinion } = require('../controller/opinionController')
const Opinion = require('../model/opinion')
const router = require('express').Router()

router.post('/:id',createOpinion)

module.exports = router 