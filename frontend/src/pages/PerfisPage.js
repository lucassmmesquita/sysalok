// frontend/src/pages/PerfisPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PerfilForm from '../components/PerfilForm';
import CustosRHForm from '../components/CustosRHForm';

// Criar apiClient FORA do componente para evitar recriações
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const PerfisPage = () => {
  const [perfis, setPerfis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPerfilForm, setShowPerfilForm] = useState(false);
  const [editingPerfil, setEditingPerfil] = useState(null);
  const [showCustosRHModal, setShowCustosRHModal] = useState(false);
  const [selectedPerfilForCustos, setSelectedPerfilForCustos] = useState(null);
  const [custosRH, setCustosRH] = useState([]);
  const [editingCustoRH, setEditingCustoRH] = useState(null);
  const [loadingCustosRH, setLoadingCustosRH] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [fetchCustosTrigger, setFetchCustosTrigger] = useState(0);

  // Efeito para buscar perfis
  useEffect(() => {
    const fetchPerfis = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiClient.get('/perfis-profissionais');
        setPerfis(response.data);
      } catch (err) {
        console.error("Erro ao buscar perfis profissionais:", err);
        setError('Falha ao carregar perfis. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPerfis();
  }, [fetchTrigger]); // Dependência apenas do trigger

  // Efeito para buscar custos RH quando um perfil é selecionado
  useEffect(() => {
    if (!selectedPerfilForCustos) return;

    const fetchCustosRH = async () => {
      setLoadingCustosRH(true);
      try {
        const response = await apiClient.get(`/perfis-profissionais/${selectedPerfilForCustos.id}/custos-rh`);
        setCustosRH(response.data);
      } catch (err) {
        console.error(`Erro ao buscar Custos RH para o perfil ${selectedPerfilForCustos.id}:`, err);
        setCustosRH([]); // Limpar dados anteriores em caso de erro
      } finally {
        setLoadingCustosRH(false);
      }
    };

    fetchCustosRH();
  }, [selectedPerfilForCustos, fetchCustosTrigger]); // Dependência do perfil selecionado e do trigger

  const handlePerfilFormSubmit = async (formData) => {
    try {
      if (editingPerfil) {
        await apiClient.patch(`/perfis-profissionais/${editingPerfil.id}`, formData);
        alert('Perfil atualizado com sucesso!');
      } else {
        await apiClient.post('/perfis-profissionais', formData);
        alert('Perfil adicionado com sucesso!');
      }
      setShowPerfilForm(false);
      setEditingPerfil(null);
      setFetchTrigger(prev => prev + 1); // Forçar nova busca
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar perfil.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEditPerfil = (perfil) => {
    setEditingPerfil(perfil);
    setShowPerfilForm(true);
  };

  const handleDeletePerfil = async (perfilId) => {
    if (window.confirm('Tem certeza que deseja excluir este perfil profissional? Todos os custos de RH associados também serão excluídos.')) {
      try {
        await apiClient.delete(`/perfis-profissionais/${perfilId}`);
        alert('Perfil excluído com sucesso!');
        setFetchTrigger(prev => prev + 1); // Forçar nova busca
      } catch (err) {
        console.error("Erro ao excluir perfil:", err);
        alert('Falha ao excluir perfil.');
      }
    }
  };

  const handleManageCustosRH = (perfil) => {
    setSelectedPerfilForCustos(perfil);
    setShowCustosRHModal(true);
  };

  const handleCustoRHFormSubmit = async (formData) => {
    if (!selectedPerfilForCustos) return;
    
    const perfilId = selectedPerfilForCustos.id;
    try {
      if (editingCustoRH) {
        await apiClient.patch(`/perfis-profissionais/custos-rh/${editingCustoRH.id}`, formData);
        alert('Custo RH atualizado com sucesso!');
      } else {
        await apiClient.post(`/perfis-profissionais/${perfilId}/custos-rh`, {
          ...formData,
          perfilProfissionalId: perfilId
        });
        alert('Custo RH adicionado com sucesso!');
      }
      setEditingCustoRH(null);
      setFetchCustosTrigger(prev => prev + 1); // Forçar nova busca de custos
    } catch (err) {
      console.error("Erro ao salvar Custo RH:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar Custo RH.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEditCustoRH = (custo) => {
    setEditingCustoRH(custo);
  };

  const handleDeleteCustoRH = async (custoId) => {
    if (!selectedPerfilForCustos) return;
    
    if (window.confirm('Tem certeza que deseja excluir este custo de RH?')) {
      try {
        await apiClient.delete(`/perfis-profissionais/custos-rh/${custoId}`);
        alert('Custo RH excluído com sucesso!');
        setFetchCustosTrigger(prev => prev + 1); // Forçar nova busca de custos
      } catch (err) {
        console.error("Erro ao excluir Custo RH:", err);
        alert('Falha ao excluir Custo RH.');
      }
    }
  };

  const closeCustosRHModal = () => {
    setShowCustosRHModal(false);
    setSelectedPerfilForCustos(null);
    setCustosRH([]);
    setEditingCustoRH(null);
  };

  if (loading && !showPerfilForm && !showCustosRHModal) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando perfis profissionais...</p>
        
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
    <div className="perfis-page">
      <div className="perfis-header">
        <h1>Gerenciamento de Perfis Profissionais</h1>
        
        {!showPerfilForm && (
          <button className="add-button" onClick={() => { setEditingPerfil(null); setShowPerfilForm(true); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Adicionar Novo Perfil
          </button>
        )}
      </div>

      {showPerfilForm ? (
        <div className="form-container">
          <PerfilForm 
            onSubmit={handlePerfilFormSubmit} 
            initialData={editingPerfil || {}}
          />
          
          <button 
            onClick={() => { setShowPerfilForm(false); setEditingPerfil(null); }} 
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      ) : null}
      
      {error && !showPerfilForm && (
        <div className="error-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {error}
        </div>
      )}

      {!showPerfilForm && perfis.length === 0 && !loading && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 11L19 13L23 9" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Nenhum perfil profissional cadastrado</h3>
          <p>Clique no botão "Adicionar Novo Perfil" para começar.</p>
        </div>
      )}
      
      {!showPerfilForm && perfis.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome do Perfil</th>
                <th>Vínculo</th>
                <th>Remuneração Base</th>
                <th>Custo Mensal</th>
                <th>Valor Hora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {perfis.map((perfil) => (
                <tr key={perfil.id}>
                  <td>{perfil.nome}</td>
                  <td>{perfil.vinculo || '-'}</td>
                  <td>{perfil.remuneracao ? `R$ ${parseFloat(perfil.remuneracao).toFixed(2)}` : '-'}</td>
                  <td>{perfil.custoMensal ? `R$ ${parseFloat(perfil.custoMensal).toFixed(2)}` : '-'}</td>
                  <td>{perfil.valorHora ? `R$ ${parseFloat(perfil.valorHora).toFixed(2)}` : '-'}</td>
                  <td className="actions">
                    <button className="action-button edit" onClick={() => handleEditPerfil(perfil)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-button delete" onClick={() => handleDeletePerfil(perfil.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-button view" onClick={() => handleManageCustosRH(perfil)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCustosRHModal && selectedPerfilForCustos && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Custos RH para: {selectedPerfilForCustos.nome}</h2>
            
            <CustosRHForm 
              onSubmit={handleCustoRHFormSubmit} 
              initialData={editingCustoRH || {}}
              isEditMode={!!editingCustoRH}
              onCancel={() => setEditingCustoRH(null)}
            />
            
            {editingCustoRH && <button onClick={() => setEditingCustoRH(null)} className="secondary-button">Cancelar Edição de Custo</button>}
            
            <h3>Custos Cadastrados</h3>
            
            {loadingCustosRH ? (
              <div className="loading-container small">
                <div className="loading-spinner"></div>
                <p>Carregando custos...</p>
              </div>
            ) : custosRH.length === 0 ? (
              <p className="empty-message">Nenhum custo de RH cadastrado para este perfil.</p>
            ) : (
              <div className="table-container">
                <table className="custos-rh-table">
                  <thead>
                    <tr>
                      <th>Mês/Ano</th>
                      <th>Custo Mensal</th>
                      <th>Valor Hora</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {custosRH.map(custo => (
                      <tr key={custo.id}>
                        <td>{`${custo.mes.toString().padStart(2, '0')}/${custo.ano}`}</td>
                        <td>{`R$ ${parseFloat(custo.custoMensal).toFixed(2)}`}</td>
                        <td>{`R$ ${parseFloat(custo.valorHora).toFixed(2)}`}</td>
                        <td className="actions">
                          <button className="action-button edit" onClick={() => handleEditCustoRH(custo)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button className="action-button delete" onClick={() => handleDeleteCustoRH(custo.id)}>
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
            
            <button onClick={closeCustosRHModal} className="close-button">Fechar Janela de Custos</button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .perfis-page {
          padding: 24px 0;
        }
        
        .perfis-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .perfis-header h1 {
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
        
        .cancel-button, .close-button, .secondary-button {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .cancel-button, .close-button {
          display: block;
          margin: 16px auto 0;
          background-color: #86868b;
          color: white;
        }
        
        .cancel-button:hover, .close-button:hover {
          background-color: #6c6c70;
        }
        
        .secondary-button {
          display: inline-block;
          margin-right: 8px;
          background-color: #e8e8ed;
          color: #1d1d1f;
        }
        
        .secondary-button:hover {
          background-color: #d2d2d7;
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
        
        .empty-state svg, .empty-message {
          margin-bottom: 16px;
          opacity: 0.6;
        }
        
        .empty-state h3 {
          margin-bottom: 8px;
          color: #1d1d1f;
        }
        
        .empty-state p, .empty-message {
          color: #86868b;
        }
        
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
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
        
        .action-button.view {
          background-color: rgba(52, 199, 89, 0.1);
          color: #34c759;
        }
        
        .action-button.view:hover {
          background-color: rgba(52, 199, 89, 0.2);
        }
        
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal-content {
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          width: 90%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-content h2 {
          margin-top: 0;
          color: #1d1d1f;
        }
        
        .modal-content h3 {
          margin-top: 24px;
          color: #1d1d1f;
        }
        
        .loading-container.small {
          padding: 16px 0;
        }
        
        .loading-container.small .loading-spinner {
          width: 30px;
          height: 30px;
        }
        
        .custos-rh-table {
          margin-top: 16px;
        }
        
        @media (max-width: 768px) {
          .perfis-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          
          .modal-content {
            width: 95%;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default PerfisPage;