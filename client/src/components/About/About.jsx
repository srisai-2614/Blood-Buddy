// About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Blood Buddy</h2>
        <p>
          Blood Buddy is a platform that connects blood donors with individuals in need of blood.
          Our goal is to make the process of finding and connecting with blood donors easy and efficient.
        </p>
        <div className="how-it-works">
          <h3>How it Works</h3>
          <ol>
            <li>Register or log in to access the platform.</li>
            <li>Search for blood donors based on blood group and region.</li>
            <li>Contact donors and coordinate the blood donation process.</li>
          </ol>
        </div>
        <p>
          Join us in saving lives through the simple act of donating blood.
        </p>
      </div>
    </div>
  );
};

export default About;
