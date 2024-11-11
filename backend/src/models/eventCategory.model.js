const mongoose = require('mongoose');

const eventCategorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },  // Category name for the event
    description: { type: String, required: true },  // Description of the category
    image: { type: String }  // URL for the category image
}, {
    versionKey: false,
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const EventCategory = mongoose.model("EventCategory", eventCategorySchema);

module.exports = EventCategory;
