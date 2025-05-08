// frontend/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        setUser(JSON.parse(userDataString));
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        localStorage.removeItem('userData'); // Clear corrupted data
      }
    }
    // Token handling can be re-added here if your API starts sending tokens
    // const token = localStorage.getItem('userToken');
    // if (token && userDataString) { // Ensure userData is also present with token
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      console.log('Enviando para o login no AuthContext:', { email, senha });
      const response = await axios.post('http://localhost:3000/api/v1/usuarios/login', { email, senha });
      console.log('Resposta do login recebida no AuthContext:', response.data);

      // Correção: Espera que response.data seja o objeto do usuário diretamente
      if (response.data && response.data.email) { // Verifica se é um objeto de usuário válido
        const userData = response.data;
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        
        // Se sua API de login começar a retornar um token, você pode descomentar e ajustar esta parte:
        // if (response.data.token) {
        //   localStorage.setItem('userToken', response.data.token);
        //   axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        // }
        return userData;
      } else {
        console.error('Formato inesperado da resposta do login ou usuário não retornado:', response.data);
        throw new Error('Resposta inesperada do servidor ou falha na autenticação.');
      }
    } catch (error) {
      console.error('Login failed in AuthContext:', error.response ? error.response.data : error.message);
      // Re-throw o erro para que LoginPage.js possa pegá-lo e mostrar a mensagem ao usuário
      throw error; 
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
    // delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);