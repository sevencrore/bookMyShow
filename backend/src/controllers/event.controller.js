const express = require('express');
const getRoleByEmail =require('../middleware/AdminAuthMiddleware');
const router = express.Router();
const Event = require('../models/event.model');
const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/event/');  // Define the folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Rename file with timestamp
    }
});

const upload = multer({ storage });

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



router.post("/create", upload.fields([
    { name: "img", maxCount: 1 },
    { name: "bg_img", maxCount: 1 }
]), async (req, res) => {
    console.log(req.body);
    try {
        // Extract data from the request
        const { category_id,vendor_id,location_description,location_lat,location_lang,title, description } = req.body;

        // Construct the image paths
        const imgPath = req.files["img"] ? `/uploads/event${req.files["img"][0].filename}` : null;
        const bgImgPath = req.files["bg_img"] ? `/uploads/event${req.files["bg_img"][0].filename}` : null;

        // Save the event with img and bg_img paths
        const newEvent = new Category({
            category_id,vendor_id,location_description,location_lat,location_lang,title, description,
            img: imgPath,
            bg_img: bgImgPath
        });

        await newEvent.save();

        res.status(200).json({ message: 'Event saved successfully!', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving event.', error });
    }
});



module.exports=router;