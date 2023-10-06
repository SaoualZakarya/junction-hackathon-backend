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
      accountType:req.user?.accountType,
      role:req.user?.role,
    }
    
    res.status(200).json(user);
  }

const logoutUser = async (req,res) => {
  try{
    req.logout(function(err) {
      if (err) { return next(err); }
    });
    res.status(200).json({ message: 'User logged out successfully.' });
  }catch(err){
    throw new Error(err)
  }
}
module.exports = {createUser,loginUser,logoutUser}


