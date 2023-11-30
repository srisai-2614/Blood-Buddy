// App.js
import React, { useState } from 'react';
import './App.css';
import LR from './Screens/LR/LR';
import SL from './Screens/SL/SL';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      <nav>
        {isLoggedIn ? (
          <div>
            <SL handleLogout={handleLogout} />
          </div>
        ) : (
          <LR handleLogin={handleLogin} />
        )}
      </nav>
      
    </div>
  );
};

export default App;
