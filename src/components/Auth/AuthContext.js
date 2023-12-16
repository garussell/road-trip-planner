// AuthContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v0/sessions', {
        email: email,
        password: password,
      });

      console.log('Sessions API response:', response.data);

      setApiKey(response.data.api_key);
      return response; // Return the whole response to be used in AuthForm.js
    } catch (error) {
      console.error('Error occurred during login:', error);
      throw error; // Rethrow the error to be caught in AuthForm.js
    }
  };

  const logout = () => {
    setApiKey(null);
  };

  return (
    <AuthContext.Provider value={{ apiKey, login, logout, setApiKey }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
