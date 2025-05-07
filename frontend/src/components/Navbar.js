import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">SysAlok</div>
      <div className="navbar-user-info">
        {user ? (
          <>
            <span>Olá, {user.nome}</span>
            <button onClick={handleLogout} className="logout-button">Sair</button>
          </>
        ) : (
          <span></span> // Placeholder or login link if appropriate for public pages
        )}
      </div>
      {/* Basic styling - replace with your actual CSS or styling solution */}
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #333;
          color: white;
          font-family: sans-serif;
        }
        .navbar-brand {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .navbar-user-info {
          display: flex;
          align-items: center;
        }
        .navbar-user-info span {
          margin-right: 1rem;
        }
        .logout-button {
          padding: 0.5rem 1rem;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .logout-button:hover {
          background-color: #c82333;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

