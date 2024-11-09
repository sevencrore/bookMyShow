const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: [{ type: String, required: true }],  // Array of dates for the event timings
    place: { type: String, required: true },  // Location or venue of the event
    price: { type: String, required: true },  // Price for attending the event
    host: { type: String, required: true },  // Host or organizer of the event
    img_url: { type: String },  // URL for the event image
    bg_url: { type: String },  // URL for the event background image
}, {
    versionKey: false,
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
