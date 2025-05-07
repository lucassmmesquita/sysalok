import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProjetoForm from '../components/ProjetoForm'; // Import the form component

const ProjetosPage = () => {
  const [projetos, setProjetos] = useState([]);
  const [clientes, setClientes] = useState([]); // To populate client dropdown in form
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProjeto, setEditingProjeto] = useState(null);

  const apiClient = axios.create({
    baseURL: '/api',
    // headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
  });

  const fetchProjetos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/projetos');
      setProjetos(response.data);
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
      setError('Falha ao carregar projetos. Tente novamente mais tarde.');
    }
    setLoading(false);
  }, [apiClient]);

  const fetchClientes = useCallback(async () => {
    try {
      const response = await apiClient.get('/clientes');
      setClientes(response.data);
    } catch (err) {
      console.error("Erro ao buscar clientes para o formulário:", err);
      // setError('Falha ao carregar lista de clientes para o formulário.'); // Optional: separate error for this
    }
  }, [apiClient]);

  useEffect(() => {
    fetchProjetos();
    fetchClientes(); // Fetch clients when component mounts
  }, [fetchProjetos, fetchClientes]);

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
      fetchProjetos(); // Refresh the list
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
        fetchProjetos(); // Refresh the list
      } catch (err) {
        console.error("Erro ao excluir projeto:", err);
        alert('Falha ao excluir projeto.');
      }
    }
  };
  
  if (loading && !showForm) {
    return <p>Carregando projetos...</p>;
  }

  return (
    <div className="projetos-page">
      <h1>Gerenciamento de Projetos</h1>

      {showForm ? (
        <ProjetoForm 
          onSubmit={handleFormSubmit} 
          initialData={editingProjeto || {}}
          clientes={clientes} // Pass clientes to the form
        />
      ) : (
        <button onClick={() => { setEditingProjeto(null); setShowForm(true); }}>Adicionar Novo Projeto</button>
      )}
      
      <button onClick={() => setShowForm(false)} style={{ display: showForm ? 'inline-block' : 'none', marginLeft: '10px' }}>
        {editingProjeto ? 'Cancelar Edição' : 'Cancelar Adição'}
      </button>

      {error && !showForm && <p style={{ color: 'red' }}>{error}</p>}

      {!showForm && projetos.length === 0 && !loading && (
        <p>Nenhum projeto cadastrado.</p>
      )}
      {!showForm && projetos.length > 0 && (
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
                <td>
                  <button onClick={() => handleEdit(projeto)}>Editar</button>
                  <button onClick={() => handleDelete(projeto.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        .projetos-page {
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
      `}</style>
    </div>
  );
};

export default ProjetosPage;

