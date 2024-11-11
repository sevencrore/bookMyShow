const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the vendor
    description: { type: String, required: true }  // Description of the vendor
}, {
    versionKey: false,
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
