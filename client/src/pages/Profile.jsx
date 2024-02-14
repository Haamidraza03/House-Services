import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, uploadBytesResumable} from "firebase/storage"
import {app} from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const {currentUser} = useSelector(state=>state.user);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});
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
  return (
    <div>
        <Navbar/>
        <div className='text-white' style={{marginTop:'80px'}}>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <h1 className='text-center mt-5'>Profile</h1>
                <center><form>
                  <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
                  <center><img src={currentUser.profilePicture} style={{cursor:'pointer'}} alt="Profile Pic" className='img-fluid col-md-4 rounded-circle' onClick={() => fileRef.current.click()} /></center>
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