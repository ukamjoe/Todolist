// eslint-disable-next-line no-unused-vars
import React from 'react';
import jacky from './images/jacky.jpeg'; // Corrected the image path

const ErrorPage = () => {
  return (
    <div className="page" style={{ textAlign: 'center', padding: '20px' }}>
      {/* Displaying the image */}
      <img 
        src={jacky} 
        alt="Jacky" 
        style={{ width: '225px', height: '225px', borderRadius: '50%', marginBottom: '20px' }} 
      />
      
      {/* Error Message */}
      <h1 style={{ color: 'red', fontSize: '24px' }}>404 - Page Not Found</h1>
      <p style={{ color: 'gray', fontSize: '18px' }}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default ErrorPage;
