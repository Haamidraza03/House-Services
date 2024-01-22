import React,{useRef} from 'react'
import { FaLinkedin,FaWhatsapp,FaInstagram } from 'react-icons/fa';
import {SlEnvolope} from "react-icons/sl";
import conimg from "./contactus.webp";
import Navbar from "../components/Navbar";

function Contact() {
  const nameInput=useRef(null);
    const emailInput=useRef(null);
    const query_desc=useRef(null);
    function ContactHandler()
    {
        const username=nameInput.current.value;
        const useremail=emailInput.current.value;
        const userquery=query_desc.current.value;

        let user={
            name:username,
            email:useremail,
            query:userquery,
        }

        if(username.length>3 && useremail.length>3 && userquery.length>3)
            {
                fetch('https://housyy---contact-default-rtdb.firebaseio.com/user.json',{
                method:'post',
                body:JSON.stringify(user)
                }).then(()=>
                {
                    alert("Thank you for Contacting Us.");
                    nameInput.current.value="";
                    emailInput.current.value="";
                    query_desc.current.value="";
                })
            }
        else{
          alert("Please fill all Details.")
        }
    }
  return (
    <>
    <Navbar/>
    <div style={{marginTop:"70px"}} className='text-dark'>
      <div className="row justify-content-evenly">
        <div className="col-md-4 mt-5">
          <img src={conimg} className='img-fluid rounded-5 px-3' data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out"/>
        </div>
        <div className="col-md-5 mt-5 text-white">
          <h2 className='fs-1 text-center' data-aos="fade-down" data-aos-duration="1500" data-aos-easing="ease-in-out">Contact Us</h2>
          <center><h4 className='fs-5'data-aos="fade-left" data-aos-duration="1500" data-aos-easing="ease-in-out" >Phone: +91 9422671453</h4>
          <h4 className='fs-5 mb-3' data-aos="fade-right" data-aos-duration="1500" data-aos-easing="ease-in-out">E-Mail: housyy23@gmail.com</h4></center>
          <center className='px-4'><form data-aos="fade-up" data-aos-duration="2000" data-aos-easing="ease-in-out">
            <input type="text" placeholder='Enter your Name' className='w-100 rounded-3 border fs-5 ps-2 mb-3 mt-2' ref={nameInput}/><br />
            <input type="email" placeholder='Enter you Mail' className='w-100 rounded-3 border fs-5 ps-2 mb-3' ref={emailInput}/><br />
            <textarea placeholder='Enter Message' rows="2" className='w-100 rounded-3 border fs-5 ps-2 mb-3' ref={query_desc}></textarea><br />
            <button className='btn bg-success rounded-pill text-white px-4 py-1' onClick={ContactHandler}>Send Message</button>
          </form></center>
        </div>
      </div>
      <div className='row justify-content-center text-center mt-5'>
        <div className="col-md-2 text-primary mb-5" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out"><span className='fs-1'><a href="https://www.linkedin.com/in/haamid-raza-kazi/" target='_blank' className='text-primary'><FaLinkedin/></a></span><p>LinkedIn</p></div>
        <div className="col-md-2 text-success mb-5" data-aos="zoom-in" data-aos-duration="1800" data-aos-easing="ease-in-out"><span className='fs-1'><a href="https://wa.me/9422671453" target='_blank' className='text-success'><FaWhatsapp/></a></span><p>WhatsApp</p></div>
        <div className="col-md-2 text-warning mb-5" data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out"><span className='fs-1'><a href="mailto:haamidraza03@gmail.com" target='_blank' className='text-warning'><SlEnvolope/></a></span><p>G-mail</p></div>
        <div className="col-md-2 text-danger mb-5" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><span className='fs-1'><a href="https://www.instagram.com/the_hrk_03/" target='_blank' className='text-danger'><FaInstagram/></a></span><p>Instagram</p></div>
      </div>
    </div>
    </>
  )
}

export default Contact