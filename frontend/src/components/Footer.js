// frontend/src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} SysAlok - Sistema de Gestão de Projetos e Alocações</p>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: #1d1d1f;
          color: white;
          padding: 16px 0;
          margin-top: auto;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }
        
        .footer p {
          margin: 0;
          font-size: 14px;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            padding: 0 16px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;