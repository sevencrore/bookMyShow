import '../../style/footer.css'
import { Link } from "react-router-dom";
export default function () {


    return (<>

        <div className="container-fluid footer">

            <div className="flexed">
                <img className="img" src={`${process.env.PUBLIC_URL}/vector.png`} />
                <p className="footer-heading">List Your Show</p>
                <p className="footer-sub">Got a show, event, activity or a great experience? Partner with us & get listed on PartyJunction</p>
                <div className="grow"></div>
                {/* <button className='btn btn-danger btn-red'>Contact Today</button> */}
            </div>


            <div className="footer-image-grid flexed">
                <div className='grow'>
                    <img className='fluid-img' src={`${process.env.PUBLIC_URL}/customer-care.png`} />
                </div>
                <div className='grow'>
                    <img className='fluid-img' src={`${process.env.PUBLIC_URL}/resend.png`} />
                </div>
                <div className='grow'>
                    <img className='fluid-img' src={`${process.env.PUBLIC_URL}/newsletter.png`} />
                </div>


            </div>


            <div className="container-fluid space">
                <p className='heading-grey'>Top Events </p>

                <p className='heading-grey2'>Pubs | DJ Nights | </p>

                <br />
                

               
                <p className='heading-grey'>HELP</p>
                <p className='heading-grey2'>
                
                <Link to="/faq" className="text-primary mx-2">
                    FAQ
                </Link>
                |
                <Link to="/terms-and-conditions" className="text-primary mx-2">
                    Terms and Conditions
                </Link>
                |
                <Link to="/privacy-policy" className="text-primary mx-2">
                    Privacy Policy
                </Link>
                </p>
                <br />
                
            </div>


            <div className="line-holder flexed">

                <div className="line"></div>
                <div className='grow'><img src={`${process.env.PUBLIC_URL}/logo.png`} /></div>
                <div className="line"></div>

            </div>

            {/* <div className="social-container">
                <div className="social">
                    <img className='img-fluid' src={`${process.env.PUBLIC_URL}/facebook.png`} />
                    <img className='img-fluid' src={`${process.env.PUBLIC_URL}/twitter.png`} />
                    <img className='img-fluid' src={`${process.env.PUBLIC_URL}/insta.png`} />
                    <img className='img-fluid' src={`${process.env.PUBLIC_URL}/youtube.png`} />
                    <img className='img-fluid' src={`${process.env.PUBLIC_URL}/pin.png`} />
                    <img className='img-fluid' src={`${process.env.PUBLIC_URL}/linkedin.png`} />
                </div>
            </div> */}

            <div className="copyright">
                <p className='copy'>Copyright 2021 ©PartyJunction. All Rights Reserved.
                    The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.</p>
            </div>












        </div>

    </>)
}