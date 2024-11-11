const express = require('express');
const getRoleByEmail =require('../middleware/AdminAuthMiddleware');
const router = express.Router();
const Category = require('../models/eventCategory.model');



router.get('/',async(req,res)=>{

    let allEvents = await Category.find({});

    res.status(200).send(allEvents);
})

router.post("/create",async(req,res)=>{

    const movie = await Category.create(req.body);
    return res.status(200).json({ message: "Category Added succesfully"});
});

module.exports=router;