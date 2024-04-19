import React, { useState } from 'react';
import imglog from "./logoh.jpg";
import {Link,useNavigate} from 'react-router-dom';
import { logInStart,logInSuccess,logInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

function Ulogin() {
  const [formData,setFormData] = useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(logInStart());
      const res = await fetch('/api/auth/ulogin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(logInFailure(data));
        return;
      }
      dispatch(logInSuccess(data));
      navigate('/');
      
    } catch (error) {
      dispatch(logInFailure(error));
    }
    
  };

  return (
    <div className="row justify-content-center px-5" style={{marginTop:"100px"}}>
        <div className="col-md-3 bg-white rounded-4 pt-3 mb-4" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out">
        <center><img src={imglog} className='img-fluid rounded-circle mb-0' /></center>
            <h1 className='text-center mb-4'>Login <span style={{color:'rgb(255, 183, 0)'}}>Here</span></h1>
            <form onSubmit={handleSubmit}>
            <center><input type="email" id='email' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter your Email' onChange={handleChange}/><br /></center> 
            
            <center><input type="password" id='password' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter Password' onChange={handleChange}/><br /></center> 
            
            <center><button disabled={loading} className='btn bg-success rounded-pill fs-5 px-5 mb-2 text-white'>
            {loading? 'Loading...':'Login'}
            </button></center>
            {/* <center><OAuth/></center> */}
            </form>
            <center><div className="fs-5 mb-2">Don't have an Account?<Link to="/usignup" style={{textDecoration:"none"}} className='link text-warning'>Signup</Link></div></center>
            <center><b><p className='text-danger mt-2'>
              {error ? error.message || "Something went wrong!" : ""}
            </p></b></center>
        </div>
        
    </div>
  )
}

export default Ulogin