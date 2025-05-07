import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PerfilForm from '../components/PerfilForm';
import CustosRHForm from '../components/CustosRHForm'; // Import CustosRHForm

const PerfisPage = () => {
  const [perfis, setPerfis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPerfilForm, setShowPerfilForm] = useState(false);
  const [editingPerfil, setEditingPerfil] = useState(null);

  // State for CustosRH Modal
  const [showCustosRHModal, setShowCustosRHModal] = useState(false);
  const [selectedPerfilForCustos, setSelectedPerfilForCustos] = useState(null);
  const [custosRH, setCustosRH] = useState([]);
  const [editingCustoRH, setEditingCustoRH] = useState(null);
  const [loadingCustosRH, setLoadingCustosRH] = useState(false);

  const apiClient = axios.create({
    baseURL: '/api',
    // headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
  });

  const fetchPerfis = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/perfis-profissionais');
      setPerfis(response.data);
    } catch (err) {
      console.error("Erro ao buscar perfis profissionais:", err);
      setError('Falha ao carregar perfis. Tente novamente mais tarde.');
    }
    setLoading(false);
  }, [apiClient]);

  useEffect(() => {
    fetchPerfis();
  }, [fetchPerfis]);

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
      fetchPerfis();
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
        fetchPerfis();
      } catch (err) {
        console.error("Erro ao excluir perfil:", err);
        alert('Falha ao excluir perfil.');
      }
    }
  };

  // --- CustosRH Logic ---
  const fetchCustosRH = useCallback(async (perfilId) => {
    if (!perfilId) return;
    setLoadingCustosRH(true);
    try {
      const response = await apiClient.get(`/perfis-profissionais/${perfilId}/custos-rh`);
      setCustosRH(response.data);
    } catch (err) {
      console.error(`Erro ao buscar Custos RH para o perfil ${perfilId}:`, err);
      setCustosRH([]); // Clear previous data on error
      alert('Falha ao carregar custos de RH.');
    }
    setLoadingCustosRH(false);
  }, [apiClient]);

  const handleManageCustosRH = (perfil) => {
    setSelectedPerfilForCustos(perfil);
    setShowCustosRHModal(true);
    fetchCustosRH(perfil.id);
  };

  const handleCustoRHFormSubmit = async (formData) => {
    if (!selectedPerfilForCustos) return;
    const perfilId = selectedPerfilForCustos.id;
    try {
      if (editingCustoRH) {
        await apiClient.patch(`/perfis-profissionais/${perfilId}/custos-rh/${editingCustoRH.id}`, formData);
        alert('Custo RH atualizado com sucesso!');
      } else {
        await apiClient.post(`/perfis-profissionais/${perfilId}/custos-rh`, formData);
        alert('Custo RH adicionado com sucesso!');
      }
      setEditingCustoRH(null);
      fetchCustosRH(perfilId); // Refresh list
      // Potentially close form or allow adding more
    } catch (err) {
      console.error("Erro ao salvar Custo RH:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar Custo RH.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEditCustoRH = (custo) => {
    setEditingCustoRH(custo);
    // The CustosRHForm will be displayed within the modal, already open
  };

  const handleDeleteCustoRH = async (custoId) => {
    if (!selectedPerfilForCustos) return;
    if (window.confirm('Tem certeza que deseja excluir este custo de RH?')) {
      try {
        await apiClient.delete(`/perfis-profissionais/${selectedPerfilForCustos.id}/custos-rh/${custoId}`);
        alert('Custo RH excluído com sucesso!');
        fetchCustosRH(selectedPerfilForCustos.id);
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
    return <p>Carregando perfis profissionais...</p>;
  }

  return (
    <div className="perfis-page">
      <h1>Gerenciamento de Perfis Profissionais</h1>

      {showPerfilForm ? (
        <PerfilForm 
          onSubmit={handlePerfilFormSubmit} 
          initialData={editingPerfil || {}}
        />
      ) : (
        <button onClick={() => { setEditingPerfil(null); setShowPerfilForm(true); }}>Adicionar Novo Perfil</button>
      )}
      
      <button onClick={() => { setShowPerfilForm(false); setEditingPerfil(null);}} style={{ display: showPerfilForm ? 'inline-block' : 'none', marginLeft: '10px' }}>
        {editingPerfil ? 'Cancelar Edição Perfil' : 'Cancelar Adição Perfil'}
      </button>

      {error && !showPerfilForm && <p style={{ color: 'red' }}>{error}</p>}

      {!showPerfilForm && perfis.length === 0 && !loading && (
        <p>Nenhum perfil profissional cadastrado.</p>
      )}
      {!showPerfilForm && perfis.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome do Perfil</th>
              <th>Descrição</th>
              <th>Vínculo</th>
              <th>Remuneração Base</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {perfis.map((perfil) => (
              <tr key={perfil.id}>
                <td>{perfil.nome}</td>
                <td>{perfil.descricao || '-'}</td>
                <td>{perfil.vinculo || '-'}</td>
                <td>{perfil.remuneracaoBase ? `R$ ${parseFloat(perfil.remuneracaoBase).toFixed(2)}` : '-'}</td>
                <td>
                  <button onClick={() => handleEditPerfil(perfil)}>Editar Perfil</button>
                  <button onClick={() => handleDeletePerfil(perfil.id)}>Excluir Perfil</button>
                  <button onClick={() => handleManageCustosRH(perfil)}>Custos RH</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCustosRHModal && selectedPerfilForCustos && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Custos RH para: {selectedPerfilForCustos.nome}</h2>
            <CustosRHForm 
              onSubmit={handleCustoRHFormSubmit} 
              initialData={editingCustoRH || {}}
              isEditMode={!!editingCustoRH}
              onCancel={() => setEditingCustoRH(null)} // Clear editing state on cancel within form if form handles it, or manage here
            />
            {editingCustoRH && <button onClick={() => setEditingCustoRH(null)} style={{marginBottom: '10px'}}>Cancelar Edição de Custo</button>}
            
            <h3>Custos Cadastrados</h3>
            {loadingCustosRH ? <p>Carregando custos...</p> :
              custosRH.length === 0 ? <p>Nenhum custo de RH cadastrado para este perfil.</p> :
              (
                <table className="custos-rh-table">
                  <thead>
                    <tr>
                      <th>Mês/Ano</th>
                      <th>Valor</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {custosRH.map(custo => (
                      <tr key={custo.id}>
                        <td>{custo.mesAnoReferencia ? new Date(custo.mesAnoReferencia).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', timeZone: 'UTC' }) : '-'}</td>
                        <td>{`R$ ${parseFloat(custo.valorCusto).toFixed(2)}`}</td>
                        <td>
                          <button onClick={() => handleEditCustoRH(custo)}>Editar</button>
                          <button onClick={() => handleDeleteCustoRH(custo.id)}>Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
            <button onClick={closeCustosRHModal} style={{marginTop: '20px'}}>Fechar Janela de Custos</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .perfis-page {
          padding: 2rem;
          font-family: sans-serif;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
        }
        button {
          margin-top: 10px;
          margin-right: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            width: 90%;
            max-width: 700px; /* Increased width for table and form */
            max-height: 90vh;
            overflow-y: auto;
        }
        .custos-rh-table {
            margin-top: 15px;
            font-size: 0.9em;
        }
        .custos-rh-table th, .custos-rh-table td {
            padding: 6px;
        }
      `}</style>
    </div>
  );
};

export default PerfisPage;

