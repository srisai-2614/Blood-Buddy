// RegisterForm.jsx
import './RegisterForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterForm = () => {
  const Navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phoneNo: '',
    email: '',
    bloodGroup: '',
    region: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRegister = async () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/', registerForm);
      console.log('Registration successful:', response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error.response);
      alert('Registration failed. Please check your details.');
    }
    setIsFormVisible(false);
    setTimeout(() => {
      Navigate('/login');
    }, 500);
  };

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div className='register-form container'>
      <div className={`register-form ${isFormVisible ? '' : 'hidden'}`}>
        <h2>Register</h2>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={registerForm.name} onChange={handleInputChange} placeholder='Enter your name...' />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNo" value={registerForm.phoneNo} onChange={handleInputChange} placeholder='Enter your contact...' />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={registerForm.email} onChange={handleInputChange} placeholder='Enter your email...' />
        </div>
        <div>
          <label>Blood Group:</label>
          <input type="text" name="bloodGroup" value={registerForm.bloodGroup} onChange={handleInputChange} placeholder='Enter your Blood Group...'/>
        </div>
        <div>
          <label>Region:</label>
          <input type="text" name="region" value={registerForm.region} onChange={handleInputChange} placeholder='Enter your Region...'/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={registerForm.password} onChange={handleInputChange} placeholder='Enter your password...'/>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={registerForm.confirmPassword} onChange={handleInputChange} placeholder='Re-Enter your password...'/>
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
    </div>
  );
};

export default RegisterForm;
