import React, { useState, useEffect } from 'react';

const UsuarioForm = ({ onSubmit, initialData = {}, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    perfil: 'COLABORADOR', // Default profile
    ativo: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        nome: initialData.nome || '',
        email: initialData.email || '',
        senha: '', // Password should not be pre-filled for editing
        perfil: initialData.perfil || 'COLABORADOR',
        ativo: initialData.ativo !== undefined ? initialData.ativo : true,
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!formData.nome || !formData.email) {
      setError('Nome e Email são obrigatórios.');
      return;
    }
    if (!isEditMode && !formData.senha) {
      setError('Senha é obrigatória para novos usuários.');
      return;
    }
    if (isEditMode) {
      const { senha, ...dataToSubmit } = formData;
      if (formData.senha) { // only include password if user entered a new one
          dataToSubmit.senha = formData.senha;
      }
      onSubmit(dataToSubmit);
    } else {
        onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="usuario-form">
      <h2>{isEditMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <label htmlFor="nome">Nome:</label>
        <input 
          type="text" 
          id="nome" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div>
        <label htmlFor="senha">Senha:</label>
        <input 
          type="password" 
          id="senha" 
          name="senha" 
          value={formData.senha} 
          onChange={handleChange} 
          placeholder={isEditMode ? 'Deixe em branco para manter a atual' : ''}
          required={!isEditMode} 
        />
      </div>
      
      <div>
        <label htmlFor="perfil">Perfil:</label>
        <select 
          id="perfil" 
          name="perfil" 
          value={formData.perfil} 
          onChange={handleChange}
        >
          <option value="ADMIN">Admin</option>
          <option value="GESTOR">Gestor</option>
          <option value="COLABORADOR">Colaborador</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="ativo">Ativo:</label>
        <input 
          type="checkbox" 
          id="ativo" 
          name="ativo" 
          checked={formData.ativo} 
          onChange={handleChange} 
        />
      </div>
      
      <button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Usuário'}</button>

      <style jsx>{`
        .usuario-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          max-width: 500px;
          margin: 2rem auto;
        }
        .usuario-form div {
          display: flex;
          flex-direction: column;
        }
        .usuario-form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .usuario-form input[type="text"],
        .usuario-form input[type="email"],
        .usuario-form input[type="password"],
        .usuario-form select {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        .usuario-form input[type="checkbox"] {
          width: auto;
          margin-right: auto;
        }
        .usuario-form button {
          padding: 0.75rem 1.5rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s ease;
        }
        .usuario-form button:hover {
          background-color: #0056b3;
        }
        .error-message {
          color: red;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </form>
  );
};

export default UsuarioForm;

