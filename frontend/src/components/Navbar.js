// frontend/src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-button" onClick={onMenuClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="navbar-brand">SysAlok</div>
        </div>
        <div className="navbar-right">
          {user ? (
            <div className="user-info">
              <span className="user-name">Olá, {user.nome}</span>
              <button onClick={handleLogout} className="logout-button">Sair</button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .navbar {
          background-color: #1d1d1f;
          color: white;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
        }
        
        .navbar-left {
          display: flex;
          align-items: center;
        }
        
        .navbar-brand {
          font-size: 24px;
          font-weight: 600;
          margin-left: 16px;
        }
        
        .menu-button {
          background: none;
          border: none;
          color: white;
          padding: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .navbar-right {
          display: flex;
          align-items: center;
        }
        
        .user-info {
          display: flex;
          align-items: center;
        }
        
        .user-name {
          margin-right: 16px;
          font-weight: 500;
        }
        
        .logout-button {
          background-color: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .logout-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
          .navbar-container {
            padding: 16px;
          }
          
          .user-name {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;