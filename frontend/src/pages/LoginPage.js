// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Falha no login. Verifique suas credenciais ou tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h1>SysAlok</h1>
          <p>Sistema de Gestão de Projetos e Alocações</p>
        </div>
        
        <div className="login-form-container">
          <h2>Bem-vindo</h2>
          <p>Faça login para continuar</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Processando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f5f5f7;
          padding: 20px;
        }
        
        .login-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .login-logo {
          padding: 32px;
          text-align: center;
          background-color: #1d1d1f;
          color: white;
        }
        
        .login-logo h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.025em;
        }
        
        .login-logo p {
          margin: 8px 0 0;
          font-size: 14px;
          opacity: 0.8;
        }
        
        .login-form-container {
          padding: 32px;
        }
        
        .login-form-container h2 {
          margin: 0;
          font-size: 24px;
        }
        
        .login-form-container p {
          margin: 8px 0 24px;
          color: #86868b;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d2d2d7;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s ease;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #0071e3;
        }
        
        .error-message {
          color: #ff3b30;
          font-size: 14px;
          margin-bottom: 20px;
        }
        
        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #0071e3;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .login-button:hover {
          background-color: #0062c4;
        }
        
        .login-button:disabled {
          background-color: #0071e3;
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        @media (max-width: 480px) {
          .login-logo, .login-form-container {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;