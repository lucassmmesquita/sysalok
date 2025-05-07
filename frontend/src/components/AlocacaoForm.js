import React, { useState, useEffect } from 'react';

const AlocacaoForm = ({ onSubmit, initialData = {}, projetos = [], perfis = [] }) => {
  const [formData, setFormData] = useState({
    projetoId: '',
    perfilProfissionalId: '',
    // Initialize all 30 months
    ...Array.from({ length: 30 }, (_, i) => `mes${String(i + 1).padStart(2, '0')}`).reduce((acc, month) => ({ ...acc, [month]: 0 }), {}),
    ...initialData,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const defaultMonths = Array.from({ length: 30 }, (_, i) => `mes${String(i + 1).padStart(2, '0')}`).reduce((acc, month) => ({ ...acc, [month]: 0 }), {});
    setFormData({
      projetoId: '',
      perfilProfissionalId: '',
      ...defaultMonths,
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.projetoId || !formData.perfilProfissionalId) {
      setError('Projeto e Perfil Profissional são obrigatórios.');
      return;
    }
    
    // Validate month values (optional, but good practice)
    for (let i = 1; i <= 30; i++) {
      const monthKey = `mes${String(i).padStart(2, '0')}`;
      if (formData[monthKey] < 0) {
        setError(`Valor para ${monthKey} não pode ser negativo.`);
        return;
      }
    }

    onSubmit(formData);
  };

  const monthInputs = [];
  for (let i = 1; i <= 30; i++) {
    const monthKey = `mes${String(i).padStart(2, '0')}`;
    monthInputs.push(
      <div key={monthKey}>
        <label htmlFor={monthKey}>{`Mês ${String(i).padStart(2, '0')}:`}</label>
        <input
          type="number"
          id={monthKey}
          name={monthKey}
          value={formData[monthKey] || 0} // Ensure value is not undefined
          onChange={handleChange}
          min="0"
          step="0.01" // Or 1 if only whole numbers are allowed
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="alocacao-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="projetoId">Projeto:*</label>
        <select
          id="projetoId"
          name="projetoId"
          value={formData.projetoId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um Projeto</option>
          {projetos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="perfilProfissionalId">Perfil Profissional:*</label>
        <select
          id="perfilProfissionalId"
          name="perfilProfissionalId"
          value={formData.perfilProfissionalId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um Perfil</option>
          {perfis.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>
      
      <div className="months-grid">
        {monthInputs}
      </div>

      <button type="submit">{initialData.id ? 'Atualizar Alocação' : 'Adicionar Alocação'}</button>
      <style jsx>{`
        .alocacao-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          margin-bottom: 1rem;
        }
        .alocacao-form div:not(.months-grid) {
          display: flex;
          flex-direction: column;
        }
        .alocacao-form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .alocacao-form input,
        .alocacao-form select {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .months-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        .months-grid div {
            display: flex;
            flex-direction: column;
        }
        .alocacao-form button {
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        .alocacao-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </form>
  );
};

export default AlocacaoForm;

