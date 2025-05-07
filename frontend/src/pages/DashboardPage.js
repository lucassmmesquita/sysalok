import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Optional: if you want to display user-specific info

const DashboardPage = () => {
  const { user } = useAuth(); // Example: Get user info from context

  return (
    <div className="dashboard-page">
      <h1>Bem-vindo ao SysAlok, {user ? user.nome : 'Usuário'}!</h1>
      <p>Este é o seu painel de controle. A partir daqui, você pode navegar para as diferentes seções da aplicação.</p>
      
      <div className="dashboard-links">
        {/* Example links - these would typically be <Link> components from react-router-dom */}
        <a href="/clientes">Gerenciar Clientes</a>
        <a href="/projetos">Gerenciar Projetos</a>
        <a href="/alocacoes">Gerenciar Alocações</a>
        <a href="/perfis">Gerenciar Perfis Profissionais</a>
        {/* Add more links as needed */}
      </div>

      {/* Basic styling - replace with your actual CSS or styling solution */}
      <style jsx>{`
        .dashboard-page {
          padding: 2rem;
          font-family: sans-serif;
        }
        .dashboard-links {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .dashboard-links a {
          padding: 0.75rem 1.5rem;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          text-decoration: none;
          color: #333;
          text-align: center;
        }
        .dashboard-links a:hover {
          background-color: #e9e9e9;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;

