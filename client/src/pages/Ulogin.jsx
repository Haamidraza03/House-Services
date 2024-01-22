import React from 'react'
import imglog from "./logoh.jpg";
import {Link} from "react-router-dom"

function Ulogin() {
  return (
    <div className="row justify-content-center px-5" style={{marginTop:"100px"}}>
        <div className="col-md-3 bg-white rounded-4 pt-3" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out">
            <center><img src={imglog} className='img-fluid rounded-circle mb-0' /></center>
            <h1 className='text-center mb-3'>Login <span style={{color:'rgb(255, 183, 0)'}}>Here</span></h1>
            <center><input type="email" id='email' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter your Email' /><br /></center>
            <center><input type="password" id='password' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter Password' /><br /></center>
            <center><button className='btn bg-success rounded-pill fs-5 px-5 mb-3 text-white'>Login</button></center>
            <center className='fs-5'>Don't have an Account? <Link to="/usignup" style={{color:'rgb(255, 183, 0)'}}>SignUp</Link></center>
        </div>
    </div>
  )
}

export default Ulogin