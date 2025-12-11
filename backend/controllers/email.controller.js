import { Email } from "../models/email.model.js";

// Create email
export const createEmail = async (req,res) => {
    try{
        const  userId = req.id;
        const {to, subject, message} = req.body;
        if(!to || !subject || !message){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const email = await Email.create({
            to,
            subject,
            message,
            userId
        });
        return res.status(201).json({
            message: "Email created successfully",
            success: true,
            email
        });
    }
    catch(error){
        console.log(error);
    }
}

// Delete email
export const deleteEmail = async (req,res) => {
    try{
        const emailId = req.params.id;
        if(!emailId){
            return res.status(400).json({
                message: "Email ID is required",
                success: false
            });
        }

        const email = await Email.findByIdAndDelete(emailId);
        if(!email){
            return res.status(404).json({
                message: "Email not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Email deleted successfully",
            success: true
        });
    }
    catch(error){
        console.log(error);
    }
}

// Get all emails
export const getAllEmailById = async (req,res) =>{
    try{
        const userId = req.id;
        const emails = await Email.find({userId});

        return res.status(200).json({
            message: "Emails fetched successfully",
            success: true,
            emails
        });
    }
    catch(error){
        console.log(error)
    }
}