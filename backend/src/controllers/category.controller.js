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
        // Save the category with the image path
        const newEvent = new Category({
            category_name: category_name,  // Use 'title' as 'category_name'
            description,
            image: imagePath
        });

        await newEvent.save();

        res.status(200).json({ message: 'Category saved successfully!', category: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving category.', error });
    }
});


router.post("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from URL parameter
        const { name, description,is_active } = req.body; // Get the name and description from the request body

        // Validate that name is provided
        if (!name) {
            return res.status(400).json({ message: "Category name is required." });
        }

        // Build the update object. Only include description if it's provided.
        const updateData = { name ,is_active};
        if (description) {
            updateData.description = description;
        }

        // Find the category by ID and update its name and description (if provided)
        const category = await Category.findByIdAndUpdate(
            id,
            updateData, // Update only the fields provided
            { new: true } // Return the updated category
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({ message: "Category updated successfully.", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating category.", error });
    }
});


router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from URL parameter

        // Find the category by ID and update the `is_deleted` field to '1'
        const category = await Category.findByIdAndUpdate(
            id,
            { is_deleted: '1' }, // Soft delete: set is_deleted to '1'
            { new: true } // Return the updated category
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({ message: "Category soft deleted successfully.", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting category.", error });
    }
});

router.post("/undo-delete/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the category ID from URL parameter

        // Find the category by ID and update the `is_deleted` field to '0' (undo delete)
        const category = await Category.findByIdAndUpdate(
            id,
            { is_deleted: '0' }, // Undo the soft delete by setting is_deleted to '0'
            { new: true } // Return the updated category
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({ message: "Category restored successfully.", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error restoring category.", error });
    }
});


module.exports=router;