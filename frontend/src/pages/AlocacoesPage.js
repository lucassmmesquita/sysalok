import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AlocacaoForm from '../components/AlocacaoForm'; // Import the form component

const AlocacoesPage = () => {
  const [alocacoes, setAlocacoes] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [perfis, setPerfis] = useState([]); // For AlocacaoForm
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAlocacao, setEditingAlocacao] = useState(null);
  const [selectedProjetoId, setSelectedProjetoId] = useState('');

  const apiClient = axios.create({
    baseURL: '/api',
    // headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
  });

  const fetchProjetos = useCallback(async () => {
    try {
      const response = await apiClient.get('/projetos');
      setProjetos(response.data);
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
      // setError('Falha ao carregar projetos para filtro.'); // Keep main error for alocacoes
    }
  }, [apiClient]);

  const fetchPerfis = useCallback(async () => {
    try {
      const response = await apiClient.get('/perfis-profissionais');
      setPerfis(response.data);
    } catch (err) {
      console.error("Erro ao buscar perfis:", err);
      // setError('Falha ao carregar perfis para formulário.');
    }
  }, [apiClient]);

  const fetchAlocacoes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint = selectedProjetoId ? `/alocacoes?projetoId=${selectedProjetoId}` : '/alocacoes';
      const response = await apiClient.get(endpoint);
      setAlocacoes(response.data);
    } catch (err) {
      console.error("Erro ao buscar alocações:", err);
      setError('Falha ao carregar alocações. Tente novamente mais tarde.');
    }
    setLoading(false);
  }, [apiClient, selectedProjetoId]);

  useEffect(() => {
    fetchProjetos();
    fetchPerfis();
  }, [fetchProjetos, fetchPerfis]);

  useEffect(() => {
    // Fetch alocacoes when a project is selected or initially if no specific project is required first
    fetchAlocacoes();
  }, [fetchAlocacoes]); // Removed selectedProjetoId and projetos from deps to avoid multiple calls initially

  const handleFormSubmit = async (formData) => {
    try {
      if (editingAlocacao) {
        await apiClient.patch(`/alocacoes/${editingAlocacao.id}`, formData);
        alert('Alocação atualizada com sucesso!');
      } else {
        await apiClient.post('/alocacoes', formData);
        alert('Alocação adicionada com sucesso!');
      }
      setShowForm(false);
      setEditingAlocacao(null);
      fetchAlocacoes(); // Refresh the list
    } catch (err) {
      console.error("Erro ao salvar alocação:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar alocação.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEdit = (alocacao) => {
    setEditingAlocacao(alocacao);
    setShowForm(true);
  };

  const handleDelete = async (alocacaoId) => {
    if (window.confirm('Tem certeza que deseja excluir esta alocação?')) {
      try {
        await apiClient.delete(`/alocacoes/${alocacaoId}`);
        alert('Alocação excluída com sucesso!');
        fetchAlocacoes(); // Refresh the list
      } catch (err) {
        console.error("Erro ao excluir alocação:", err);
        alert('Falha ao excluir alocação.');
      }
    }
  };

  if (loading && !showForm) {
    return <p>Carregando alocações...</p>;
  }

  return (
    <div className="alocacoes-page">
      <h1>Gerenciamento de Alocações</h1>
      
      {!showForm && (
        <div>
          <label htmlFor="projetoSelect">Filtrar por Projeto: </label>
          <select 
            id="projetoSelect" 
            value={selectedProjetoId} 
            onChange={(e) => setSelectedProjetoId(e.target.value)}
          >
            <option value="">Todos os Projetos</option>
            {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
      )}

      {showForm ? (
        <AlocacaoForm 
          onSubmit={handleFormSubmit} 
          initialData={editingAlocacao || {}}
          projetos={projetos}
          perfis={perfis}
        />
      ) : (
        <button onClick={() => { setEditingAlocacao(null); setShowForm(true); }}>Adicionar Nova Alocação</button>
      )}
      
      <button onClick={() => setShowForm(false)} style={{ display: showForm ? 'inline-block' : 'none', marginLeft: '10px' }}>
        {editingAlocacao ? 'Cancelar Edição' : 'Cancelar Adição'}
      </button>

      {error && !showForm && <p style={{ color: 'red' }}>{error}</p>}

      {!showForm && alocacoes.length === 0 && !loading ? (
        <p>Nenhuma alocação encontrada para o critério selecionado.</p>
      ) : null}
      {!showForm && alocacoes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Perfil Profissional</th>
              {/* Dynamically generate month headers if needed, or keep fixed for simplicity */}
              <th>Mês 01</th>
              <th>Mês 02</th>
              {/* ... up to Mês 30 ... */}
              <th>Mês 30</th> 
              <th>Total Alocado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alocacoes.map((alocacao) => (
              <tr key={alocacao.id}>
                <td>{alocacao.projeto?.nome || 'N/A'}</td>
                <td>{alocacao.perfilProfissional?.nome || 'N/A'}</td>
                <td>{alocacao.mes01 || 0}</td>
                <td>{alocacao.mes02 || 0}</td>
                {/* ... render other months ... */}
                <td>{alocacao.mes30 || 0}</td>
                <td>{alocacao.totalAlocado || 0}</td>
                <td>
                  <button onClick={() => handleEdit(alocacao)}>Editar</button>
                  <button onClick={() => handleDelete(alocacao.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        .alocacoes-page {
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
          font-size: 0.85em; /* Smaller font for more columns */
        }
        th {
          background-color: #f0f0f0;
        }
        button, select {
          margin-top: 10px;
          margin-right: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
        select {
            min-width: 200px;
        }
      `}</style>
    </div>
  );
};

export default AlocacoesPage;

