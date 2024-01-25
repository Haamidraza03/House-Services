import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { logInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const dispatch = useDispatch();
    const handleGoogleClick = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(logInSuccess(data));

        } catch (error) {
            console.log("Could not login with Google",error);
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-info shadow border-0 text-dark rounded-pill mb-2 fs-5 py-1 px-3'><b>Continue with Google</b></button>
  )
}
