const { Router } = require('express')
const passport = require('passport');
const { createUser,loginUser, logoutUser,getUsersRank } = require('../controller/userController');


const router = Router();

router.post('/register/user', createUser);

router.post('/login/user', passport.authenticate('local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), loginUser)

router.get('/users-rank',getUsersRank)

router.delete('/sign_out',logoutUser)

module.exports = router;

