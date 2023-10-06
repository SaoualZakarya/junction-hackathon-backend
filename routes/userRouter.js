const { Router } = require('express')
const passport = require('passport');
const { createUser,loginUser, logoutUser } = require('../controller/userController');

const router = Router();

router.post('/register/user',createUser);

router.put('/login/user',passport.authenticate('user', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), loginUser)

router.delete('/sign_out/:id',logoutUser)

module.exports = router;
