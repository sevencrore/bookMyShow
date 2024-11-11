const express = require('express');
const getRoleByEmail =require('../middleware/AdminAuthMiddleware');
const router = express.Router();
const Vendor = require('../models/vendor.model');



router.get('/',async(req,res)=>{

    let allEvents = await Vendor.find({});

    res.status(200).send(allEvents);
})

router.post("/create",async(req,res)=>{

    const movie = await Vendor.create(req.body);
    return res.status(200).json({ message: "Vendor Added succesfully"});
});

module.exports=router;