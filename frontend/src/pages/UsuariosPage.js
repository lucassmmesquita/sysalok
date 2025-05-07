import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UsuarioForm from '../components/UsuarioForm'; // Import the form component
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to check user role

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null); // Usuario being edited
  const { user } = useAuth(); // Get current user from AuthContext

  const apiClient = axios.create({
    baseURL: '/http://localhost:3000/api/',
    // headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` } // Handled by AuthContext or interceptor ideally
  });

  const fetchUsuarios = useCallback(async () => {
    if (user?.perfil !== 'ADMIN') {
      setError('Acesso negado. Apenas administradores podem gerenciar usuários.');
      setLoading(false);
      setUsuarios([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/usuarios');
      setUsuarios(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError('Falha ao carregar usuários. Verifique sua conexão ou tente novamente mais tarde.');
    }
    setLoading(false);
  }, [apiClient, user?.perfil]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const handleFormSubmit = async (formData) => {
    if (user?.perfil !== 'ADMIN') {
      alert('Acesso negado.');
      return;
    }
    try {
      if (editingUsuario) {
        await apiClient.patch(`/usuarios/${editingUsuario.id}`, formData);
        alert('Usuário atualizado com sucesso!');
      } else {
        await apiClient.post('/usuarios', formData);
        alert('Usuário adicionado com sucesso!');
      }
      setShowForm(false);
      setEditingUsuario(null);
      fetchUsuarios(); // Refresh the list
    } catch (err) {
      console.error("Erro ao salvar usuário:", err);
      const errorMessage = err.response?.data?.message || 'Falha ao salvar usuário.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const handleEdit = (usuario) => {
    if (user?.perfil !== 'ADMIN') {
      alert('Acesso negado.');
      return;
    }
    setEditingUsuario(usuario);
    setShowForm(true);
  };

  const handleDelete = async (usuarioId) => {
    if (user?.perfil !== 'ADMIN') {
      alert('Acesso negado.');
      return;
    }
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await apiClient.delete(`/usuarios/${usuarioId}`);
        alert('Usuário excluído com sucesso!');
        fetchUsuarios(); // Refresh the list
      } catch (err) {
        console.error("Erro ao excluir usuário:", err);
        alert('Falha ao excluir usuário.');
      }
    }
  };

  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  // If not admin and error is set (access denied), show error and nothing else.
  if (user?.perfil !== 'ADMIN' && error) {
    return <p style={{ color: 'red', padding: '2rem' }}>{error}</p>;
  }
  // If not admin and no error yet (e.g. still loading user profile), can show a generic message or nothing
  if (user?.perfil !== 'ADMIN' && !loading) {
      return <p style={{ color: 'orange', padding: '2rem' }}>Você não tem permissão para acessar esta página.</p>;
  }

  return (
    <div className="usuarios-page">
      <h1>Gerenciamento de Usuários (Admin)</h1>

      {showForm ? (
        <UsuarioForm 
          onSubmit={handleFormSubmit} 
          initialData={editingUsuario}
          isEditMode={!!editingUsuario}
        />
      ) : (
        <button onClick={() => { setEditingUsuario(null); setShowForm(true); }}>Adicionar Novo Usuário</button>
      )}
      
      <button onClick={() => { setShowForm(false); setEditingUsuario(null); }} style={{ display: showForm ? 'inline-block' : 'none', marginLeft: '10px' }}>
        {editingUsuario ? 'Cancelar Edição' : 'Cancelar Adição'}
      </button>

      {error && !showForm && <p style={{ color: 'red' }}>{error}</p>}

      {!showForm && usuarios.length === 0 && !loading && (
        <p>Nenhum usuário cadastrado.</p>
      )}
      {!showForm && usuarios.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.perfil}</td>
                <td>{usuario.ativo ? 'Sim' : 'Não'}</td>
                <td>
                  <button onClick={() => handleEdit(usuario)}>Editar</button>
                  <button onClick={() => handleDelete(usuario.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        .usuarios-page {
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
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        button:hover {
            background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default UsuariosPage;

