const { getAllChallenges, createChallenge } = require('../controller/challegeController')

const router = require('express').Router()

router.post('/create',createChallenge)

router.get('/all',getAllChallenges)

module.exports = router