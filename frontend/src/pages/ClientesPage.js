import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ClienteForm from '../components/ClienteForm'; // Import the form component

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null); // Cliente being edited

  const apiClient = axios.create({
    baseURL: '/api', // Adjust to your backend API base URL
    // headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` } // If using token auth
  });

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/clientes');
      setClientes(response.data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
      setError('Falha ao carregar clientes. Tente novamente mais tarde.');
    }
    setLoading(false);
  }, [apiClient]);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCliente) {
        // Update existing cliente
        await apiClient.patch(`/clientes/${editingCliente.id}`, formData);
        alert('Cliente atualizado com sucesso!');
      } else {
        // Add new cliente
        await apiClient.post('/clientes', formData);
        alert('Cliente adicionado com sucesso!');
      }
      setShowForm(false);
      setEditingCliente(null);
      fetchClientes(); // Refresh the list
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar cliente.';
      alert(`Erro: ${errorMessage}`);
      // setError on form or page based on where you want to display it
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
        fetchClientes(); // Refresh the list
      } catch (err) {
        console.error("Erro ao excluir cliente:", err);
        alert('Falha ao excluir cliente.');
      }
    }
  };

  if (loading && !showForm) { // Don't show main loading if form is active for editing
    return <p>Carregando clientes...</p>;
  }

  return (
    <div className="clientes-page">
      <h1>Gerenciamento de Clientes</h1>

      {showForm ? (
        <ClienteForm 
          onSubmit={handleFormSubmit} 
          initialData={editingCliente || {}}
          clientesExistentes={clientes} // Pass existing clientes for CNPJ validation
        />
      ) : (
        <button onClick={() => { setEditingCliente(null); setShowForm(true); }}>Adicionar Novo Cliente</button>
      )}
      
      <button onClick={() => setShowForm(false)} style={{ display: showForm ? 'inline-block' : 'none', marginLeft: '10px' }}>
        {editingCliente ? 'Cancelar Edição' : 'Cancelar Adição'}
      </button>

      {error && !showForm && <p style={{ color: 'red' }}>{error}</p>}

      {!showForm && clientes.length === 0 && !loading && (
        <p>Nenhum cliente cadastrado.</p>
      )}
      {!showForm && clientes.length > 0 && (
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
                <td>
                  <button onClick={() => handleEdit(cliente)}>Editar</button>
                  <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Basic styling - replace with your actual CSS or styling solution */}
      <style jsx>{`
        .clientes-page {
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
          margin-top: 10px; /* Add some margin to buttons */
          margin-right: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ClientesPage;

