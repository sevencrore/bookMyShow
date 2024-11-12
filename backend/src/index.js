const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use((req,res,next)=>{   


 //   console.log(req.headers);
 
    next()
})
const userController = require('./controllers/user.controller');
const movieController = require('./controllers/movie.controller');
const bookController = require('./controllers/book.controller');
const eventController = require('./controllers/event.controller');
const slotPriceController = require("./controllers/slotPrice.controller");
const eventCategoryController = require("./controllers/category.controller");
const vendorController = require("./controllers/vendor.controller");
const cityController = require("./controllers/city.controller");
app.use("/users",userController);
app.use("/movies",movieController);
app.use("/book",bookController);
app.use("/slotprice",slotPriceController)
const theaterController = require('./controllers/theater.controller');
app.use("/users",userController);
app.use("/movies",movieController);
app.use("/book",bookController);
app.use("/theater",theaterController);
app.use("/event",eventController);
app.use("/eventCategory",eventCategoryController);
app.use("/vendor",vendorController);
app.use("/city",cityController);
const path = require('path');


// app.use('../uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('E:\\programming\\development\\project\\book-my-show\\bookMyShow\\backend\\uploads'));
app.use('/uploads/event', express.static('E:\\programming\\development\\project\\book-my-show\\bookMyShow\\backend\\uploads\\event'));
// app.use(express.static("../uploads"));



module.exports=app;