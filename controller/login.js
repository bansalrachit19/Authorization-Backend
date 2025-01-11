const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/users");
require("dotenv").config();

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        //agar fields are empty
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the details",
            });
        }
        
        //check karenege if ye email exist karti hai ya na
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"please enter correct email",
            });
        }

        //now verify the password and create the jwt tocan
        if(await bcrypt.compare(password, existingUser.password)){
            //password match kar gaya hai
            //to ab jwt token banayenge - for that i need to first install its library npm i jsonwebtoken

            let payload = {
                email:existingUser.email,
                id:existingUser._id,
                role:existingUser.role,
            };

            let token = jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h"
                                });
            
            userNew = existingUser.toObject();
            userNew.token = token; // user database mein ek nai field token banake usme token ko save kar dia
            userNew.password = undefined; // ye ser object se undefined kia hai naaki database se

            //now lets say we are sending this token in form of cookie

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            };

            res.cookie("token", token, options).status(200).json({
                success:true,
                message:"user loggen in succesfully",
                token,
                userNew,
            });
        }  
        else{
            //password didn't match
            return res.status(403).json({
                success:false,
                message:"password is incorrect",
            });
        }
    }

    catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"user authentication failed",
        });
    }
}