import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from "firebase/storage";
import {app} from "../firebase";
import { useDispatch } from 'react-redux';
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,deleteUserFailure,deleteUserSuccess,logOut } from '../redux/user/userSlice';

function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);

  const {currentUser,loading,error} = useSelector(state=>state.user);

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

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
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
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async()=>{
    try {
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
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  const handleLogout = async()=>{
    try {
      await fetch('/api/auth/logout');
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <Navbar/>
        <div className='text-white' style={{marginTop:'80px'}}>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <h1 className='text-center mt-5'>Profile</h1>
                <center><form onSubmit={handleSubmit}>
                  <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
                  <center><img src={formData.profilePicture || currentUser.profilePicture} style={{cursor:'pointer'}} alt="Profile Pic" className='img-fluid col-md-4 rounded-circle' onClick={() => fileRef.current.click()} />
                  <p>
                  {imageError ? (
                    <span className='text-danger'>Error Uploading Image (File size must be less than 2 MB)</span>) : imagePercent > 0 && imagePercent < 100 ? (
                      <span className='text-info'>{`Uploading: ${imagePercent} %`}</span> ): imagePercent === 100 ? (
                        <span className='text-success'><b>Image Uploaded Successfully</b></span>) : ""
                  }
                  </p>
                  </center>
                  <input defaultValue={currentUser.uname} type="text" id='uname' placeholder='Username' className='p-2 rounded-3' onChange={handleChange} /> <br />
                  <input defaultValue={currentUser.email} type="email" id='email' placeholder='E-mail' className='p-2 rounded-3' onChange={handleChange} /> <br />
                  <input type="password" id='password' placeholder='Password' className='p-2 rounded-3' onChange={handleChange} /> <br />
                  <button className='btn rounded-pill bg-success text-white px-3 py-1 mt-2'>{loading ? 'Loading...':'Update'}</button>
                </form></center>
                <center><div className='row justify-content-between mt-3'>
                  <span onClick={handleDeleteAccount} className='text-danger col-md-5 fs-5' style={{cursor:"pointer"}}>Delete Account</span>
                  <span onClick={handleLogout} className='text-danger col-md-5 fs-5' style={{cursor:"pointer"}}>Log Out</span>
                </div></center>
                <center><p className='text-danger mt-5'>{error && "Something went Wrong!"}</p></center>
                <center><p className='text-success mt-5'><b>{updateSuccess && "User is Updated Successfully!!"}</b></p></center>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Profile