// AuthForm.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const AuthForm = () => {
  const { apiKey, login, logout, setApiKey } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [password_confirmation, setPasswordConfirmation] = useState('password');

  const handleLogin = async () => {
    try {
      // Perform login
      const response = await login(email, password, password_confirmation);
  
      console.log('Sessions API response:', response);
      
      // If login was successful, set the API key
      if (response.status === 200) {
        setApiKey(response.data.data.attributes.api_key);
      }
      // Reset form fields
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');

    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };
  

  const handleLogout = () => {
    // Perform logout
    logout();
    setApiKey(null);
  };

  return (
    <div>
      {apiKey ? (
        // If logged in, show logout button
        <button onClick={handleLogout}>Logout</button>
      ) : (
        // If not logged in, show login form
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password Confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
