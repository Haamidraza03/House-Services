import React from 'react'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

function Profile() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div>
        <Navbar/>
        <div className='text-white' style={{marginTop:'80px'}}>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <h1 className='text-center mt-5'>Profile</h1>
                <center><form>
                  <center><img src={currentUser.profilePicture} style={{cursor:'pointer'}} alt="Profile Pic" className='img-fluid col-md-4 rounded-circle'/></center>
                  <input defaultValue={currentUser.uname} type="text" id='uname' placeholder='Username' className='p-2 rounded-3' /> <br />
                  <input defaultValue={currentUser.email} type="email" id='email' placeholder='E-mail' className='p-2 rounded-3' /> <br />
                  <input type="password" id='password' placeholder='Password' className='p-2 rounded-3' /> <br />
                  <button className='btn rounded-pill bg-success text-white px-3 py-1 mt-2'>Update</button>
                </form></center>
                <center><div className='row justify-content-between mt-3'>
                  <span className='text-danger col-md-5 fs-5' style={{cursor:"pointer"}}>Delete Account</span>
                  <span className='text-danger col-md-5 fs-5' style={{cursor:"pointer"}}>Log Out</span>
                </div></center>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Profile