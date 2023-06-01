import express from "express";
import User from "../models/Register.js";
const routerLogin = express.Router();

routerLogin.post("/", async(req,res,next)=>{
    try{
        
        const {userName,userPwd} = req.body;
        const user = await User.findOne({email:userName}||{phone:userName});
        console.log(user)
        if(!user) {
            res.json({
                code:401,
                message:"user not found"
            })
            return;
        };
        if (user.password === userPwd){
            res.json({
                code:200,
                message:"login success",
                data:user.name,
                userId: user._id
            });
        } else{
            res.json({
                code:400,
                message:"Password incorrect"
            })
        }
    }catch(err){
        res.json({
            code:500,
            message:err
        })
    }  
})

export default routerLogin;