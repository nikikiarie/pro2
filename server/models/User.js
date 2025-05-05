const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
      },
      lastname: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
      },
      username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
      },
      password: {
        type: String,
        required: [true, 'Password is required']
      },
    img:{type:String},
    isAdmin:{type:Boolean,default:false},
    verified:{type:Boolean,default:false},
    verifiedAt: { type: Date }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)