import React, { useState, useEffect } from 'react';

const ViagemForm = ({ onSubmit, initialData = {}, projetos = [] }) => {
  const [formData, setFormData] = useState({
    projetoId: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    origem: '',
    destino: '',
    valorPassagem: 0,
    valorHospedagem: 0,
    qtdeDiarias: 0,
    valorDiaria: 0,
    ...initialData,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const formattedInitialData = {
      ...initialData,
      dataInicio: initialData.dataInicio ? new Date(initialData.dataInicio).toISOString().split('T')[0] : '',
      dataFim: initialData.dataFim ? new Date(initialData.dataFim).toISOString().split('T')[0] : '',
      valorPassagem: initialData.valorPassagem || 0,
      valorHospedagem: initialData.valorHospedagem || 0,
      qtdeDiarias: initialData.qtdeDiarias || 0,
      valorDiaria: initialData.valorDiaria || 0,
    };
    setFormData({
      projetoId: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
      origem: '',
      destino: '',
      valorPassagem: 0,
      valorHospedagem: 0,
      qtdeDiarias: 0,
      valorDiaria: 0,
      ...formattedInitialData,
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

    if (!formData.projetoId || !formData.descricao) {
      setError('Projeto e Descrição da Viagem são obrigatórios.');
      return;
    }
    if (formData.dataInicio && formData.dataFim && new Date(formData.dataInicio) > new Date(formData.dataFim)) {
      setError('A Data de Início não pode ser posterior à Data de Fim.');
      return;
    }
    // Ensure numeric fields are numbers and not negative
    const numericFields = ['valorPassagem', 'valorHospedagem', 'qtdeDiarias', 'valorDiaria'];
    for (const field of numericFields) {
        if (formData[field] < 0) {
            setError(`O campo ${field} não pode ser negativo.`);
            return;
        }
    }

    const dataToSubmit = {
        ...formData,
        dataInicio: formData.dataInicio ? new Date(formData.dataInicio).toISOString() : null,
        dataFim: formData.dataFim ? new Date(formData.dataFim).toISOString() : null,
        valorPassagem: parseFloat(formData.valorPassagem) || 0,
        valorHospedagem: parseFloat(formData.valorHospedagem) || 0,
        qtdeDiarias: parseInt(formData.qtdeDiarias, 10) || 0,
        valorDiaria: parseFloat(formData.valorDiaria) || 0,
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="viagem-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="projetoId">Projeto:*</label>
        <select id="projetoId" name="projetoId" value={formData.projetoId} onChange={handleChange} required>
          <option value="">Selecione um Projeto</option>
          {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="descricao">Descrição da Viagem:*</label>
        <input type="text" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="dataInicio">Data Início:</label>
        <input type="date" id="dataInicio" name="dataInicio" value={formData.dataInicio} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="dataFim">Data Fim:</label>
        <input type="date" id="dataFim" name="dataFim" value={formData.dataFim} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="origem">Origem:</label>
        <input type="text" id="origem" name="origem" value={formData.origem} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="destino">Destino:</label>
        <input type="text" id="destino" name="destino" value={formData.destino} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="valorPassagem">Valor Passagem (R$):</label>
        <input type="number" id="valorPassagem" name="valorPassagem" value={formData.valorPassagem} onChange={handleChange} step="0.01" min="0"/>
      </div>
      <div>
        <label htmlFor="valorHospedagem">Valor Hospedagem (R$):</label>
        <input type="number" id="valorHospedagem" name="valorHospedagem" value={formData.valorHospedagem} onChange={handleChange} step="0.01" min="0"/>
      </div>
      <div>
        <label htmlFor="qtdeDiarias">Qtde Diárias:</label>
        <input type="number" id="qtdeDiarias" name="qtdeDiarias" value={formData.qtdeDiarias} onChange={handleChange} step="1" min="0"/>
      </div>
      <div>
        <label htmlFor="valorDiaria">Valor Diária (R$):</label>
        <input type="number" id="valorDiaria" name="valorDiaria" value={formData.valorDiaria} onChange={handleChange} step="0.01" min="0"/>
      </div>
      <button type="submit">{initialData.id ? 'Atualizar Viagem' : 'Adicionar Viagem'}</button>
      <style jsx>{`
        .viagem-form {
          display: flex; flex-direction: column; gap: 1rem; padding: 1rem;
          border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9; margin-bottom: 1rem;
        }
        .viagem-form div { display: flex; flex-direction: column; }
        .viagem-form label { margin-bottom: 0.5rem; font-weight: bold; }
        .viagem-form input, .viagem-form select { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
        .viagem-form button { padding: 0.75rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem; }
        .viagem-form button:hover { background-color: #0056b3; }
      `}</style>
    </form>
  );
};

export default ViagemForm;

