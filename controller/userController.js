const User = require('../model/userModel')
const { genPassword } = require('../utils/passwordUtils')

const createUser =  async (req, res, next) => {

    try {
      const { name, userName, email, mobile, password,accountType ,age } = req.body
  
      const pass = genPassword(password)
  
      const myUser = await User.create({
        userName,
        name,
        accountType,
        email,
        mobile,
        hash: pass.hash,
        salt: pass.salt,
        age
      });
  
      res.status(200).json({message:"User created succefully "});
    } catch (error) {
      next(error)
    }
  
}

const loginUser = async (req, res) => {
    console.log('we are in login user controller')
    const user = {
      id: req.user?.id,
      userName: req.user?.userName,
      email: req.user?.email,
      mobile: req.user?.mobile,
      accountType:req.user?.accountType
    }
    
    res.status(200).json(user);
  }

module.exports = {createUser,loginUser}