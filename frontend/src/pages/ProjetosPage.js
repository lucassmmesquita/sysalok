// frontend/src/pages/ProjetosPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjetoForm from '../components/ProjetoForm';

// Criar apiClient FORA do componente para evitar recriações
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const ProjetosPage = () => {
  const [projetos, setProjetos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProjeto, setEditingProjeto] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Efeito para buscar clientes (necessário para o form)
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await apiClient.get('/clientes');
        setClientes(response.data);
      } catch (err) {
        console.error("Erro ao buscar clientes para o formulário:", err);
      }
    };

    fetchClientes();
  }, []); // Sem dependências - busca apenas uma vez

  // Efeito para buscar projetos
  useEffect(() => {
    const fetchProjetos = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiClient.get('/projetos');
        setProjetos(response.data);
      } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        setError('Falha ao carregar projetos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, [fetchTrigger]); // Dependência apenas do trigger

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProjeto) {
        await apiClient.patch(`/projetos/${editingProjeto.id}`, formData);
        alert('Projeto atualizado com sucesso!');
      } else {
        await apiClient.post('/projetos', formData);
        alert('Projeto adicionado com sucesso!');
      }
      setShowForm(false);
      setEditingProjeto(null);
      setFetchTrigger(prev => prev + 1); // Forçar nova busca
    } catch (err) {
      console.error("Erro ao salvar projeto:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar projeto.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEdit = (projeto) => {
    setEditingProjeto(projeto);
    setShowForm(true);
  };

  const handleDelete = async (projetoId) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto? Todas as alocações, viagens e rubricas associadas também podem ser afetadas.')) {
      try {
        await apiClient.delete(`/projetos/${projetoId}`);
        alert('Projeto excluído com sucesso!');
        setFetchTrigger(prev => prev + 1); // Forçar nova busca
      } catch (err) {
        console.error("Erro ao excluir projeto:", err);
        alert('Falha ao excluir projeto.');
      }
    }
  };
  
  if (loading && !showForm) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando projetos...</p>
        
        <style jsx>{`
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
        `}</style>
      </div>
    );
  }

  return (
    <div className="projetos-page">
      <div className="projetos-header">
        <h1>Gerenciamento de Projetos</h1>
        
        {!showForm && (
          <button className="add-button" onClick={() => { setEditingProjeto(null); setShowForm(true); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Adicionar Novo Projeto
          </button>
        )}
      </div>

      {showForm ? (
        <div className="form-container">
          <ProjetoForm 
            onSubmit={handleFormSubmit} 
            initialData={editingProjeto || {}}
            clientes={clientes}
          />
          
          <button 
            onClick={() => { setShowForm(false); setEditingProjeto(null); }} 
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      ) : null}
      
      {error && !showForm && (
        <div className="error-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {error}
        </div>
      )}

      {!showForm && projetos.length === 0 && !loading && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Nenhum projeto cadastrado</h3>
          <p>Clique no botão "Adicionar Novo Projeto" para começar.</p>
        </div>
      )}
      
      {!showForm && projetos.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome do Projeto</th>
                <th>Cliente</th>
                <th>Data Início</th>
                <th>Data Fim</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {projetos.map((projeto) => (
                <tr key={projeto.id}>
                  <td>{projeto.nome}</td>
                  <td>{projeto.cliente?.nome || 'N/A'}</td>
                  <td>{projeto.dataInicio ? new Date(projeto.dataInicio).toLocaleDateString() : '-'}</td>
                  <td>{projeto.dataFim ? new Date(projeto.dataFim).toLocaleDateString() : '-'}</td>
                  <td>{projeto.status || '-'}</td>
                  <td className="actions">
                    <button className="action-button edit" onClick={() => handleEdit(projeto)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(projeto.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <style jsx>{`
        .projetos-page {
          padding: 24px 0;
        }
        
        .projetos-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .projetos-header h1 {
          margin: 0;
        }
        
        .add-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #0071e3;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .add-button:hover {
          background-color: #0062c4;
        }
        
        .form-container {
          margin-bottom: 24px;
        }
        
        .cancel-button {
          display: block;
          margin: 16px auto 0;
          padding: 10px 20px;
          background-color: #86868b;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .cancel-button:hover {
          background-color: #6c6c70;
        }
        
        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background-color: rgba(255, 59, 48, 0.1);
          border-radius: 8px;
          color: #ff3b30;
          margin-bottom: 24px;
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 0;
          text-align: center;
        }
        
        .empty-state svg {
          margin-bottom: 16px;
          opacity: 0.6;
        }
        
        .empty-state h3 {
          margin-bottom: 8px;
          color: #1d1d1f;
        }
        
        .empty-state p {
          color: #86868b;
        }
        
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        table th {
          background-color: #f5f5f7;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1d1d1f;
        }
        
        table th:first-child {
          border-top-left-radius: 8px;
        }
        
        table th:last-child {
          border-top-right-radius: 8px;
        }
        
        table td {
          padding: 16px;
          border-top: 1px solid #f0f0f0;
        }
        
        table tr:hover td {
          background-color: #f9f9fb;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .action-button.edit {
          background-color: rgba(0, 113, 227, 0.1);
          color: #0071e3;
        }
        
        .action-button.edit:hover {
          background-color: rgba(0, 113, 227, 0.2);
        }
        
        .action-button.delete {
          background-color: rgba(255, 59, 48, 0.1);
          color: #ff3b30;
        }
        
        .action-button.delete:hover {
          background-color: rgba(255, 59, 48, 0.2);
        }
        
        @media (max-width: 768px) {
          .projetos-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjetosPage;