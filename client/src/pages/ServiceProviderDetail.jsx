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
      console.log(data);
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
              <div className='row'>
                <div className='col-md-8'>
                  <img src={provider.profilePicture} className='img-fluid rounded' alt='Provider Profile'/>
                </div>
                <div className='col-md-8 py-3 px-3 me-3 border border-info shadow rounded-4 mt-5 text-center text-white' data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out">
                  <h1>Name: {provider.uname}</h1>
                  <p>Profession: {provider.prof}</p>
                  <p>Service Charge: {provider.price}</p>
                  <p>Service Type: {provider.work}</p>
                  <p>Location: {provider.location}</p>
                  <p>Description: {provider.description}</p>
                  {/* Display other provider details */}
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
            <button onClick={handleBackButtonClick} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5 mt-5'>Go Back</button>
            <button onClick={handleContact} className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5 mt-5'>Contact Now</button>
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