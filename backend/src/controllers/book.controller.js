const express = require('express');
const Book = require('../models/book.model');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Movie = require('../models/movie.model');



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
    const { bookingId } = req.params;

    try {
        // Find the booking by its ID
        const booking = await Book.findById(bookingId);
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        // Fetch the user's name and email using the user_id in the booking
        // const user = await User.findById(booking.user_id);
        // const userName = user ? user.name : "Unknown User";
        // const userEmail = user ? user.email : "Unknown Email";

        // Fetch the movie name using movieid in the booking
        const movie = await Movie.findById(booking.movieid);
        const movieName = movie ? movie.name : "Unknown Movie";

        // Get seats (assuming it's an array of seat numbers)
        const seats = booking.seats ? booking.seats.join(', ') : "No seats selected";

        // Get the booking date
        // const bookingDate = booking.dateOfBooking ? booking.dateOfBooking.toLocaleDateString() : "Unknown Date";

        // Create a new PDF document
        const doc = new PDFDocument();

        // Set the response header for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=bill_${bookingId}.pdf`);

        // Pipe the PDF output directly to the response
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(20).text("Booking Bill", { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Booking ID: ${booking._id}`);
        doc.text(`User Name: ${booking.email}`);
        // doc.text(`User Email: ${userEmail}`);
        doc.text(`Seats: ${seats}`);
        doc.text(`Movie: ${movieName}`);
        doc.text(`Date of Booking: ${booking.dateOfBooking}`);
        doc.moveDown();

        doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'right' });

        // Finalize the PDF and send it to the response
        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating bill.", error });
    }
});


module.exports=router;