// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientesPage from './pages/ClientesPage';
import ProjetosPage from './pages/ProjetosPage';
import AlocacoesPage from './pages/AlocacoesPage';
import PerfisPage from './pages/PerfisPage';
import ViagensPage from './pages/ViagensPage';
import RubricasPage from './pages/RubricasPage';
import UsuariosPage from './pages/UsuariosPage';

// CSS global básico
const globalStyles = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f7;
  }
  
  * {
    box-sizing: border-box;
  }
`;

function App() {
  // Verificar se estamos no ambiente de desenvolvimento para facilitar testes
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <BrowserRouter>
      <style>{globalStyles}</style>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="projetos" element={<ProjetosPage />} />
            <Route path="alocacoes" element={<AlocacoesPage />} />
            <Route path="perfis" element={<PerfisPage />} />
            <Route path="viagens" element={<ViagensPage />} />
            <Route path="rubricas" element={<RubricasPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />
          </Route>
          {/* Rota para lidar com caminhos não encontrados */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;