import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientesPage from './pages/ClientesPage';
import ProjetosPage from './pages/ProjetosPage';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Import AuthProvider and useAuth
// Placeholder for other pages
// import PerfisPage from './pages/PerfisPage';
// import AlocacoesPage from './pages/AlocacoesPage
// import ViagensPage from './pages/ViagensPage';
// import RubricasPage from './pages/RubricasPage';
// import UsuariosPage from './pages/UsuariosPage';

// Basic PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Use loading state from context

  if (loading) {
    return <div>Carregando...</div>; // Or a spinner component
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/*" 
        element={
          <PrivateRoute>
            <Layout>
              <Routes> {/* Nested routes for layout content */}
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/projetos" element={<ProjetosPage />} />
                {/* Add other routes here as they are built */}
                {/* <Route path="/perfis" element={<PerfisPage />} /> */}
                {/* <Route path="/alocacoes" element={<AlocacoesPage />} /> */}
                {/* <Route path="/viagens" element={<ViagensPage />} /> */}
                {/* <Route path="/rubricas" element={<RubricasPage />} /> */}
                {/* <Route path="/usuarios" element={<UsuariosPage />} /> */}
                <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Fallback for unknown routes inside layout*/}
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap AppContent with AuthProvider */}
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

