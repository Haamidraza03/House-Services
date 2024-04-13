import React,{useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate()
  const [serviceProviders, getServiceProviders] = useState([]);
  const {currentUser} = useSelector(state=>state.user);
  const {currentSp} = useSelector(state=>state.sp);
  const [searchQuery, setSearchQuery] = useState('');

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
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    }
   },[], [searchQuery]);

     const [locations, setLocations] = useState([
      { id: 1, placeName: "Mumbai, Maharashtra", latitude: 19.0760, longitude: 72.8777 },
      { id: 2, placeName: "Palghar, Maharashtra", latitude: 19.7969, longitude: 72.7452},
      { id: 3, placeName: "Navi Mumbai, Maharashtra", latitude: 19.0330, longitude: 73.0297 },
      { id: 4, placeName: "Vasai-Virar, Maharashtra", latitude: 19.3919, longitude: 72.8397 },
      { id: 5, placeName: "Panaji, Goa", latitude: 15.4909, longitude: 73.8278 },
      { id: 6, placeName: "Dehradoon, Utrakhand", latitude: 30.3165, longitude: 78.0322 },
      // Add more locations as needed
    ]);
  
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] =useState(false);
  
    const handleLocationChange = (event) => {
      setSelectedLocation(event.target.value);
    };
  
    const handleSearch = async () => {
      const selectedLocationObj = locations.find(loc => loc.id === parseInt(selectedLocation));
      if (!selectedLocationObj) {
        console.error('Selected location not found or search.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:3000/api/sp/searchProviders?latitude=${selectedLocationObj.latitude}&longitude=${selectedLocationObj.longitude}&query=${searchQuery}`);
        const data = await response.json();
        setShowResults(true);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching nearby providers:', error.message);
      }
    };

    const handleCardClick = (providerId) => {
      window.location.href = `/serviceproviderdetail/${providerId}`;
    };

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

        {currentUser ? (
          <div>
        <div>

          <p className="fs-1 text-center text-white mb-0">
          <span style={{color:'rgb(255, 183, 0)'}}>Search</span> Our <span className='text-info'>Service Providers</span>
          </p>
          <div className="row justify-content-center p-5 mt-0">
            <div className="col-md-7 mt-0 d-flex" id='loc'>

            <select id="locationSelect" className='rounded-pill px-4 py-1 mt-1 fs-5' onChange={handleLocationChange} value={selectedLocation}>
              <option value="" className="fs-5 text-center text-black mt-2">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>{location.placeName}</option>
              ))}
            </select>
            <input id='locs' type='text' className='shadow rounded-pill px-4 py-1 text-dark fs-5' placeholder='Search' value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
              <button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5' onClick={handleSearch} >Search</button>
            </div>
          
          </div>
          <div className="row row-cols-md-3 justify-content-evenly bg-dark py-2 px-4 rounded-top-pill rounded-bottom-pill">
            {searchResults.length > 0 && searchResults?searchResults.map((user)=>{
              const whatsappUrl = `whatsapp://send?phone=${user.phno}&text=Hello%20I%20Want%20to%20know%20more%20about%20your%20charges%20for%20your%20House-Services%20as%20${user.prof} !`;
            return((<div key={user._id} className="col-md-3 py-3 px-3 me-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out">
            <img src={user.profilePicture} className='img-fluid rounded-4 shadow mb-3' />
            <div className='d-flex fs-4 justify-content-around'>
              <div>{user.uname}</div>
              <div>{user.prof}</div>
            </div>
            <div className='d-flex fs-4 justify-content-around'>
              <div>Rs. {user.price}</div>
              <div>{user.work}</div>
            </div>
            <div className='d-flex fs-4 justify-content-around'>Location: {user.location}</div>
            <p id='para1' className='bg-scroll'>{user.description}</p>
            <a aria-label="Whatsapp" target='_blank' href={whatsappUrl}><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></a>
            <button onClick={() => handleCardClick(user._id)} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5 mt-3'>View Profile</button></div>))
          })
           : null} {showResults && searchQuery.trim() !== '' || showResults &&  searchResults.length === 0 && ( 
              <p className="fs-3 text-center text-white mt-4">No nearby service providers found.</p>
            )}
          </div>
          </div>
        </div>
>>>>>>> 2343e4a0a9fba40085fc831566efc9452d821782
              ): currentSp?(
                <span></span>
              ):(
                <span></span>
      )}

      {currentUser? (
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Service Providers</p>
      ) :currentSp ? (
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Users</p>
      ):(
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Service Providers</p>
      )}

        {currentUser?(<div className="row row-cols-md-3 justify-content-evenly mt-4 bg-dark py-2 px-4 rounded-top-pill rounded-bottom-pill">
            {serviceProviders.length > 0 && serviceProviders?serviceProviders.map((user)=>{
              const whatsappUrl = `whatsapp://send?phone=${user.phno}&text=Hello%20I%20Want%20to%20know%20more%20about%20your%20charges%20for%20your%20House-Services%20as%20${user.prof} !`;
            return((<div key={user._id} className="col-md-3 py-3 px-3 me-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out">
            <img src={user.profilePicture} className='img-fluid rounded-4 shadow mb-3' />
            <div className='d-flex fs-4 justify-content-around'>
              <div>{user.uname}</div>
              <div>{user.prof}</div>
            </div>
            <div className='d-flex fs-4 justify-content-around'>
              <div>Rs. {user.price}</div>
              <div>{user.work}</div>
            </div>
            <div className='d-flex fs-4 justify-content-around'>Location: {user.location}</div>
            <p id='para1' className='bg-scroll'>{user.description}</p>
            <a aria-label="Whatsapp" target='_blank' href={whatsappUrl}><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></a>
            <button onClick={() => handleCardClick(user._id)} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5 mt-3'>View Profile</button>
            </div>))
          }):null};
          </div>):currentSp ? (
            <p className="fs-4 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="2500" data-aos-easing="ease-in-out" id='sp'>No User Requests!</p>
         ):(
          <div>
            <div className="row justify-content-evenly mt-4 bg-dark py-2 px-4 rounded-top-pill">
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out"><img src={makeup} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Professional makeup artist ready to enhance your beauty. From natural looks to glamour, we've got you covered.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out"><img src={intedesign} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Creative and visionary interior designer. Elevating your living spaces with style and functionality.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out"><img src={carpenter} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Highly skilled and dedicated carpenter. Transform your ideas into wooden wonders.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
        </div>
        <div className="row justify-content-evenly bg-dark py-2 px-4 rounded-bottom-pill">
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><img src={artist} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Talented and passionate artist. Bringing imagination to life through stunning artworks.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><img src={gardener} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Gardener: Experienced and dedicated gardener. Cultivating green oases and taming unruly landscapes.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
          <div className="col-md-3 p-3 border border-info shadow rounded-4 mt-5 text-center text-white" data-aos="zoom-in" data-aos-duration="2500" data-aos-easing="ease-in-out"><img src={plumber} className='img-fluid rounded-4 shadow mb-3' /><p id='para1'>Experienced and reliable plumber at your service. Fixing leaks and ensuring your water systems run smoothly.</p><Link to="/glogsin"><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5'>Contact Now</button></Link></div>
        </div>
          </div>
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
