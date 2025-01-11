//middleware hota hai ki, ham controller pe jaane se pehle hi client ki request ko authenticate and authorize karle
//isme client apni request mein jwt bhejta hai
//for example - agar admin role vala user, student ke page ko access karna chahta hai, then middleware will not allow him/her to do this

// teen middleware banayenge - authentication, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try{
        //extract JWt token from the request
        //aur bhi ways hain token ko extract karne ke liye
        const token = req.body.token;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"token missing",
            });
        }
        
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch (error){
            return res.status(400).json({
                success:false,
                message:"token is invalid",
            });
        }

        next();
    }

    catch (error) {
        return res.status(400).json({
            success:false,
            message:"something went wrong, while verifying the token",
        });
    }
}

//ab second middleware likhenge, jiske liye next call hua hai

exports.isStudent = (req, res, next) => {
    try{
        //ab jo decode karke hamne decoded message ko req ke user mein store karvaya hai auth function mein (just above),
        //usme se role ko fetch karke dekhenge if it is student or no

        if(req.user.role !== "Student"){
            return res.status(400).json({
                success:false,
                message:"this is protected route for students",
            });
        }

        next();
    }
    catch (error) {
        return res.status(400).json({
            success:false,
            message:"something went wrong while user role authorisation",
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"this is protected route for admins",
            });
        }
        next();
    }
    catch (error){
        return res.status(400).json({
            success:false,
            message:"something went wrong while user role authorisation",
        });
    }
}