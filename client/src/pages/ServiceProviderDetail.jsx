import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import Navbar from "../components/Navbar"

const ServiceProviderDetail = () => {
  const { providerId } = useParams(); // Get the providerId from URL params
  const [provider, setProvider] = useState(null);
  const [phoneno, setPhoneno] = useState('');
  const [profess, setprofess] = useState('');

  useEffect(() => {
    if (providerId) {
      // Fetch provider details based on ID from your API or database
      fetchProviderDetails(providerId);
    }
  }, [providerId]); // Make sure to include providerId in the dependency array

  const fetchProviderDetails = async (providerId) => {
    try {
      const response = await fetch(`/api/sp/${providerId}`);
      const data = await response.json();
      setProvider(data);
      setPhoneno(data.phno);
      setprofess(data.prof);
    } catch (error) {
      console.error('Error fetching provider details:', error.message);
    } 
    if (!provider) {
      return <div>Loading....</div>
    }
  };

  const handleBackButtonClick = () => {
    // Navigate back to the previous page or a specific route
    // Adjust the URL or routing logic as needed
    window.location.href = '/'; // Replace '/' with the desired URL
  };

  const handleContact = () => {
    const whatsappUrl = `whatsapp://send?phone=${phoneno}&text=Hello%20I%20Want%20to%20know%20more%20about%20your%20charges%20for%20your%20House-Services%20as%20${profess} !`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <div>
      
      {provider ? (
        <>
          <Navbar/>
          <div className="" id='herotop' style={{marginTop:"80px"}}>
            <div className='container mt-4'>
              <div className='row justify-content-evenly'>
                <div className='col-md-5 mt-5'>
                  <img src={provider.profilePicture} className='img-fluid rounded-circle' data-aos="zoom-in" data-aos-duration="2000" data-aos-easing="ease-in-out" alt='Provider Profile'/>
                </div>
                <div className='col-md-5 py-3 px-3 border border-info shadow-md mt-4 rounded-4 text-center text-white' data-aos="fade-up" data-aos-duration="2500" data-aos-easing="ease-in-out">
                  <h1>Username: {provider.uname}</h1>
                  <p className='fs-4'>Email: {provider.email}</p>
                  <p className='fs-4'>Profession: {provider.prof}</p>
                  <p className='fs-4'>Service Charge: {provider.price}</p>
                  <p className='fs-4'>Service Type: {provider.work}</p>
                  <p className='fs-4'>Location: {provider.location}</p>
                  <p className='fs-4' id='para1'>Description: {provider.description}</p> 
                  {/* Display other provider details  */}
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
            <button onClick={handleBackButtonClick} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5 mt-3' data-aos="fade-up" data-aos-duration="2000" data-aos-easing="ease-in-out">Go Back</button>
            <button onClick={handleContact} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5 ms-2 mt-3' data-aos="fade-up" data-aos-duration="2000" data-aos-easing="ease-in-out">Contact Now</button>
            </div>
          </div>
          </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ServiceProviderDetail;