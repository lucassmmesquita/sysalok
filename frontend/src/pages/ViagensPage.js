// frontend/src/pages/ViagensPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViagemForm from '../components/ViagemForm';

// Criar apiClient FORA do componente para evitar recriações
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const ViagensPage = () => {
  const [viagens, setViagens] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingViagem, setEditingViagem] = useState(null);
  const [selectedProjetoId, setSelectedProjetoId] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Efeito para buscar projetos
  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await apiClient.get('/projetos');
        setProjetos(response.data);
      } catch (err) {
        console.error("Erro ao buscar projetos para filtro:", err);
      }
    };

    fetchProjetos();
  }, []); // Sem dependências - busca apenas uma vez

  // Efeito para buscar viagens
  useEffect(() => {
    const fetchViagens = async () => {
      setLoading(true);
      setError('');
      try {
        const endpoint = selectedProjetoId ? `/viagens?projetoId=${selectedProjetoId}` : '/viagens';
        const response = await apiClient.get(endpoint);
        setViagens(response.data);
      } catch (err) {
        console.error("Erro ao buscar viagens:", err);
        setError('Falha ao carregar viagens. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchViagens();
  }, [selectedProjetoId, fetchTrigger]); // Dependência do ID do projeto e do trigger

  const handleFormSubmit = async (formData) => {
    try {
      if (editingViagem) {
        await apiClient.patch(`/viagens/${editingViagem.id}`, formData);
        alert('Viagem atualizada com sucesso!');
      } else {
        await apiClient.post('/viagens', formData);
        alert('Viagem adicionada com sucesso!');
      }
      setShowForm(false);
      setEditingViagem(null);
      setFetchTrigger(prev => prev + 1); // Forçar nova busca
    } catch (err) {
      console.error("Erro ao salvar viagem:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar viagem.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEdit = (viagem) => {
    setEditingViagem(viagem);
    setShowForm(true);
  };

  const handleDelete = async (viagemId) => {
    if (window.confirm('Tem certeza que deseja excluir esta viagem?')) {
      try {
        await apiClient.delete(`/viagens/${viagemId}`);
        alert('Viagem excluída com sucesso!');
        setFetchTrigger(prev => prev + 1); // Forçar nova busca
      } catch (err) {
        console.error("Erro ao excluir viagem:", err);
        alert('Falha ao excluir viagem.');
      }
    }
  };

  if (loading && !showForm) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando viagens...</p>
        
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
    <div className="viagens-page">
      <div className="viagens-header">
        <h1>Gerenciamento de Viagens</h1>
        
        {!showForm && (
          <div className="filter-container">
            <label htmlFor="projetoSelect">Filtrar por Projeto: </label>
            <select 
              id="projetoSelect" 
              value={selectedProjetoId} 
              onChange={(e) => setSelectedProjetoId(e.target.value)}
              className="filter-select"
            >
              <option value="">Todas as Viagens</option>
              {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>
        )}
      </div>

      {showForm ? (
        <div className="form-container">
          <ViagemForm 
            onSubmit={handleFormSubmit} 
            initialData={editingViagem || {}}
            projetos={projetos}
          />
          
          <button 
            onClick={() => { setShowForm(false); setEditingViagem(null); }} 
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button className="add-button" onClick={() => { setEditingViagem(null); setShowForm(true); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Adicionar Nova Viagem
        </button>
      )}

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

      {!showForm && viagens.length === 0 && !loading ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Nenhuma viagem encontrada</h3>
          <p>Clique no botão "Adicionar Nova Viagem" para começar.</p>
        </div>
      ) : !showForm && viagens.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Projeto</th>
                <th>Descrição</th>
                <th>Data Início</th>
                <th>Data Fim</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Valor Passagem</th>
                <th>Qtde Diárias</th>
                <th>Valor Diária</th>
                <th>Total Geral</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {viagens.map((viagem) => (
                <tr key={viagem.id}>
                  <td>{viagem.projeto?.nome || 'N/A'}</td>
                  <td>{viagem.descricaoVisita || viagem.descricao || '-'}</td>
                  <td>{viagem.dataInicio ? new Date(viagem.dataInicio).toLocaleDateString() : '-'}</td>
                  <td>{viagem.dataFim ? new Date(viagem.dataFim).toLocaleDateString() : '-'}</td>
                  <td>{viagem.origem || '-'}</td>
                  <td>{viagem.destino || '-'}</td>
                  <td>{viagem.valorPassagem ? `R$ ${parseFloat(viagem.valorPassagem).toFixed(2)}` : '-'}</td>
                  <td>{viagem.quantidadeDias || 0}</td>
                  <td>{viagem.valorDiaria ? `R$ ${parseFloat(viagem.valorDiaria).toFixed(2)}` : '-'}</td>
                  <td>{viagem.totalGeral ? `R$ ${parseFloat(viagem.totalGeral).toFixed(2)}` : '-'}</td>
                  <td className="actions">
                    <button className="action-button edit" onClick={() => handleEdit(viagem)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(viagem.id)}>
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
        .viagens-page {
          padding: 24px 0;
        }
        
        .viagens-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .viagens-header h1 {
          margin: 0;
        }
        
        .filter-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .filter-select {
          padding: 8px 12px;
          border: 1px solid #d2d2d7;
          border-radius: 8px;
          font-size: 14px;
          min-width: 200px;
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
          white-space: nowrap;
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
          white-space: nowrap;
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
          .viagens-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .filter-container {
            width: 100%;
          }
          
          .filter-select {
            flex: 1;
          }
          
          table th:nth-child(3),
          table th:nth-child(4),
          table th:nth-child(5),
          table th:nth-child(6),
          table th:nth-child(7),
          table th:nth-child(8),
          table td:nth-child(3),
          table td:nth-child(4),
          table td:nth-child(5),
          table td:nth-child(6),
          table td:nth-child(7),
          table td:nth-child(8) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ViagensPage;