const express = require('express');
const Book = require('../models/book.model');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Movie = require('../models/movie.model');
const { generatePDF } = require('./generatePDF.controller');
const { sendEmail } = require('./emailSender.controller');
const Event = require('../models/event.model'); 
const EventDetails = require('../models/eventDetails.model');
const City = require('../models/city.model');
const User = require('../models/user.model');
const UserWallet = require('../models/userWallet.model');


router.get("/",async(req,res)=>{
    let allOrders = await Book.find({});
    res.status(200).send(allOrders);

});



router.get("/getBooking/:bookingId",async(req,res)=>{
    console.log(req.params.bookingId);
    let orders = await Book.findById(req.params.bookingId);

    res.status(200).send(orders);
});


router.post("/create", async (req, res) => {
    try {
        // Log the incoming request body
        console.log(req.body);

        // Validate input data
        const { number_of_members, eventDetailsID, email, event_id, uid, displayName, user_id ,price} = req.body;
        if (!number_of_members || !eventDetailsID || !email || !event_id || !uid || !displayName) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        
            // Step 1: Find the user by their ID
            const refer = await User.findById(user_id);
           
            if (refer && refer.reffered_by) {
              // Step 2: Check if 'reffered_by' exists, then find the referred user
              const referredUser = await User.findOne({ uid: refer.reffered_by });
              if (referredUser) {
                // Step 3: Retrieve the referred user's _id, email, and displayName
                const { _id: referredUserId, email, displayName } = referredUser;
        
                // Step 4: Search for a matching record in the UserWallet model
                let userWallet = await UserWallet.findOne({ user_id: referredUserId });
        
                if (!userWallet) {
                  // Step 5: If no record found, create a new UserWallet record
                  userWallet = new UserWallet({
                    user_id: referredUserId,
                    email: email,
                    name: displayName,
                    balance: price*0.2,
                  });
                  await userWallet.save();
                } else {
                  // Step 6: If record found, update the balance
                  userWallet.balance += price*0.2;
                  await userWallet.save();
                }
              } else {
                throw new Error('Referred user not found');
              }
            } 
        
        // Fetch additional details from Event model
        const event = await Event.findById(event_id);
        if (!event) {
            return res.status(404).send({ error: 'Event not found' });
        }
        const event_name = event.title;
        const event_location = event.location_description;
        const city_id = event.city_id;

        // Fetch additional details from EventDetails model
        const eventDetails = await EventDetails.findById(eventDetailsID);
        if (!eventDetails) {
            return res.status(404).send({ error: 'Event details not found' });
        }
        const { date, price: price_per_head, slots: slot } = eventDetails;

        const city = await City.findById(city_id);
        if (!city) {
            return res.status(404).send({ error: 'City details not found' });
        }
        
        const city_name = city.name;
  
        // Create the booking with additional details
        const createBooking = await Book.create({
            number_of_members,
            eventDetailsID,
            email,
            event_id,
            uid,
            price,
            displayName,
            user_id,
            event_name,
            event_location,
            date,
            price_per_head,
            slot,
            city_name,
        });

        // Send the response with the created booking
        res.status(201).send(createBooking);
    } catch (error) {
        // Catch and log any errors
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the booking' });
    }
});

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
                    <div><strong>Number_of_members:</strong> ${booking.number_of_members}</div>
                    <div><strong>Event_id:</strong> ${booking.event_id}</div>
                    <div><strong>Total Price:</strong> ${booking.price}</div>
                    <div><strong>Name:</strong> ${booking.displayName}</div>
                    <div><strong>booked on:</strong> ${new Date(booking.createdAt).toLocaleString()}</div>
                    
                    
                </div>
            </body>
        </html>
        `;

        // Pass the HTML content to the pdfconverter controller to generate and send PDF
        generatePDF(htmlContent, res,booking._id);

        // const sendInvoiceEmail = async (req, res) => {
            
        
        //     // Define the email content
        //     const htmlContent = `
        //         <h1>Invoice</h1>
        //         <p>Please find attached your invoice.</p>
        //     `;
        
        //     // Define the path to the attachment file
        //     const attachmentPath = path.join(__dirname, '../../uploads/pdfs', `bill_${booking._id}.pdf`);
        
        //     // Call sendEmail with the attachment
        //     const result = await sendEmail({
        //         to: booking.email,
        //         subject: 'Your Invoice',
        //         htmlContent,
        //         attachments: [
        //             {
        //                 filename: 'invoice_12345.pdf',
        //                 path: attachmentPath
        //             }
        //         ]
        //     });
        
        //     if (result.success) {
        //         res.status(200).json({ message: 'Invoice email sent successfully!' });
        //     } else {
        //         res.status(500).json({ message: 'Failed to send invoice email.', error: result.error });
        //     }
        // };

        // sendEmail();

    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Error generating bill PDF', error: error.message });
    }
});



// Get a single userBookings detail by user_ID, 
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const userBookings = await Book.find(
            { user_id :id }, // Filters
        );

        if (!userBookings) {
            return res.status(404).json({ message: "User Booking details not found ." });
        }

        res.status(200).send(userBookings);

    } catch (error) {
        console.error("Error fetching userBookings detail:", error);
        res.status(500).json({ message: "Error fetching userBookings detail.", error });
    }
});



// Get a single userBookings detail by user_ID, 
router.get('/user/email/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const userBookings = await Book.find(
            { email :email }, // Filters
        );

        if (!userBookings) {
            return res.status(404).json({ message: "User Booking details not found ." });
        }

        res.status(200).send(userBookings);

    } catch (error) {
        console.error("Error fetching userBookings detail:", error);
        res.status(500).json({ message: "Error fetching userBookings detail.", error });
    }
});




module.exports=router;