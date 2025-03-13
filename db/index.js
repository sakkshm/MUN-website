const mongoose = require("mongoose")
require("dotenv").config()

try{
    mongoose.connect(process.env.MONGO_URI)
}
catch(error){
    console.log("Database error: " + error)
}

const userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    phoneNumber: Number,
    password: String,

    feesPaid: {
        type: Boolean,
        default: false
    },
    orderID: String,
    paymentID: String,
    status: String,
    paidOn: String

})

const registerSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    username: String,
    phoneNumber: String,
    emailID: String,
    college: String,
    
    preferences: {
        committee1: String,
        portfolio1: String,
        portfolio2: String,

        committee2: String,
        portfolio3: String,
        portfolio4: String,
    },
    
    previousMUNexperience: String,
    refference: String

})

const User = new mongoose.model("User", userSchema);
const Register = new mongoose.model("User-Data", registerSchema);

module.exports = {
    User,
    Register
};