const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EventCategory', required: true },  // Foreign key to EventCategory
    title: { type: String, required: true },
    host_name: { type: String, required: true },  // Title of the event
    description: { type: String, required: true },  // Description of the event
    img: { type: String, required: true },  // URL for the event image
    bg_img: { type: String, required: true },  // URL for the event background image
    location_description: { type: String },  // Additional details about the location

    // New Fields
    location_lat: { type: mongoose.Types.Decimal128 },  // Latitude of the event location
    location_lang: { type: mongoose.Types.Decimal128 },  // Longitude of the event location
    vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }  // Foreign key to Vendor

}, {
    versionKey: false,
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
