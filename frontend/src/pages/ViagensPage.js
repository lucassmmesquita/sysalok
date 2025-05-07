import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ViagemForm from '../components/ViagemForm'; // Import the form component

const ViagensPage = () => {
  const [viagens, setViagens] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingViagem, setEditingViagem] = useState(null);
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
      console.error("Erro ao buscar projetos para filtro:", err);
    }
  }, [apiClient]);

  const fetchViagens = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint = selectedProjetoId ? `/viagens?projetoId=${selectedProjetoId}` : '/viagens';
      const response = await apiClient.get(endpoint);
      setViagens(response.data);
    } catch (err) {
      console.error("Erro ao buscar viagens:", err);
      setError('Falha ao carregar viagens. Tente novamente mais tarde.');
    }
    setLoading(false);
  }, [apiClient, selectedProjetoId]);

  useEffect(() => {
    fetchProjetos();
  }, [fetchProjetos]);

  useEffect(() => {
    fetchViagens();
  }, [fetchViagens]);

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
      fetchViagens(); // Refresh the list
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
        fetchViagens(); // Refresh the list
      } catch (err) {
        console.error("Erro ao excluir viagem:", err);
        alert('Falha ao excluir viagem.');
      }
    }
  };

  if (loading && !showForm) {
    return <p>Carregando viagens...</p>;
  }

  return (
    <div className="viagens-page">
      <h1>Gerenciamento de Viagens</h1>
      
      {!showForm && (
        <div>
          <label htmlFor="projetoSelect">Filtrar por Projeto: </label>
          <select 
            id="projetoSelect" 
            value={selectedProjetoId} 
            onChange={(e) => setSelectedProjetoId(e.target.value)}
          >
            <option value="">Todas as Viagens</option>
            {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
      )}

      {showForm ? (
        <ViagemForm 
          onSubmit={handleFormSubmit} 
          initialData={editingViagem || {}}
          projetos={projetos}
        />
      ) : (
        <button onClick={() => { setEditingViagem(null); setShowForm(true); }}>Adicionar Nova Viagem</button>
      )}
      
      <button onClick={() => setShowForm(false)} style={{ display: showForm ? 'inline-block' : 'none
', marginLeft: '10px' }}>
        {editingViagem ? 'Cancelar Edição' : 'Cancelar Adição'}
      </button>

      {error && !showForm && <p style={{ color: 'red' }}>{error}</p>}

      {!showForm && viagens.length === 0 && !loading ? (
        <p>Nenhuma viagem encontrada para o critério selecionado.</p>
      ) : null}
      {!showForm && viagens.length > 0 && (
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
              <th>Valor Hospedagem</th>
              <th>Qtde Diárias</th>
              <th>Valor Diária</th>
              <th>Total Diárias</th>
              <th>Total Geral</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {viagens.map((viagem) => (
              <tr key={viagem.id}>
                <td>{viagem.projeto?.nome || 'N/A'}</td>
                <td>{viagem.descricao}</td>
                <td>{viagem.dataInicio ? new Date(viagem.dataInicio).toLocaleDateString() : '-'}</td>
                <td>{viagem.dataFim ? new Date(viagem.dataFim).toLocaleDateString() : '-'}</td>
                <td>{viagem.origem || '-'}</td>
                <td>{viagem.destino || '-'}</td>
                <td>{viagem.valorPassagem ? `R$ ${parseFloat(viagem.valorPassagem).toFixed(2)}` : '-'}</td>
                <td>{viagem.valorHospedagem ? `R$ ${parseFloat(viagem.valorHospedagem).toFixed(2)}` : '-'}</td>
                <td>{viagem.qtdeDiarias || 0}</td>
                <td>{viagem.valorDiaria ? `R$ ${parseFloat(viagem.valorDiaria).toFixed(2)}` : '-'}</td>
                <td>{viagem.totalDiarias ? `R$ ${parseFloat(viagem.totalDiarias).toFixed(2)}` : '-'}</td>
                <td>{viagem.totalGeral ? `R$ ${parseFloat(viagem.totalGeral).toFixed(2)}` : '-'}</td>
                <td>
                  <button onClick={() => handleEdit(viagem)}>Editar</button>
                  <button onClick={() => handleDelete(viagem.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        .viagens-page {
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
          font-size: 0.8em; /* Smaller font for more columns */
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

export default ViagensPage;

