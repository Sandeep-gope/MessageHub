import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req,res) =>{
    try{
        const {fullname, email, password} = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success: false
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const profilePhoto = 'https://avatar.iran.liara.run/public/15';
        await User.create({
            fullname,
            email,
            password: hashedpassword,
            profilePhoto
        });
        return res.status(201).json({
            message:"Account created successfully",
            success: true
        });
    }
    catch(error){
        console.log(error);

    }
}

export const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        }).json({
            message: ` ${user.fullname} Login successful`,
            user,
            success: true
        });
    }
    catch(error){
        console.log(error)

    }
}

export const logout = async (req,res) =>{
    try{
        return res.status(200).cookie("token", "", {maxage:0}).json({
            message: "Logged out successfully"
        })
    }
    catch(error){
        console.log(error);
    }
}