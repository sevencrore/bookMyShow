const express = require('express');
const getRoleByEmail =require('../middleware/AdminAuthMiddleware');
const router = express.Router();
const Event = require('../models/event.model');



router.get('/',async(req,res)=>{

    let allEvents = await Event.find({}).populate('currentPlayingMovies');

    res.status(200).send(allEvents);
})

router.post("/create",async(req,res)=>{

    const movie = await Event.create(req.body);
    return res.status(200).json({ message: "Event Added succesfully"});
});

module.exports=router;