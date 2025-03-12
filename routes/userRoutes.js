const { Router } = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {User, Register} = require("../db/index")
const { userSchema, registerSchema } = require("../validation/index");
const userMiddleware = require("../middleware/userMiddleware");

const router = Router();
require("dotenv").config();

router.post("/signup", async (req, res) => {

   const username = req.body.username;
   const phoneNumber = req.body.phoneNumber;
   const password = req.body.password;

   const validation = userSchema.safeParse({
    username: username,
    phoneNumber: phoneNumber,
    password: password
   })

   if(validation.success){
    //check if user exists:
    try{
        var response = await User.find({
            phoneNumber: phoneNumber
        })
    }
    catch(err){
        res.status(500).json({
            msg: "Interval server error"
        })
    }

    if(response.length != 0){
        res.status(401).json({
            msg: "User already exists"
        })
    }
    else{
        //If user does not exists        
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                username: username,
                phoneNumber: phoneNumber,
                password: hashedPassword
            })

            const jwtToken = jwt.sign({phoneNumber: phoneNumber, id: user._id}, process.env.JWT_SECRET);

            res.status(200).json({
                token: jwtToken
            })
        }
        catch(error){
            res.status(500).json({
                msg: "Interval server error"
            })
        }
    }
   }
   else{
    res.status(401).json({
        msg: "Invalid credentials",
    });
   }
})


router.post("/login", async (req, res) => {

    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;

    try{
        const response = await User.find({
            phoneNumber: phoneNumber,
        })

        if(response.length == 0){
            res.status(401).json({
                msg: "User does not exist"
            })
        }
        else{
            //Compare passwords
            const match = await bcrypt.compare(password, response[0].password);
            
            if(match){
                const jwtToken = jwt.sign({phoneNumber: phoneNumber, id: response[0]._id}, process.env.JWT_SECRET);

                res.status(200).json({
                    token: jwtToken
                })
            }
            else{
                res.status(401).json({
                    msg: "Password does not match"
                })
            }
        }

        
    }
    catch(error){
        res.status(500).json({
            msg: "Interval server error",
        })
    }

})

router.post("/register", userMiddleware, async (req, res) => {

    const registerObj = {
        userId: req.body.id,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        emailID: req.body.emailID,
        college: req.body.college,
        
        preferences: req.body.preferences,
    
        previousMUNexperience: req.body.previousMUNexperience,
        refference: req.body.refference
    }


    const validation = registerSchema.safeParse(registerObj);

    if(validation.success){
    //check if user exists
    try{
        var response = await Register.find({
            phoneNumber: req.body.phoneNumber,
            userId: req.body.id
        })
    }
    catch(err){
        res.status(500).json({
            msg: "Interval server error"
        })
    }

    if(response.length != 0){
        res.status(401).json({
            msg: "User already registered"
        })
    }
    else{
        //If user has not registered      
        try{

            const userRegister = await Register.create(registerObj);

            res.status(200).json({
                id: userRegister._id
            })
        }
        catch(error){
            res.status(500).json({
                msg: "Interval server error"
            })
        }
    }
   }
   else{
    res.status(401).json({
        msg: "Invalid credentials",
    });
   }

})

module.exports = router