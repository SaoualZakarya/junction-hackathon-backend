const { Router } = require('express')
const passport = require('passport');
const { createUser,loginUser } = require('../controller/userController');

const router = Router();

router.post('/register/user',createUser);

router.get('/login/user',passport.authenticate('user', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), loginUser)

module.exports = router;
