import React, { useState, useEffect } from 'react';

const PerfilForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    vinculo: 'CLT', // Default value
    remuneracaoBase: '',
    ...initialData,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      nome: '',
      descricao: '',
      vinculo: 'CLT',
      remuneracaoBase: '',
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

    if (!formData.nome) {
      setError('Nome do Perfil é obrigatório.');
      return;
    }
    if (formData.remuneracaoBase && isNaN(parseFloat(formData.remuneracaoBase))){
        setError('Remuneração Base deve ser um número.');
        return;
    }
    if (formData.remuneracaoBase && parseFloat(formData.remuneracaoBase) < 0){
        setError('Remuneração Base não pode ser negativa.');
        return;
    }

    onSubmit({...formData, remuneracaoBase: formData.remuneracaoBase ? parseFloat(formData.remuneracaoBase) : null });
  };

  return (
    <form onSubmit={handleSubmit} className="perfil-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="nome">Nome do Perfil:*</label>
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
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="vinculo">Vínculo:</label>
        <select
          id="vinculo"
          name="vinculo"
          value={formData.vinculo}
          onChange={handleChange}
        >
          <option value="CLT">CLT</option>
          <option value="PJ">PJ</option>
          <option value="TERCEIRO">Terceiro</option>
          <option value="OUTRO">Outro</option>
        </select>
      </div>
      <div>
        <label htmlFor="remuneracaoBase">Remuneração Base (R$):</label>
        <input
          type="number"
          id="remuneracaoBase"
          name="remuneracaoBase"
          value={formData.remuneracaoBase}
          onChange={handleChange}
          step="0.01"
          placeholder="Ex: 5000.00"
        />
      </div>
      <button type="submit">{initialData.id ? 'Atualizar Perfil' : 'Adicionar Perfil'}</button>
      <style jsx>{`
        .perfil-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          margin-bottom: 1rem;
        }
        .perfil-form div {
          display: flex;
          flex-direction: column;
        }
        .perfil-form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .perfil-form input,
        .perfil-form select,
        .perfil-form textarea {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .perfil-form textarea {
          min-height: 80px;
        }
        .perfil-form button {
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        .perfil-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </form>
  );
};

export default PerfilForm;

