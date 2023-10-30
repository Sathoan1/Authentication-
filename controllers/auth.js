const User = require ('../models/user')
const bcrypt= require ('bcryptjs');
const {isEmail} = require('validator')


// register
const register = async (req,res)=> {
   const {email, username, password, profile}= req.body
//    protecting user pword
// hashing & salting
const salt= await bcrypt.genSalt()
const hashedPassword= await bcrypt.hash(password, salt)
  try{
    const createrdUser= await User.create({email, username, password: hashedPassword, profile})
    res.status(201).json({success:true, createrdUser})
  }catch(error){
    console.log('error');
    res.json (error)
  }
};
// login
const login = async (req,res)=>{
    // email password
    const {email, password}= req.body
    if (!email || !password){
        return res.status(400).json({success: false, message: 'please provide neccessary info'})
    }try{
        // to checck if user is registered / db checking
        const user= await User.findOne({email})
        if (!user){
            return res.status(404).json({success:false, message: 'user is not registered'})
        }

        // check if password is correct
        const isAuthenticated= await bcrypt.compare(password, user.password)

        if(!isAuthenticated){
            return res.status(401).json({success: false, message: 'Invalid credentials'})
        }
        res.status(200).json({success:true, user:{
            email: user.email,
            username: user.username,
            profile: user.profile,
        }
    })
    }catch(error){
        console.log(error);
        res.json(error)
    }
};
// for username/email to login
const login2 = async (req,res)=>{
    // email password
    const {emailOrUsername, password}= req.body

    const loginEmail = isEmail(emailOrUsername)

    if(loginEmail){
        const user= await User.findOne({email :emailOrUsername})
        if (!user){
            return res.status(404).json({success:false, message: 'user is not registered', emailOrUsername})
        }

        // check password
        const isAuthenticated= await bcrypt.compare(password, user.password)

        if(!isAuthenticated){
            return res.status(401).json({success: false, message: 'Invalid credentials'})
        }
        res.status(200).json({success:true, user:{
            email: user.email,
            username: user.username,
            profile: user.profile,
        }})
    }else{
        const user= await User.findOne({username : emailOrUsername})
        if (!user){
            return res.status(404).json({success:false, message: 'user is not registered'})
        }
        // chwck password
        const isAuthenticated= await bcrypt.compare(password, user.password)

        if(!isAuthenticated){
            return res.status(401).json({success: false, message: 'Invalid credentials'})
        }

        res.status(200).json({success:true, user:{
            email: user.email,
            username: user.username,
            profile: user.profile,
        }})
    }
    
};
module.exports = {register, login, login2}
