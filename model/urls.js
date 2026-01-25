const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        required:true
    },
    clicks:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

});

const URLs = mongoose.model("URLs", urlSchema);

module.exports = URLs;