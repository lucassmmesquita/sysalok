// frontend/src/pages/ClientesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClienteForm from '../components/ClienteForm';

// Criar apiClient FORA do componente para evitar recriações
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Efeito para buscar clientes
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiClient.get('/clientes');
        setClientes(response.data);
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        setError('Falha ao carregar clientes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [fetchTrigger]); // Dependência apenas do trigger

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCliente) {
        await apiClient.patch(`/clientes/${editingCliente.id}`, formData);
        alert('Cliente atualizado com sucesso!');
      } else {
        await apiClient.post('/clientes', formData);
        alert('Cliente adicionado com sucesso!');
      }
      setShowForm(false);
      setEditingCliente(null);
      setFetchTrigger(prev => prev + 1); // Forçar nova busca
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar cliente.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setShowForm(true);
  };

  const handleDelete = async (clienteId) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await apiClient.delete(`/clientes/${clienteId}`);
        alert('Cliente excluído com sucesso!');
        setFetchTrigger(prev => prev + 1); // Forçar nova busca
      } catch (err) {
        console.error("Erro ao excluir cliente:", err);
        alert('Falha ao excluir cliente.');
      }
    }
  };

  if (loading && !showForm) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando clientes...</p>
        
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
    <div className="clientes-page">
      <div className="clientes-header">
        <h1>Gerenciamento de Clientes</h1>
        
        {!showForm && (
          <button className="add-button" onClick={() => { setEditingCliente(null); setShowForm(true); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Adicionar Novo Cliente
          </button>
        )}
      </div>

      {showForm ? (
        <div className="form-container">
          <ClienteForm 
            onSubmit={handleFormSubmit} 
            initialData={editingCliente || {}}
            clientesExistentes={clientes}
          />
          
          <button 
            onClick={() => { setShowForm(false); setEditingCliente(null); }} 
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

      {!showForm && clientes.length === 0 && !loading && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Nenhum cliente cadastrado</h3>
          <p>Clique no botão "Adicionar Novo Cliente" para começar.</p>
        </div>
      )}
      
      {!showForm && clientes.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Contato</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cnpj || '-'}</td>
                  <td>{cliente.contatoPrincipal || '-'}</td>
                  <td>{cliente.email || '-'}</td>
                  <td>{cliente.telefone || '-'}</td>
                  <td className="actions">
                    <button className="action-button edit" onClick={() => handleEdit(cliente)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(cliente.id)}>
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
        .clientes-page {
          padding: 24px 0;
        }
        
        .clientes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .clientes-header h1 {
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
          .clientes-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          
          table th:nth-child(3),
          table th:nth-child(4),
          table th:nth-child(5),
          table td:nth-child(3),
          table td:nth-child(4),
          table td:nth-child(5) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ClientesPage;