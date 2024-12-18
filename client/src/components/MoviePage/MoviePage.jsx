import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Footer from "../footer/Footer";
import Menubar from "../menubar/Menubar";
import Navbar from "../navbar/Navbar";
import PrivacyNote from "../privacyNote/PrivacyNote";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./MoviePage.css";
import {Link,useHistory} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {isLoggedIn} from '../../utils/userUtil';
import Login from "../Login/Login";
export function MoviePage() {
  const [language, setLanguage] = useState(false);
  const [genre,setGenre] = useState(false);
  const [format,setFormat] = useState(false);
  const [languageState, setLanguageState] = useState("");
  const [genreState,setGenreState] = useState("");
  const [formatState,setFormatState] = useState("");
  const [tdata,setData] = useState([]);
  const [show,setShow] = useState(false);
  const {city,handleChange}=useContext(AppContext);
  const history=useHistory();

  const [showLogin,setShowLogin]=useState(false);

  function handleModalClose()
  {
    setShowLogin(false);
  }








  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveheight:false,
    autoplay:true,
    autoplaySpeed:2599
  };

  var languages = ["Hindi","English","Tollywood","Punjabi","Bhojpuri","Japanese","Korean"];
    var genres = ["Drama","Comedy","Action","Romantic","Crime","Thriller","Adventure","Family","SciFi"]
    var formats = ["2D","3D","4DX3D","MX4D 3D","3D SCREEN X","IMAX 2D","IMAX 3D"]
 

    



    useEffect(() => {
    console.log("higet")
    getData()
    console.log("hidata")

    if(isLoggedIn())
  {

  }
  else
  {
      setShowLogin(true);
  }

  }, [])

 const handleSort = (lang)=>{
   console.log("lang",lang)
  axios.get("http://localhost:5000/movies")
  .then((res)=>{
    console.log(res.data,"res")
    var result =   res.data.filter(el=>{
      return el.language.includes(lang);
     })
     console.log(result,"result")
     setData(result);
     setLanguageState(lang);
  })
  
 
 }
 const handleSortGenre = (gen)=>{
  var genreArr = [];
  axios.get("http://localhost:5000/movies")
  .then((res)=>{
    var result =   res.data.filter(el=>{
      return (el.genre.includes(gen) && el.language.includes(languageState) );
     })
     console.log(result,"resultgenre")
     setData(result);
     setGenreState(gen)
    })
 }

 const handleSortFormat = (form)=>{
  axios.get("http://localhost:5000/movies")
  .then((res)=>{
    var result =   res.data.filter(el=>{
      return (el.language.includes(languageState) && el.view.includes(form) );
     })
     console.log(result,"resultformat")
     setData(result);
     
    });
 
 }


 
 function handleClose(e) {
  setShowLogin(false);
}
  async function getData(){
    let {data} = await axios.get("http://localhost:5000/movies")
    setData(data)
    setShow(true)
  }

  return (
 
    <div>


      <Modal size="sm" show={showLogin} onHide={handleClose} style={{}} aria-labelledby="contained-modal-title-vcenter"
                  centered>

                  <Modal.Body>
                      <Login hide={setShowLogin} />
                  </Modal.Body>



              </Modal>
      <Navbar/>
      <Menubar/> 
      <Slider {...settings} style={{maxWidth:'100%',maxHeight:'324px',marginRight:'20px',marginLeft:'20px',marginTop:'20px'}}>
          <div>
            <img src="https://in.bmscdn.com/promotions/cms/creatives/1639378314392_revisedbanner2.jpg" style={{objectFit:'cover',width:'100%'}}/>
          </div>
          <div>
          <img src="https://in.bmscdn.com/promotions/cms/creatives/1639051788302_sunburn.jpg" style={{objectFit:'cover',width:'100%'}}/>
          </div>
          <div>
          <img src="https://in.bmscdn.com/promotions/cms/creatives/1637323134871_divinepunyapaaptour_webshowcase_1240x300.jpg" style={{objectFit:'cover',width:'100%'}}/>
          </div>
          
        </Slider>

      <div className="displayMovies">

        {/*----------------------- Left Side Filter--------------------- */}
        <div className="leftFilters">
          Filters
          <div className="languageFilters">
            <div onClick ={()=> setLanguage(!language)} className="languageUpper uppp"> 
            <span>^  Languages</span>
            <span>clear</span>
            </div>
           {!language?null: <div className="languageUpper">
              {languages.map(el=><span key={el} onClick={()=>handleSort(el)} className="namesMovieLanguage">{el}</span>)}
           </div>}
          </div>


          <div className="languageFilters">
            <div onClick ={()=> setGenre(!genre)} className="languageUpper uppp">
            <span>^  Genres</span>
            <span>clear</span>
            </div>
           {!genre?null: <div className="languageUpper"> 
            {genres.map(el=><span key={el} onClick={()=>handleSortGenre(el)} className="namesMovieLanguage">{el}</span>)}
           </div>}
          </div>

          <div className="languageFilters">
            <div onClick ={()=> setFormat(!format)}  className="languageUpper uppp">
            <span>^  Formats</span>
            <span>clear</span>
            </div>
           {!format?null: <div className="languageUpper">
           {formats.map(el=><span key={el} onClick={()=>handleSortFormat(el)} className="namesMovieLanguage">{el}</span>)}
           </div>}
          </div>

          <div className="browsse">
               Browse by Cinemas
          </div>
        </div>

     {/*---------------------------- Right Side Movie --------------------------------------*/}

        <div className="rightMovies">
          Movies in {city}
          <div className="rightMoviesBelow">
          {languages.map(el=><span key={el} onClick={()=>handleSort(el)} className="moviesNName">{el}</span>)}
           
          </div>
          <div className="rightMoviesComponent">
          <div className="moviesComponent1">Coming Soon</div>
            <div className="moviesComponent2">Explore Upcoming Movies {">"}</div>
          </div>


          <div>{!show?null:<div className="gridContainer">
            {
              tdata.map(el=><div className="gridItem"> 
              <Link to = {`/movie/${el._id}`}>
                <img className="imagePara" src={el.img_url}></img>
                <p className="titlePara">{el.title}</p>
                <p className="certificatePara">{el.certificate}</p>
                <p className="certificatePara" style={{fontSize:"12px"}}><span className="me-1">{el.language}</span></p>
                </Link>
         
              </div>)
            }
            
            </div>}

          </div>
          
        </div>
      </div>

      {/*------------------- Discriptions ----------------------------------*/}
      
      <PrivacyNote/>
      <Footer/> 
    </div>
  );
}
