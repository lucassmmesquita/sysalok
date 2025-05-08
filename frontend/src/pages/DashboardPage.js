// frontend/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalClientes: 0,
    totalProjetos: 0,
    projetosEmAndamento: 0,
    totalAlocacoes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de busca de estatísticas do dashboard
    // Em um ambiente real, isso seria uma chamada de API
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Simular estatísticas - em produção você faria uma chamada a API real
        setTimeout(() => {
          setStats({
            totalClientes: 12,
            totalProjetos: 25,
            projetosEmAndamento: 18,
            totalAlocacoes: 156
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: 'Gerenciar Clientes',
      icon: 'users',
      description: 'Cadastre e gerencie seus clientes',
      link: '/clientes',
      color: '#34c759'
    },
    {
      title: 'Gerenciar Projetos',
      icon: 'briefcase',
      description: 'Crie e gerencie seus projetos',
      link: '/projetos',
      color: '#0071e3'
    },
    {
      title: 'Gerenciar Alocações',
      icon: 'calendar',
      description: 'Gerencie alocações de recursos',
      link: '/alocacoes',
      color: '#ff9500'
    },
    {
      title: 'Perfis Profissionais',
      icon: 'user-check',
      description: 'Gerencie perfis e custos de RH',
      link: '/perfis',
      color: '#5e5ce6'
    },
    {
      title: 'Viagens',
      icon: 'map-pin',
      description: 'Gerencie despesas com viagens',
      link: '/viagens',
      color: '#ff3b30'
    },
    {
      title: 'Rubricas',
      icon: 'dollar-sign',
      description: 'Consolidação de custos e rubricas',
      link: '/rubricas',
      color: '#ff9500'
    }
  ];
  
  const getIcon = (iconName) => {
    const icons = {
      users: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      briefcase: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      calendar: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      'user-check': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 11L19 13L23 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      'map-pin': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      'dollar-sign': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    };
    
    return icons[iconName] || null;
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <h1>Bem-vindo ao SysAlok, {user ? user.nome : 'Usuário'}!</h1>
        <p>Seu sistema de gestão de projetos e alocações de recursos</p>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando informações...</p>
        </div>
      ) : (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <h3>{stats.totalClientes}</h3>
              <p>Clientes</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalProjetos}</h3>
              <p>Projetos</p>
            </div>
            <div className="stat-card">
              <h3>{stats.projetosEmAndamento}</h3>
              <p>Projetos Ativos</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalAlocacoes}</h3>
              <p>Alocações</p>
            </div>
          </div>
          
          <h2>Módulos do Sistema</h2>
          <div className="dashboard-cards">
            {dashboardCards.map((card, index) => (
              <Link to={card.link} className="dashboard-card" key={index}>
                <div className="card-icon" style={{ color: card.color }}>
                  {getIcon(card.icon)}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Link>
            ))}
          </div>
        </>
      )}
      
      <style jsx>{`
        .dashboard-page {
          padding: 32px 0;
        }
        
        .dashboard-welcome {
          margin-bottom: 32px;
          text-align: center;
        }
        
        .dashboard-welcome h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }
        
        .dashboard-welcome p {
          color: #86868b;
          font-size: 1.1rem;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 0;
        }
        
        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left: 4px solid #0071e3;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }
        
        .stat-card {
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        
        .stat-card h3 {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #0071e3;
        }
        
        .stat-card p {
          color: #86868b;
          font-size: 0.9rem;
          margin: 0;
        }
        
        h2 {
          font-size: 1.5rem;
          margin-bottom: 24px;
        }
        
        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .dashboard-card {
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        
        .dashboard-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        
        .card-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: rgba(0, 0, 0, 0.05);
          margin-bottom: 16px;
        }
        
        .dashboard-card h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }
        
        .dashboard-card p {
          color: #86868b;
          font-size: 0.9rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .dashboard-welcome h1 {
            font-size: 1.75rem;
          }
          
          .dashboard-welcome p {
            font-size: 1rem;
          }
          
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stat-card h3 {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .dashboard-page {
            padding: 16px 0;
          }
          
          .stats-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;