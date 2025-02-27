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
    }

})

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;