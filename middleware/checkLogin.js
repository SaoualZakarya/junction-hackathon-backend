
const isAdmin = (req,res,next)=>{
    if(req.user.role && req.user === "admin" ){
        next()
    }
    throw new Error('You are not admin')
}

const isTeacher = (req,res,next)=>{
    if(req.user.role && req.user === "teacher" ){
        next()
    }
    throw new Error('You are not teacher')
}

const isStudent = (req,res,next)=>{
    if(req.user.role && req.user === "student" ){
        next()
    }
    throw new Error('You are not student')
}

module.exports = {isStudent,isAdmin,isTeacher}