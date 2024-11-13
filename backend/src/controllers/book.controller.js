const express = require('express');
const Book = require('../models/book.model');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Movie = require('../models/movie.model');
const { generatePDF } = require('./generatePDF.controller');



router.get("/",async(req,res)=>{
    let allOrders = await Book.find({});
    res.status(200).send(allOrders);

});



router.get("/getBooking/:bookingId",async(req,res)=>{
    console.log(req.params.bookingId);
    let orders = await Book.findById(req.params.bookingId).populate('theater').populate('movieid').lean().exec();

    res.status(200).send(orders);
});



router.post("/create",async(req,res)=>{

    let createBooking=await Book.create(req.body);


    res.status(201).send(createBooking);

})

router.patch("/update/:id",async(req,res)=>{

    let updatedBooking=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});


    res.status(201).send(updatedBooking);

})





router.get('/download-bill/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Fetch booking data from the database using the bookingId
        const booking = await Book.findById(bookingId); // Assuming you need to populate movie data

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Create the HTML template for the bill
        const htmlContent = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { text-align: center; }
                    .bill-details { margin-top: 20px; }
                    .bill-details div { margin: 5px 0; }
                </style>
            </head>
            <body style=" background-color: lightblue;">
                <h1>Booking Bill</h1>
                <div class="bill-details">
                    <div><strong>Booking ID:</strong> ${booking._id}</div>
                    <div style="color:blue;text-align:center;" ><strong>Name:</strong> ${booking.name}</div>
                    <div><strong>Email:</strong> ${booking.email}</div>
                    <div><strong>Seats:</strong> ${booking.seats.join(', ')}</div>
                    
                </div>
            </body>
        </html>
        `;

        // Pass the HTML content to the pdfconverter controller to generate and send PDF
        generatePDF(htmlContent, res);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Error generating bill PDF', error: error.message });
    }
});




module.exports=router;