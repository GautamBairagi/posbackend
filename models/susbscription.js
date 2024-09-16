const mongoose = require("mongoose")

const SubscriptionModel = new mongoose.Schema({
    productname:{
        required:true,
        type:String,
    },
    price:{
        required:true,
        type:Number
    },
    subscriptionPlan:{
        required:true,
        type:String
    },
    category:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model("subscriptionBASEmODEL" , SubscriptionModel)