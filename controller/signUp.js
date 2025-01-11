const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signUp = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        //check if the user with this email already exist in the database or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"this email alreayd exists",
            });
        }

        //ab karenege hashing of password , mtlb encryption, to make it secure - will be done using bcrypt.hash function
        let hashedpassword;
        try{
            hashedpassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(400).json({
                success:false,
                message:"error in hashing password",
            });
        }

        //ab user ko database meinn create karo
        const user = await User.create({
            name, email, password:hashedpassword, role
        });

        return res.status(200).json({
            success:true,
            message:"user signup successfull !!",
        });
    }

    catch (error) {
        console.error(error);
        console.log("error in sign up");
        return res.status(400).json({
            success : false,
            message: 'user sign up failed',
        });
    }
}