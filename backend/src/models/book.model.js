const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    email: { type: String, required: true },  // Email of the user
    name: { type: String},   // Name of the person making the booking
    user: { type: String},  // User's email or ID (event-specific user)
    number_of_members: { type: Number, required: true },  // Number of members for the booking
    eventDetailsID: {type: mongoose.Schema.Types.ObjectId, ref: 'EventDetails', required: true },  // Event ID linked to the booking
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true  },  // Event ID for specific event
    uid: { type: String, required: true,ref: 'User' },
    displayName :{ type: String, required: true },
    price: {type: Number, required: true},
}, {
    versionKey: false,  // Disable the version key (_v)
    timestamps: true,  // Enable automatic creation of createdAt and updatedAt fields
});

const Book = mongoose.model("booking", bookSchema);
module.exports = Book;
