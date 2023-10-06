const { Router } = require('express')
const passport = require('passport');
const { createUser, loginUser } = require('../controller/userController');

const router = Router();

router.post('/register/user', createUser);

router.post('/login/user', passport.authenticate('local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), loginUser)



// router.post('/login/user', (req, res) => {
//     console.log("requested");
//     res.sendStatus(200)
// })

module.exports = router;