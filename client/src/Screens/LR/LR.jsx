import './LR.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Home from '../../components/Home/Home';
import SL from '../SL/SL';
import About from '../../components/About/About';

const LR = ({ handleLogin }) => {
  const Navigate = useNavigate();

  const login = () => {
    Navigate('/login', { replace: true });
  };

  const register = () => {
    Navigate('/register', { replace: true });
  };

  const Guest = () => {
    handleLogin();
    Navigate('/sl/*', { replace: true }); // Redirect to SL page
  };
  const customNavigate = (to) => {
    Navigate(to, { replace: true });
  };

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className='container'>
              <button className='Navitem1' onClick={() => customNavigate('/home')}>Home</button>
              <button className='Navitem2'onClick={() => login()}>Login</button>
              <button className='Navitem3' onClick={() => register()}>Register</button>
              <button className='Navitem4' onClick={() => Guest()}>Guest</button>
              <button className='Navitem4' onClick={() => Navigate('/about')}>About</button>
      </div>

      
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sl" element={<SL />} />
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  );
};

export default LR;
