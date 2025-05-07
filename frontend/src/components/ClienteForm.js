import React, { useState, useEffect } from 'react';

const ClienteForm = ({ onSubmit, initialData = {}, clientesExistentes = [] }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    contatoPrincipal: '',
    email: '',
    telefone: '',
    ...initialData,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      nome: '',
      cnpj: '',
      contatoPrincipal: '',
      email: '',
      telefone: '',
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic CNPJ validation (only if provided and not editing the same CNPJ)
    if (formData.cnpj) {
      const cnpjPattern = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
      if (!cnpjPattern.test(formData.cnpj)) {
        setError('CNPJ inválido. Formato esperado: XX.XXX.XXX/XXXX-XX ou XXXXXXXXXXXXXX');
        return;
      }
      // Check for duplicate CNPJ if it's a new client or CNPJ has changed
      if (!initialData.id || initialData.cnpj !== formData.cnpj) {
        if (clientesExistentes.some(cliente => cliente.cnpj === formData.cnpj && cliente.id !== initialData.id)) {
          setError('Já existe um cliente cadastrado com este CNPJ.');
          return;
        }
      }
    }
    // Basic Email validation
    if (formData.email) {
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailPattern.test(formData.email)){
            setError('Email inválido.');
            return;
        }
    }


    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="cliente-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="nome">Nome do Cliente:*</label>
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
        <label htmlFor="cnpj">CNPJ:</label>
        <input
          type="text"
          id="cnpj"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          placeholder="XX.XXX.XXX/XXXX-XX"
        />
      </div>
      <div>
        <label htmlFor="contatoPrincipal">Contato Principal:</label>
        <input
          type="text"
          id="contatoPrincipal"
          name="contatoPrincipal"
          value={formData.contatoPrincipal}
          onChange={handleChange}
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
        />
      </div>
      <div>
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{initialData.id ? 'Atualizar Cliente' : 'Adicionar Cliente'}</button>
      <style jsx>{`
        .cliente-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .cliente-form div {
          display: flex;
          flex-direction: column;
        }
        .cliente-form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .cliente-form input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .cliente-form button {
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        .cliente-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </form>
  );
};

export default ClienteForm;

