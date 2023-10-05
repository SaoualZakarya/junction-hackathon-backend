const { Router } = require('express')
const passport = require('passport');

const Student = require('../module/studentModule')

const { genPassword, validatePassword } = require('../utils/passwordUtils')


const router = Router();


router.post('/register/student', async (req, res, next) => {

  try {
    const { name, userName, email, mobile, password, age } = req.body;

    const pass = genPassword(password);

    const student = await Student.create({
      userName,
      name,
      email,
      mobile,
      hash: pass.hash,
      salt: pass.salt,
      age
    });

    res.status(200).json({ message: "Student created" });
  } catch (error) {
    next(error)
  }

});

router.get('/login/student', passport.authenticate('student', {
  successMessage: "you have been succesfully connected",
  failureMessage: true
}), async (req, res, next) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    mobile: req.user.mobile,
    age: req.user.age
  }

  res.status(200).json(user);
})

module.exports = router;

/**
 * 
 name:
  email
  mobile:
  password
  age
  field
 */