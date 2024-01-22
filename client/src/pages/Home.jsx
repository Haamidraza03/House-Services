import React from 'react';
import Navbar from "../components/Navbar"
import makeup from "./makeup.jpg"
import carpenter from "./carpenter.jpg"
import intedesign from "./intedesign.jpg"
import gardener from "./gardener.jpg"
import artist from "./artist.jpg"
import plumber from "./plumber.jpg"
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <Navbar/>
      <div className="row justify-content-center" id='herotop' style={{marginTop:"80px"}}>
        <div className="col-md-5" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out">
          <img src="aboutback1.png" className='img-fluid rounded-5 p-2' />
        </div>
        <div className="col-md-4" id='herodown' style={{marginTop:"100px"}} data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out">
          <h1 className='text-white' style={{fontSize:"80px"}}> <b>Housyy</b> </h1>
          <p style={{color:"#2AEBF8"}} className='fs-1'>One way platform  for connecting the house services.</p>
        </div>
      </div>
      <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Service Providers</p>
       <div className="row justify-content-evenly mt-4 bg-dark py-2 px-4 rounded-top-pill">
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out"><img src={makeup} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Professional makeup artist ready to enhance your beauty. From natural looks to glamour, we've got you covered.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out"><img src={intedesign} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Creative and visionary interior designer. Elevating your living spaces with style and functionality.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out"><img src={carpenter} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Highly skilled and dedicated carpenter. Transform your ideas into wooden wonders.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
        </div>

        <div className="row justify-content-evenly bg-dark py-2 px-4 rounded-bottom-pill">
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><img src={artist} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Talented and passionate artist. Bringing imagination to life through stunning artworks.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><img src={gardener} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Gardener: Experienced and dedicated gardener. Cultivating green oases and taming unruly landscapes.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><img src={plumber} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Experienced and reliable plumber at your service. Fixing leaks and ensuring your water systems run smoothly.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
        </div>
        
       <h1 className="fs-1 text-center text-white mt-5 mb-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out">What We Offer</h1>
       <div className="row justify-content-evenly px-5">
        <div className="col-md-3 border rounded-2 text-white p-2 mb-4 justify-content-evenly fs-5" id='para1' data-aos="flip-left" data-aos-duration="1500" data-aos-easing="ease-in-out">
        Convenience: Simplifies access to a wide range of home services, making it convenient for users to find and book service providers effortlessly.
        </div>
        <div className="col-md-3 border rounded-2 text-white p-2 mb-4 justify-content-evenly fs-5" id='para1'data-aos="flip-left" data-aos-duration="2000" data-aos-easing="ease-in-out">
        Support for Freelancers: Freelancers can use the platform to present their talents and attract potential customers, creating new work opportunities.
        </div>
        <div className="col-md-3 border rounded-2 text-white p-2 mb-4 justify-content-evenly fs-5" id='para1'data-aos="flip-left" data-aos-duration="2500" data-aos-easing="ease-in-out">
        Real-time Communication: Users and service providers can communicate in real time to discuss job specifics, ensuring clarity and efficiency.
        </div>
       </div>
    </div>
  )
}

export default Home