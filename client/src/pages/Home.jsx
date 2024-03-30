import React,{useEffect,useState} from 'react';
import Navbar from "../components/Navbar"
import makeup from "./makeup.jpg"
import carpenter from "./carpenter.jpg"
import intedesign from "./intedesign.jpg"
import gardener from "./gardener.jpg"
import artist from "./artist.jpg"
import plumber from "./plumber.jpg"
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';


function Home() {

  const [serviceProviders, getServiceProviders] = useState([]);
  
  const {currentUser} = useSelector(state=>state.user);
  const {currentSp} = useSelector(state=>state.sp);
   const getItem =async ()=>{
    
    const resposnce = await fetch('http://localhost:3000/api/sp/getsps',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await resposnce.json();
    // console.log(result);
    getServiceProviders(result);

   }

   useEffect(()=>{
    getItem();
   },[])
   
  

  return (
    <div>
      <Navbar/>
      <div className="row justify-content-center" id='herotop' style={{marginTop:"80px"}}>
      {currentUser ? (
                <p className='mt-5 text-white fs-3 text-center'>Welcome {currentUser.uname}&#128075;</p>
              ): currentSp?(
                <p className='mt-5 text-white fs-3 text-center'>Welcome {currentSp.uname}&#128075;</p>
              ):(
                <span></span>
      )}
        <div className="col-md-5" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out">
          <img src="aboutback1.png" className='img-fluid rounded-5 p-2' />
        </div>
        <div className="col-md-4" id='herodown' style={{marginTop:"100px"}} data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out">
          <h1 className='text-white' style={{fontSize:"80px"}}> <b>Housyy</b> </h1>
          <p style={{color:"#2AEBF8"}} className='fs-1'>One way platform  for connecting the house services.</p>
        </div>
      </div>
      {currentUser? (
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Service Providers</p>
      ) :currentSp ? (
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Users</p>
      ):(
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Service Providers</p>
      )}

        {currentUser?(<div className="row row-cols-md-3 justify-content-evenly mt-4 bg-dark py-2 px-4 rounded-top-pill rounded-bottom-pill">
            {serviceProviders.length > 0 && serviceProviders?serviceProviders.map((user)=>{
            return((<div key={user._id} className="col-md-3 py-3 px-3 me-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out">
            <img src={user.profilePicture} className='img-fluid rounded-4 shadow mb-3' />
            <div className='d-flex fs-4 justify-content-around'>
              <div>{user.uname}</div>
              <div>{user.prof}</div>
            </div>
            <p id='para1'>{user.description}</p>
            <Link><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>))
          }):null};
          </div>):currentSp ? (
            <p className="fs-4 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="2500" data-aos-easing="ease-in-out" id='sp'>No User Requests!</p>
         ):(
            <span></span>
        )}
            
          
        
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