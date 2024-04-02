import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"

function Spsignup() {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/spsignup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/splogin');
      
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  };
  return (
    <div className="row justify-content-center px-5" style={{marginTop:"100px"}}>
        <div className="col-md-3 bg-white rounded-4 pt-3" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out">
            <h1 className='text-center mb-3'>Sign <span style={{color:'rgb(255, 183, 0)'}}>Up</span></h1>
            <form onSubmit={handleSubmit}>
            <center><input type="text" id='uname' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter your User Name' onChange={handleChange} /><br /></center> 
            <center><input type="email" id='email' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter your Email' onChange={handleChange} /><br /></center> 
            <center><input type="text" id='prof' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter your Profession' onChange={handleChange} /><br /></center>
            <center><input type="number" inputMode='numeric' id='phno' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter Phone Number' onChange={handleChange} /><br />
            <p style={{fontSize:'14px'}} className='text-success'>*Please Enter your WhatsApp Phone Number.</p>
            </center>
            <center><input type="password" id='password' className='rounded-4 mb-3 fs-4 border ps-3' placeholder='Enter Password' onChange={handleChange} /><br /></center>
            <center><button disabled={loading} className='btn bg-success rounded-pill fs-5 px-5 mb-2 text-white'>
            {loading? 'Loading...':'Sign Up'}
            </button></center>
            </form>
            <center><div className="fs-5 mb-2">Already have an Account?<Link to="/splogin" style={{textDecoration:"none"}} className='link text-warning'>Login</Link></div></center>
            <center><b><p className='text-danger mt-3'>{error && "Something went wrong!"}</p></b></center>
        </div>
        
    </div>
  )
}

export default Spsignup