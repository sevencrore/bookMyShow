const express = require('express');
const getRoleByEmail =require('../middleware/AdminAuthMiddleware');
const router = express.Router();
const Category = require('../models/eventCategory.model');
const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Define the folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Rename file with timestamp
    }
});

const upload = multer({ storage });

router.get('/',async(req,res)=>{

    let allEvents = await Category.find({});

    res.status(200).send(allEvents);
})

router.post("/create", upload.single("image"), async (req, res) => {
    console.log(req.body);
    const {category_name } = req.body;
    try {
        // Extract data and image path from the request
        const { title, description } = req.body;  // Assuming 'title' refers to the category name
        const imagePath = `/uploads/${req.file.filename}`;  // Construct the URL path for the image
        console.log(imagePath);
        // Save the event with the image path
        const newEvent = new Category({
            category_name: category_name,  // Use 'title' as 'category_name'
            description,
            image: imagePath
        });

        await newEvent.save();

        res.status(200).json({ message: 'Event saved successfully!', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving event.', error });
    }
});

module.exports=router;