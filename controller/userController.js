const User = require('../model/userModel')
const { genPassword } = require('../utils/passwordUtils')

const createUser = async (req, res, next) => {
  console.log('creation')
  try {
    const { name, userName, email, mobile, password, accountType, age } = req.body

    const pass = genPassword(password)

    const myUser = new User({
      userName,
      name,
      accountType,
      email,
      mobile,
      hash: pass.hash,
      salt: pass.salt,
      age
    });

    const result = myUser.save().catch(err => console.log(err))

    if (!result) {
      console.log("no result");
    }

    res.status(200).json({ message: "User created succefully " });
  } catch (error) {
    console.log(error);
    next(error)
  }

}

const loginUser = async (req, res) => {
  const user = {
    id: req.user?.id,
    userName: req.user?.userName,
    email: req.user?.email,
    mobile: req.user?.mobile,
    accountType: req.user?.accountType
  }

  res.status(200).json(user);
}

module.exports = { createUser, loginUser }