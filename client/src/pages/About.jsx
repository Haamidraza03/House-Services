import React from 'react'
import Navbar from "../components/Navbar"
import img1 from "./deepika-mam.jpg"
import img2 from "./hrk.png"
import img3 from "./sc.png"
import img4 from "./db.png"
import img5 from "./ag.png"

function About() {
  return (
    <div>
      <Navbar/>
      <div style={{marginTop:"80px"}} className='text-white px-5'>
         <p style={{textAlign:"justify"}} className='fs-4' data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-in-out"><span className='fs-3'><b>About Housyy:</b></span> Housyy is a House Service Providing Web Application providing two way communication between service provider and service receiver can eliminate the exhausting efforts of searching the suitable service provider and also ensure the intended job for the service provider. A feedback based rating system can improve the skills of any service provider and service receiver can eventually get better service. It provides real time tracking of technician based on geo-location to provide faster service.</p>
      </div>
      <div className="text-center text-white fs-1" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out">Our Aim</div>
      <div className="row px-5 fs-3 text-white" id='para1' data-aos="fade-up" data-aos-duration="2000" data-aos-easing="ease-in-out">
      The aim of house services web application is to benefit home owners and service providers alike by making it easier to find and book home services providing a way for service providers to find work and helping customers get high quality home services at a fair price.
      </div>
      <div className="text-center text-white fs-1 mt-5" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out">Our Team</div>
      <div className="row justify-content-center p-4 text-white mt-2">
        <div className="col-md-3 mt-3 fs-5" data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out">
          <center><img src={img1} alt="mam" className='img-fluid rounded-circle shadow' /></center> 
          <center><h4 className='mt-2'>Ms. Deepika Nadar</h4></center>
          <p id='para1'>Assistant Professor at St. John College of Engineering and Management.</p>
        </div>
      </div>
      <div className="row justify-content-evenly text-white mt-2 p-4">
        <div className="col-md-3 fs-5" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out">
          <center><img src={img2} alt="std1" className='img-fluid rounded-circle shadow' /></center>
          <center><h4 className='mt-2'>Haamid Raza Kazi </h4></center>
          <p id='para1'>Dynamic Computer Engineering student passionate about emerging technologies, adept at crafting user-friendly interfaces, and driven to innovate in web development. Committed to learning, networking, and making significant contributions to the field.</p>
        </div>
        <div className="col-md-3 fs-5" data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out">
          <center><img src={img3} alt="std2" className='img-fluid rounded-circle shadow' /></center>
          <center><h4 className='mt-2'>Sakshi Choudhary </h4></center>
          <p id='para1'>Dynamic Computer Engineering student with a strong software development foundation and a passion for emerging technologies. Skilled in crafting user-friendly interfaces and solving technical challenges.</p>
        </div>
      </div>
      <div className="row justify-content-evenly text-white mt-4 p-4">
        <div className="col-md-3 fs-5" data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out">
          <center><img src={img4} alt="std3" className='img-fluid rounded-circle shadow' /></center>
          <center><h4 className='mt-2'>Disha Bhandare </h4></center>
          <p id='para1'>A computer engineering student ignited by a flair for crafting frontend projects that blend intuition with innovation. My passion? Creating user-friendly experiences that not only meet but exceed expectations, breathing life into ideas, one line of code at a time!</p>
        </div>
        <div className="col-md-3 fs-5" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out">
          <center><img src={img5} alt="std4" className='img-fluid rounded-circle shadow' /></center>
          <center><h4 className='mt-2'>Anjali Gupta </h4></center>
          <p id='para1'>A Web Developer and a student, currently pursuing B.E Computer Engineering from St. John College Of Engineering and Management.</p>
        </div>
      </div>

    </div>
    
  )
}

export default About