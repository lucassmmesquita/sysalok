// frontend/src/components/Layout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="main-content">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .main-content {
          display: flex;
          flex: 1;
          position: relative;
        }
        
        .content {
          flex: 1;
          padding: 32px;
          transition: margin-left 0.3s ease;
        }
        
        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (min-width: 992px) {
          .content {
            margin-left: 250px;
          }
        }
        
        @media (max-width: 991px) {
          .content {
            margin-left: 0;
          }
          
          .content.sidebar-open {
            margin-left: 0;
            opacity: 0.7;
          }
        }
        
        @media (max-width: 768px) {
          .content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;