
import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from "firebase/storage";
import {app} from "../firebase";
import { useDispatch } from 'react-redux';
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,deleteUserFailure,deleteUserSuccess,logOut } from '../redux/user/userSlice';
import { updateSpFailure,updateSpStart,updateSpSuccess,deleteSpFailure,deleteSpStart,deleteSpSuccess,splogOut } from "../redux/sp/spSlice";

function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);

  const {currentUser,loading,error} = useSelector(state=>state.user);
  const {currentSp} = useSelector(state=>state.sp);

  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
  },[image]);
  const handleFileUpload = async (image)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      "state_changed",(snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        setImagePercent(Math.round(progress));
      },
    
    (error)=>{
      setImageError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
        setFormData({...formData,profilePicture:downloadURL})
      )
    });
  };

  const handleChange = (e) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const  latitude = position.coords.latitude;
            const  longitude = position.coords.longitude;
            console.log("Received coordinates:", latitude, longitude);
            setFormData({
                ...formData,
                plong: longitude,
                plat: latitude,
                [e.target.id]: e.target.value,
            });
        });
    } else {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log("update successfull without location")
    }
};


  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      if (currentSp) {
        dispatch(updateSpStart());
      const res = await fetch(`/api/sp/update/${currentSp._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateSpFailure(data));
        return;
      }
      dispatch(updateSpSuccess(data));
      setUpdateSuccess(true);
      } else {
        dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      }
    } catch (error) {
      if(currentSp){
        dispatch(updateSpFailure(error));
      }else{
        dispatch(updateUserFailure(error));
      }
    }
  };

  const handleDeleteAccount = async()=>{
    try {
      if(currentSp){
        dispatch(deleteSpStart());
      const res = await fetch(`/api/sp/delete/${currentSp._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success===false){
        dispatch(deleteSpFailure(data));
        return;
      }
      dispatch(deleteSpSuccess(data));
      }else{
        dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      if(currentSp){
        dispatch(deleteSpFailure(error));
      }else{
        dispatch(deleteUserFailure(error));
      }
    }
  }

  const handleLogout = async()=>{
    try {
      if(currentSp){
        await fetch('/api/auth/logout');
      dispatch(splogOut());
      }else{
        await fetch('/api/auth/logout');
      dispatch(logOut());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <Navbar/>
        <div className='text-white' style={{marginTop:'80px'}}>
            <div className="row justify-content-center">
              <div className="col-md-9">
                <h1 className='text-center mt-1' data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-in-out">Profile</h1>
                <center><form onSubmit={handleSubmit}>
                  <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
                  <center><img src={currentUser ? currentUser.profilePicture : currentSp ? currentSp.profilePicture : formData.profilePicture} style={{cursor:'pointer', width:'230px'}} alt="Profile Pic" className='img-fluid col-md-5 rounded-circle' onClick={() => fileRef.current.click()} />
                  <p>
                  {imageError ? (
                    <span className='text-danger'>Error Uploading Image (File size must be less than 2 MB)</span>) : imagePercent > 0 && imagePercent < 100 ? (
                      <span className='text-info'>{`Uploading: ${imagePercent} %`}</span> ): imagePercent === 100 ? (
                        <span className='text-success'><b>Image Uploaded Successfully</b></span>) : ""
                  }
                  </p>
                  </center>
                  <input defaultValue={currentUser ? currentUser.uname : currentSp ? currentSp.uname : none} type="text" id='uname' placeholder='Username' data-aos="slide-up" data-aos-duration="1000" data-aos-easing="ease-in-out" className='px-3 py-2 mt-0 mt-0 rounded-3 med' onChange={handleChange} /> <br />
                  <input defaultValue={currentUser ? currentUser.email : currentSp ? currentSp.email : none} type="email" id='email' placeholder='E-mail' data-aos="slide-up" data-aos-duration="1500" data-aos-easing="ease-in-out" className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                  {currentUser? (
                      <span></span>
                    ) :currentSp ? (
                      <span>
                        <input defaultValue={ currentSp.prof} type="text" id='prof' placeholder='Proffession' data-aos="slide-up" data-aos-duration="1700" data-aos-easing="ease-in-out" className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                      </span>
                    ):(
                      <span></span>
                  )}
                  {currentUser? (
                      <span></span>
                    ) :currentSp ? (
                      <span>
                        <input defaultValue={ currentSp.phno} type="number" id='phno' placeholder='Phone Number' data-aos="slide-up" data-aos-duration="1700" data-aos-easing="ease-in-out" className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                      </span>
                    ):(
                      <span></span>
                  )}
                  {currentUser? (
                      <span></span>
                    ) :currentSp ? (
                      <span>
                        <input defaultValue={ currentSp.price} type="number" id='price' placeholder='Enter Minimum Price' data-aos="slide-up" data-aos-duration="1700" data-aos-easing="ease-in-out" className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                      </span>
                    ):(
                      <span></span>
                  )}
                  {currentUser? (
                      <span></span>
                    ) :currentSp ? (
                      <span>
                        <input defaultValue={ currentSp.work} type="text" id='work' placeholder='Part Time Or Full Time?' data-aos="slide-up" data-aos-duration="1700" data-aos-easing="ease-in-out" className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                      </span>
                    ):(
                      <span></span>
                  )}
                  {currentUser? (
                      <span></span>
                    ) :currentSp ? (
                      <span>
                        <input type="text" id='location' placeholder='Enter Your location' data-aos="slide-up" data-aos-duration="1700" data-aos-easing="ease-in-out" className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                      </span>
                    ):(
                      <span></span>
                  )}
                  {currentUser? (
                      <span></span>
                    ) :currentSp ? (
                      <span onClick={handleChange} data-aos="fade-up" data-aos-duration="1700" data-aos-easing="ease-in-out" className='text-info col-md-5 fs-4' style={{cursor:"pointer"}}>Get My Location <br /></span> 
                    ):(
                      <span></span>
                  )}
                  {currentUser? (
                      <span></span>
                    ) :currentSp ? (
                      <span>
                        <textarea rows={3} defaultValue={ currentSp.description} type="text" id='description' data-aos="slide-up" data-aos-duration="2000" data-aos-easing="ease-in-out" placeholder='Description' style={{textAlign:'justify'}} className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                      </span>
                    ):(
                      <span></span>
                  )}
                  <input type="password" id='password' placeholder='Password' data-aos="slide-up" data-aos-duration="2300" data-aos-easing="ease-in-out" className='px-3 py-2 mt-1 rounded-3 med' onChange={handleChange} /> <br />
                  <button data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out"className='btn rounded-pill bg-success text-white px-4 py-1 mt-2 fs-5'>{loading ? 'Loading...':'Update'}</button>
                </form></center>
                <center><p className='text-danger mt-1'>{error && "Something went Wrong!"}</p></center>
                <center><p className='text-success mt-1'><b>{updateSuccess && "User is Updated Successfully!!"}</b></p></center>
                <center><div className='row justify-content-between mt-0'>
                  <span onClick={handleDeleteAccount} data-aos="slide-up" data-aos-duration="1000" data-aos-easing="ease-in-out" className='text-danger col-md-5 fs-4' style={{cursor:"pointer"}}>Delete Account</span>
                  <span onClick={handleLogout} data-aos="slide-up" data-aos-duration="1000" data-aos-easing="ease-in-out" className='text-warning col-md-5 fs-4' style={{cursor:"pointer"}}>Log Out</span>
                </div></center>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Profile