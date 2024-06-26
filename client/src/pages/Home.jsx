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
import StarRating from '../components/StarRating';


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
      { id: 2, placeName: "Palghar, Maharashtra", latitude: 19.69693000, longitude: 72.76543000},
      { id: 3, placeName: "Navi Mumbai, Maharashtra", latitude: 19.0330, longitude: 73.0297 },
      { id: 4, placeName: "Vasai-Virar, Maharashtra", latitude: 19.3919, longitude: 72.8397 },
      { id: 5, placeName: "Panaji, Goa", latitude: 15.4909, longitude: 73.8278 },
      { id: 6, placeName: "Dehradoon, Utrakhand", latitude: 30.3165, longitude: 78.0322 },
      { id: 7, placeName: "Srinagar, J & K", latitude: 34.08565, longitude: 74.80555 },
      { id: 8, placeName: "Chandigarh, Punjab", latitude: 30.73331480, longitude: 76.77941790 },
      { id: 9, placeName: "Delhi NCR, India", latitude: 28.70405920, longitude: 77.10249020 },
      { id: 10, placeName: "Jaipur, Rajasthan", latitude: 26.907524, longitude: 75.739639 },
      { id: 11, placeName: "Ahmedabad, Gujarat", latitude: 23.02579000, longitude: 72.58727000 },
      { id: 12, placeName: "Lucknow, Uttar Pradesh", latitude: 26.83928000, longitude: 80.92313000 },
      { id: 13, placeName: "Darbhanga, Bihar", latitude: 26.152973, longitude: 85.901413 },
      { id: 14, placeName: "Gangtok, Sikkim", latitude: 27.32574000, longitude: 88.61216000 },
      { id: 15, placeName: "Guwahati, Assam", latitude: 26.148043, longitude: 91.731377 },
      { id: 16, placeName: "Kolkata, West Bengal", latitude: 22.54111111, longitude: 88.33777778 },
      { id: 17, placeName: "Vishakhapatnam, Orrisa", latitude: 17.686815, longitude: 83.218483 },
      { id: 18, placeName: "Bhopal, Madhya Pradesh", latitude: 23.254690, longitude: 77.402890 },
      { id: 19, placeName: "Bangalore, Karnataka", latitude: 12.97194000, longitude: 77.59369000 },
      { id: 20, placeName: "Chennai, Tamil Nadu", latitude: 13.08784000, longitude: 80.27847000 },
      { id: 21, placeName: "Hyderabad, Telangana", latitude: 17.38405000, longitude: 78.45636000 },
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
                <p className='mt-5 text-white fs-3 text-center' data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out">Welcome {currentUser.uname}&#128075;</p>
              ): currentSp?(
                <p className='mt-5 text-white fs-3 text-center' data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out">Welcome {currentSp.uname}&#128075;</p>
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
          <div className="row justify-content-center px-4 mt-0 mb-2">
            <div className="col-md-7 mt-0 d-flex" id='loc'>
              <select id="locationSelect" className='rounded-pill px-4 py-1 mt-1 fs-5' onChange={handleLocationChange} value={selectedLocation}>
                <option value="" className="fs-5 text-center text-black mt-2">Select Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>{location.placeName}</option>
                ))}
              </select>
              <center><input id='locs' type='text' className='shadow rounded-pill px-4 py-1 text-dark fs-5' placeholder='Search' value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
              <button className='btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5' onClick={handleSearch} >Search</button></center>
            </div>        
          </div>
          <div className="row row-cols-md-3 justify-content-evenly bg-dark cards rounded-top-pill rounded-bottom-pill">
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
            <div className='mb-3'>Average Rating: {user.averageRating} <StarRating rating={user.averageRating}/> </div>
            <div className="d-flex justify-content-around">
              <span>
              <a aria-label="Whatsapp" target='_blank' href={whatsappUrl}><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark'>Contact Now</button></a>
              </span>
              <span>
              <button onClick={() => handleCardClick(user._id)} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark'>View Profile</button>
              </span>
            </div>
            </div>))
          })
           : null} {showResults && searchQuery.trim() !== '' || showResults &&  searchResults.length === 0 && ( 
              <p className="fs-3 text-center text-white mt-4">No nearby service providers found.</p>
            )}
          </div>
          </div>
         </div>
              ): currentSp?(
                <span></span>
              ):(
                <span></span>
      )}

      {currentUser? (
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Service Providers</p>
      ) :currentSp ? (
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'><span className="text-info">Message</span> from Developers</p>
      ):(
        <p className="fs-1 text-center text-white mt-4" data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" id='sp'>Service Providers</p>
      )}

        {currentUser?(<div className="row row-cols-md-3 justify-content-evenly mt-4 bg-dark cards rounded-top-pill rounded-bottom-pill">
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
            <div className='mb-3'>Average Rating: {user.averageRating} <StarRating rating={user.averageRating}/> </div>
            <div className="d-flex justify-content-around">
              <span>
              <a aria-label="Whatsapp" target='_blank' href={whatsappUrl}><button className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark'>Contact Now</button></a>
              </span>
              <span>
              <button onClick={() => handleCardClick(user._id)} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark'>View Profile</button>
              </span>
            </div>
            </div>))
          }):null};
          </div>):currentSp ? (
            <div className='row justify-content-center'>
              <div className="col-md-6 text-white fs-5 p-3">
                <h3 data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" className='p-3'>Dear Esteemed <span style={{color:"gold"}}>{currentSp.uname}</span>, </h3>
                <p id='para1' data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" className='p-3'>I hope this message finds you well.😊We are writing to express our deepest gratitude 🙏 for your continued support and the exceptional services you have been providing for our web application.

                Our team of developers has been working tirelessly💪to ensure the smooth operation and continuous improvement of our web application. Their dedication and hard work have played a significant role in the success of our application, and we believe it is only fitting that they <span className="text-info">receive a token of appreciation for their efforts. </span></p>

                <p id='para1' data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" className='p-3'>In light of this, <span className="text-warning">we kindly request that 5% of the income 💰 you have earned</span> from our web application be directed to the provided UPI link i.e: <span style={{color:"lightgreen"}}>haamidraza03@oksbi</span> . This gesture will not only serve as a reward for our developers but also as a source of motivation and encouragement for them to continue delivering their best work.</p>

                <p id='para1' data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-out" className='p-3'>We believe that this initiative will foster a sense of unity and shared success among all parties involved in the development and operation of our web application. After all, our collective efforts have led to the creation of an application that we can all be proud of.🎉

                Thank you for considering our request. We look forward to your positive response and continued collaboration.🤝</p>
              </div>
            </div>
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
