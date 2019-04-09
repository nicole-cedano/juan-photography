const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        Type:Boolean ,
        default: false
    }
})

// auth hooks

// encrypt the password
userSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

// Check the users password method
userSchema.methods.checkPassword= function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password,(err, isMatch)=>{
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

// method for clearing the password out of data before it hit the front end
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}  

module.exports = mongoose.model("User", userSchema)