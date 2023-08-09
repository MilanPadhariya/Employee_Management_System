const {User}=require('../db/index');
const jwt= require('jsonwebtoken');

const jwt_secret='dakmc@deo#f09vrkam';
const jwt_expire='90d';

const createToken=(id)=>{
    return jwt.sign({id},jwt_secret,{expiresIn:jwt_expire});
}

const sendToken=(user,res)=>{
    const token=createToken(user.dataValues.emp_id);

    // const cookieOptions = {
    //     expires: new Date(
    //       Date.now() + 10 * 24 * 60 * 60 * 1000    // the cookie should expire in 10 days
    //     ),
    //     httpOnly: true
    // };

    // res.cookie('token',token,cookieOptions);

    res.status(200).json({
        success: true,
        message:"logged in succesfully",
        token:token,
        id:user.dataValues.emp_id
    });
}

exports.login=async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email|| !password){
        return res.status(200).json(
            {
                success:false,
                message:"please provide both email and password"
            }
        )
    }

    const user=await User.findOne(
        {
            where:{email_id:email}
        }
    );

    if(!user || password !== user.dataValues.password){

        return res.status(200).json(
            {
                success:false,
                message:"invalid credentials"
            }
        )
    }

    sendToken(user,res);
}

exports.protectRoute=async(req,res,next)=>{
    let token;

    // if(req.headers.cookie && req.headers.cookie.includes('token=')){
    //     token=req.headers.cookie.split('=')[1];
    // }
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    };

    if(!token){
        return res.status(200).json(
            {
                success:false,
                message:"not authorized to use this service. please login first"
            }
        )
    }

    const decoded=jwt.verify(token,jwt_secret);

    const currentUser=await User.findOne(
        {
            where:{
                'emp_id':decoded.id
            }
        }
    );

    if(!currentUser){
        return res.status(401).json(
            {
                success:false,
                message:"user no longer exist"
            }
        )
    }

    req.user=currentUser.dataValues;
    next();
};

exports.restrictTo=(...roles)=>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json(
                {
                    success:false,
                    message:"you are not authorized to perform this action"
                }
            )
        }
        next();
    }
};