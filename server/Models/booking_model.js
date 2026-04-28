const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    fullname:{type:String},
    email:{type:String},
    address:{type:String},
    phone:{type:String},

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },

    bookingdate:{type:Date,default:Date.now},
    quantity:{type:Number,default:1},
    totalamount:{type:Number},
    status:{type:String,
        enum:["Pending","Approved","Rejected","Completed"],
        default:"Pending"},
  userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
})

module.exports = mongoose.model("Booking",bookingSchema)