const mongoose = require("mongoose")
const Subscription = require("../models/susbscription")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const susbscription = require("../models/susbscription");

const newSubscription = asyncHandler(async(req,res,next)=>{
    try{
    console.log("this is the data of susbcription" , req.body)
    const newSubscriptionData = await Subscription.create(req.body)
    res.json(newSubscriptionData).status(200).json({massage:"successfully Created Data!"})
    }catch(error){
        res.status(400).json({massage:"Data is not regeistered"})
        throw new Error(error)
    }
});

const EditnewSubscription = asyncHandler(async(req,res,next)=>{
    try{
        console.log("you got Id" , req.params)
        const id = req.params
        const GetIdofSubscription = await Subscription.findByIdAndUpdate(id , req.body,{
            new:true
        })
        res.json(GetIdofSubscription).status(200).json({massage:"Successfully Updated Data"})
    }catch(error){
        res.status(400).json({massage:"something wrong for Updated Data"})
        throw new Error(error)
    }
})

const DeleteSubscription = asyncHandler(async(req,res,next)=>{
    try{
        console.log("you will get the deleted id", req.params)
        const id = req.params
        const DeletedByIdSubscription = await Subscription.findByIdAndDelete(id , req.body,{
            new:true
        })
        res.json(DeletedByIdSubscription).status(200).json({massage:"successfuly Deleted The Data"})
    }catch(error){
        res.status(400).json({massage:"something worong on deletetaion on data"})
        throw new Error(error)
    }
})

const GetSubscriptionById = asyncHandler(async(req,res,next)=>{
    try{
        console.log("you will get the subscription only seleceted" , req.params)
        const id = req.params;
        const GetSubscriptionById = await susbscription.findById(id , req.body,{
            new:true
        })
        res.json(GetSubscriptionById).status(200).json({massage:"successfully Deleted the Data"})
    }catch(error){
        res.status(400).json({massage:"something is wrong the Get the data from id"})
    }
})

const GetAllSubscriptions = asyncHandler(async(req,res,next)=>{
    try{
        const GetallSubscription = await Subscription.find()
        res.json(GetallSubscription).status(200).json({massage:"You Got All All Subscription"})
    }catch(error){
        res.status(400).json({massage:"did'nt get the all data from id"})
    }
})

module.exports={
    newSubscription,
    EditnewSubscription,
    DeleteSubscription,
    GetSubscriptionById,
    GetAllSubscriptions
}