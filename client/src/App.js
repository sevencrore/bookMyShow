import './App.css';
import { MoviePage } from './components/MoviePage/MoviePage';

import { Book } from '../src/components/BookPage/Book';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

import { Terms } from './components/Seat/Terms';
import { Selectseat } from './components/Seat/Selectseat';
import { Slotbooking } from './components/Slotbooking.jsx/Slotbooking';
import { Seating } from './components/SeatBook/Seating';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import Summary from './components/Summary/Summary'
import Navbar from './components/navbar/Navbar';
import Menubar from './components/menubar/Menubar';
import Footer from './components/footer/Footer';
import Login from './components/Login/Login';
import AdminLogin from './components/Login/AdminLogin';
import AdminRegister from './components/Login/AdminRegister';
import AdminDashboard from './components/admin/Admindashboard';
import AdminLogout from './components/Login/AdminLogout';
import Movies from './components/admin/Add_Movies';
import Theaters from './components/admin/Add_Theater';
import Events from './components/admin/Add_Events';
import Category from './components/admin/Add_Category';
import Vendor from './components/admin/Add_Vendor';
import ListEvent from './components/admin/ListEvents';
import ListCategory from './components/admin/ListCategory';
import ListVendor from './components/admin/ListVendor';
import EventDetails from './components/admin/Event_Details';
import EventHome from './components/EventPage/EventHome';
import EventDetailsHome from './components/EventPage/EventDetailsHome';
import BookEvent from './components/EventPage/BookEvent';
import MyBookings from './components/EventPage/MyBookings';
import UserBookings from './components/admin/UserBookingDetails';
import Add_City from './components/admin/Add_City';
import ListCity from './components/admin/ListCity';

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyALuLSKz7yNKbdk3t3kAHfs1ODnmygpdjQ",
    authDomain: "bookmyshow-5a00b.firebaseapp.com",
    projectId: "bookmyshow-5a00b",
    storageBucket: "bookmyshow-5a00b.appspot.com",
    messagingSenderId: "696353441992",
    appId: "1:696353441992:web:3d682155c2f61541c77dfd",
    measurementId: "G-MLVGY89LDF"
  };
  
  
  const app = initializeApp(firebaseConfig);
  
  const analytics = getAnalytics(app);
  return (
    <div className="App">      
     <Navbar />
      <Switch>
       
        <Route path="/" exact><Home/></Route>
        <Route path="/moviepage"><MoviePage/></Route>
        <Route path="/movie/:id"><Book/></Route>
        <Route path="/book"><Book/></Route>
        <Route path="/terms"> <Terms/> <Selectseat/></Route>
        <Route path = "/slot/:id/:bookingId"><Slotbooking/></Route>
        <Route path = "/seating/:id"><Seating/></Route>        
        <Route path = "/summary/:id"><Summary/></Route>  
        <Route path="/admin/login"><AdminLogin /></Route>
        <Route path="/admin/register"><AdminRegister /></Route>
        <Route path="/admin/dashboard"><AdminDashboard /></Route>
        <Route path="/admin/logout"><AdminLogout /></Route>
        <Route path="/admin/Movies"><Movies /></Route>
        <Route path="/admin/Events"><Events /></Route>
        <Route path="/admin/ListEvents"><ListEvent /></Route>
        <Route path="/admin/EventDetails"><EventDetails /></Route>
        <Route path="/admin/ListCategory"><ListCategory /></Route>
        <Route path="/admin/ListVendor"><ListVendor /></Route>
        <Route path="/admin/ListCity"><ListCity /></Route>
        <Route path="/admin/category"><Category /></Route>
        <Route path="/admin/vendor"><Vendor /></Route>
        <Route path="/admin/Add_city"><Add_City /></Route>
        <Route path="/admin/Theaters"><Theaters /></Route>
        <Route path = "/events/:categoryId/:cityId"><EventHome/></Route>
        <Route path = "/event/:eventId"><EventDetailsHome/></Route>
        <Route path = "/bookevent/:eventId"><BookEvent/></Route>
        <Route path = "/mybookings"><MyBookings/></Route>
        <Route path = "/admin/userbookings"><UserBookings/></Route>
        
    </Switch>
    <Footer />
    </div>
  );
}

export default App;
