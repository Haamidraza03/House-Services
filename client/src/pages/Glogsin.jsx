import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faUserTie } from '@fortawesome/free-solid-svg-icons';
import {useTypewriter,Cursor} from "react-simple-typewriter";
import {Link} from 'react-router-dom';

function Glogsin() {
  const [text] = useTypewriter({
    words : ["Services"],
    loop:{},
    typeSpeed:120,
    deleteSpeed:80
  });

  return (
    <div className='mt-5 px-3'>
      <div className="row justify-content-center px-3">
          <div className="col-md-3 bg-white rounded-4 text-center py-5 pb-5" style={{marginTop: 170, marginBottom:50}} data-aos="flip-right" data-aos-duration="1500" data-aos-easing="ease-in-out">
            <h1 className="text-dark" style={{fontSize: 40}}>House <span style={{fontWeight:"bold",color:"rgb(255, 183, 0)"}}>{text}</span><span><Cursor/></span></h1>
            <Link to="/spsignup"><div className="btn btn1 fs-5 rounded-pill border border-dark px-2 mt-3 w-75" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><FontAwesomeIcon icon={faUserTie} style={{fontSize: 25}}/> Service Provider</div></Link> <br />
            <Link to="/usignup"><div className="btn btn1 fs-5 rounded-pill border border-dark px-5 mt-3 w-75" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><FontAwesomeIcon icon={faUser} style={{fontSize: 23}}/> User</div></Link>
          </div>
        </div>
    </div>

  )
}

export default Glogsin