import {Novu} from "@novu/node";
import User from "../models/Register.js";
import { generatePath } from "react-router-dom";

const novu = new Novu(process.env.NOVU);
const registerationInsert  = {
    userForm:(req,res,next)=>{
        res.status(200).send("user_FORM");
        res.end()
    },
    createData: async(req,res,next)=>{
    function gName(){return Math.random().toString(36).substring(2,12)};
    let randomName = gName();
    const email = req.body.email;
    const number =req.body.number;
    const password = req.body.password;
    const UserData = {email, number ,password}
    const data = new User({
        email:email,
        number:number,
        password:password,
        name:randomName
    });
    await data.save();
    console.log(UserData);
    res.status(201).send(UserData);
    },
    email2FA:(req,res,next)=>{
        const {userEmail} = req.body.email;
        console.log(req.body.email);
        function gCode(){return Math.random().toString(36).substring(2, 12)}
        const generateCode = gCode();
        res.status(201).json({code:generateCode});
        async function sendViaNovu (recieve, faCode){
            try{
                const response = await novu.trigger("twofaemail",{
                    to: {
                      subscriberId: recieve,
                        email: recieve,
                    }, 
                    payload: {
                      code: faCode,},
                })
                console.log("Successfully send to:", recieve, faCode)
            }catch(err) {
                console.log(err,"cann't sennd email")
            }
        }
        (userEmail!=="")?sendViaNovu(userEmail,generateCode):res.send("Email not valid")
    }
}
export default registerationInsert;