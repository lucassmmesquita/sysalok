import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ProjetoForm = ({ onSubmit, initialData = {}, clientes = [] }) => {
  const [formData, setFormData] = useState({
    nome: '',
    clienteId: '',
    dataInicio: '',
    dataFim: '',
    status: 'PLANEJADO', // Default status
    ...initialData,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Format dates for input type="date"
    const formattedInitialData = {
      ...initialData,
      dataInicio: initialData.dataInicio ? new Date(initialData.dataInicio).toISOString().split('T')[0] : '',
      dataFim: initialData.dataFim ? new Date(initialData.dataFim).toISOString().split('T')[0] : '',
    };
    setFormData({
      nome: '',
      clienteId: '',
      dataInicio: '',
      dataFim: '',
      status: 'PLANEJADO',
      ...formattedInitialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nome || !formData.clienteId) {
        setError('Nome do Projeto e Cliente são obrigatórios.');
        return;
    }

    if (formData.dataInicio && formData.dataFim && new Date(formData.dataInicio) > new Date(formData.dataFim)) {
        setError('A Data de Início não pode ser posterior à Data de Fim.');
        return;
    }

    // Prepare data for submission, ensuring dates are in correct format if needed by backend
    const dataToSubmit = {
        ...formData,
        // Convert dates back to ISO string or other format if backend expects it differently
        // For Prisma, it usually handles date strings well, but ensure consistency
        dataInicio: formData.dataInicio ? new Date(formData.dataInicio).toISOString() : null,
        dataFim: formData.dataFim ? new Date(formData.dataFim).toISOString() : null,
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="projeto-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="nome">Nome do Projeto:*</label>
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
        <label htmlFor="clienteId">Cliente:*</label>
        <select
          id="clienteId"
          name="clienteId"
          value={formData.clienteId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um Cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="dataInicio">Data Início:</label>
        <input
          type="date"
          id="dataInicio"
          name="dataInicio"
          value={formData.dataInicio}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dataFim">Data Fim:</label>
        <input
          type="date"
          id="dataFim"
          name="dataFim"
          value={formData.dataFim}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="PLANEJADO">Planejado</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDO">Concluído</option>
          <option value="CANCELADO">Cancelado</option>
          <option value="SUSPENSO">Suspenso</option>
        </select>
      </div>
      <button type="submit">{initialData.id ? 'Atualizar Projeto' : 'Adicionar Projeto'}</button>
      <style jsx>{`
        .projeto-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          margin-bottom: 1rem; /* Add some space below the form */
        }
        .projeto-form div {
          display: flex;
          flex-direction: column;
        }
        .projeto-form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .projeto-form input,
        .projeto-form select {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .projeto-form button {
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        .projeto-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </form>
  );
};

export default ProjetoForm;

