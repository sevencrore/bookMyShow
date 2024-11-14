const express = require('express');
const getRoleByEmail =require('../middleware/AdminAuthMiddleware');
const router = express.Router();
const Event = require('../models/event.model');
const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Join the current directory (__dirname) with a file or folder name
        const fullPath = path.join(__dirname, '../../uploads/event/');
        cb(null, fullPath);  // Define the folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Rename file with timestamp
    }
});

const upload = multer({ storage });

router.get('/',async(req,res)=>{

    let allEvents = await Event.find({
        is_deleted: '0',
        is_active: '1'
    }).select("-is_deleted -created_at -updated_at");
    
    

    res.status(200).send(allEvents);
});

// to get the events for selected city and category
router.get('/get/:categoryId/:cityId', async (req, res) => {
    const { categoryId, cityId } = req.params;

    // Check if both categoryId and cityId are provided
    if (!categoryId || !cityId) {
        return res.status(400).json({ message: "Both categoryId and cityId are required." });
    }

    try {
        // Find events matching category, city, is_active = '1', and is_deleted = '0'
        const events = await Event.find({
            category_id: categoryId,
            city_id: cityId,
            is_active: '1',
            is_deleted: '0'
        }).select("-is_active -is_deleted -updated_at"); // Exclude is_active and is_deleted from the response

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for the specified category and city." });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving events.", error });
    }
});






router.get('/:categoryId', async (req, res) => {
    try {
        const { Id } = req.params;  // Get Id from URL parameter
        const events = await Event.find({ _id: Id });  // Fetch events by Id

        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'No events found for this Id.' });
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
        const { category_id,vendor_id,location_description,location_lat,location_lang,title, description,host_name,city_id } = req.body;

        // Construct the image paths
        const imgPath = req.files["img"] ? `/uploads/event/${req.files["img"][0].filename}` : null;
        const bgImgPath = req.files["bg_img"] ? `/uploads/event/${req.files["bg_img"][0].filename}` : null;

        // Save the event with img and bg_img paths
        const newEvent = new Event({
            category_id,vendor_id,location_description,location_lat,location_lang,title, description,host_name,city_id,
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


router.post("/edit/:id", upload.fields([
    { name: "img", maxCount: 1 },
    { name: "bg_img", maxCount: 1 }
]), async (req, res) => {
    try {
        const { id } = req.params; // Extract the event ID from the route parameters
        const { category_id, vendor_id, location_description, location_lat, location_lang, title, description, host_name,is_active ,city_id} = req.body;

        // Safely construct the image paths if files are uploaded
        const imgPath = req.files && req.files["img"] ? `/uploads/event${req.files["img"][0].filename}` : null;
        const bgImgPath = req.files && req.files["bg_img"] ? `/uploads/event${req.files["bg_img"][0].filename}` : null;
        console.log(req.body);

        // Find the event by ID and update it with the new data
        const updatedEvent = await Event.findByIdAndUpdate(id, {
            category_id,
            vendor_id,
            location_description,
            location_lat,
            location_lang,
            title,
            description,
            host_name,
            is_active,
            city_id,
            ...(imgPath && { img: imgPath }),       // Only update if a new image is uploaded
            ...(bgImgPath && { bg_img: bgImgPath }) // Only update if a new background image is uploaded
        }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event updated successfully!", event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating event.", error });
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the event by ID and exclude `is_deleted`, `created_at`, and `updated_at` from the result
        const event = await Event.findById(id).select("-is_deleted -created_at -updated_at");

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving event.", error });
    }
});



router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract event ID from URL parameter

        // Find the event by ID and update the `is_deleted` field to '1'
        const event = await Event.findByIdAndUpdate(
            id,
            { is_deleted: '1' }, // Soft delete: set is_deleted to '1'
            { new: true } // Return the updated event
        );

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event soft deleted successfully.", event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting event.", error });
    }
});

router.post("/undo-delete/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the event ID from URL parameter

        // Find the event by ID and update the `is_deleted` field to '0' (undo delete)
        const event = await Event.findByIdAndUpdate(
            id,
            { is_deleted: '0' }, // Undo the soft delete by setting is_deleted to '0'
            { new: true } // Return the updated event
        );

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event restored successfully.", event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error restoring event.", error });
    }
});


module.exports=router;