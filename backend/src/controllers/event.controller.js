const express = require('express');
const getRoleByEmail =require('../middleware/AdminAuthMiddleware');
const router = express.Router();
const Event = require('../models/event.model');



router.get('/',async(req,res)=>{

    let allEvents = await Event.find({});

    res.status(200).send(allEvents);
});

router.get('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;  // Get categoryId from URL parameter
        const events = await Event.find({ category_id: categoryId }).populate('category_id');  // Fetch events by categoryId

        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'No events found for this category.' });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving events.', error });
    }
});

router.get('/vendor/:vendorId', async (req, res) => {
    try {
        const { vendorId } = req.params;  // Get vendorId from URL parameters
        const events = await Event.find({ vendor_id: vendorId })  // Fetch events by vendorId
            .populate('category_id');  // Optionally populate category details if needed

        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'No events found for this vendor.' });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving events.', error });
    }
});



router.post("/create",async(req,res)=>{

    const movie = await Event.create(req.body);
    return res.status(200).json({ message: "Event Added succesfully"});
});

module.exports=router;