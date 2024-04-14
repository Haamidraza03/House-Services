import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import Navbar from "../components/Navbar"

const ServiceProviderDetail = () => {
  const { providerId } = useParams(); // Get the providerId from URL params
  const [provider, setProvider] = useState(null);
  const [phoneno, setPhoneno] = useState('');
  const [profess, setprofess] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ text: '', rating: 0 });

  useEffect(() => {
    if (providerId) {
      // Fetch provider details based on ID from your API or database
      fetchProviderDetails(providerId);
      fetch(`/api/sp/${providerId}/feedbacks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedbacks:', error));
    }
  }, [providerId]); // Make sure to include providerId in the dependency array

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    fetch(`/api/sp/${providerId}/feedbacks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFeedbacks([...feedbacks, data]); // Add new feedback to state
        setNewFeedback({ text: '', rating: 0 }); // Clear the form
      })
      .catch((error) => console.error('Error submitting feedback:', error));
  };

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
              <div className='row justify-content-evenly p-3'>
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

          <div>
      {/* Existing Feedbacks */}
      <div>
      <h2 className="fs-1 text-white mb-0 mt-5 text-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out">Feedbacks:</h2>
      <div className="row row-cols-md-3 justify-content-evenly bg-dark py-2 px-4 mt-5 rounded-top-pill rounded-bottom-pill">
        {feedbacks.map((feedback) => (
          <div className="col-md-3 py-3 px-3 me-3 mt-4 border border-info shadow rounded-4 text-center text-white" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out"> 
          <div key={feedback._id}>
            <p id="para1"><span className="fs-5 text-warning">{feedback.uname} says:</span> &nbsp; {feedback.text}</p>
            Rating: {feedback.rating}
          </div>
          </div>
        ))}
      </div>
      </div>

      {/* Feedback Form */}
      <h2 className="fs-1 text-white mt-5 text-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out">Add Feedback:</h2>
      <div className="row justify-content-center p-5 mt-0">
        <div className="col-md-3 py-3 px-3 me-3 border border-info shadow rounded-4 text-center text-white" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out">
      <form onSubmit={handleFeedbackSubmit}>
        <input
          type='text' className='rounded-4 px-4 py-1 mt-2 fs-5'
          onChange={(e) => setNewFeedback({ ...newFeedback, uname: e.target.value })}
          placeholder="Enter your username"
          required
        />
        <textarea
          value={newFeedback.text} className='rounded-4 px-4 py-1 mt-2 fs-5'
          onChange={(e) => setNewFeedback({ ...newFeedback, text: e.target.value })}
          placeholder="Enter your feedback"
          required
        /> <br />
        <span className="fs-5 mt-2"> Give ratings: </span>
        <input
          type="number"
          value={newFeedback.rating} className='rounded-4 px-4 py-1 fs-5'
          onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
          placeholder="Enter rating (1-5)"
          min="1"
          max="5"
          required
        /> <br />
        <button type="submit" className='btn btn2 shadow rounded-pill px-4 py-1 bg-info text-dark fs-5 mt-2'>Submit Feedback</button>
      </form>
      </div>
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