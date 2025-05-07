import React, { useState, useEffect } from 'react';

const CustosRHForm = ({ onSubmit, initialData = {}, isEditMode = false, onCancel }) => {
  const [formData, setFormData] = useState({
    mesAnoReferencia: '', // Formato YYYY-MM
    valorCusto: '',
    // perfilProfissionalId is expected to be passed or handled by the parent component
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        mesAnoReferencia: initialData.mesAnoReferencia ? initialData.mesAnoReferencia.substring(0, 7) : '', // Ensure YYYY-MM format for input
        valorCusto: initialData.valorCusto || '',
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!formData.mesAnoReferencia || !formData.valorCusto) {
      setError('Mês/Ano de Referência e Valor do Custo são obrigatórios.');
      return;
    }
    if (!/^\d{4}-\d{2}$/.test(formData.mesAnoReferencia)) {
        setError('Formato do Mês/Ano de Referência deve ser YYYY-MM.');
        return;
    }
    if (isNaN(parseFloat(formData.valorCusto)) || parseFloat(formData.valorCusto) < 0) {
        setError('Valor do Custo deve ser um número positivo.');
        return;
    }
    
    onSubmit({ ...formData, valorCusto: parseFloat(formData.valorCusto) });
  };

  return (
    <div className="custos-rh-form-modal">
      <form onSubmit={handleSubmit} className="custos-rh-form">
        <h3>{isEditMode ? 'Editar Custo RH' : 'Adicionar Novo Custo RH'}</h3>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        
        <div>
          <label htmlFor="mesAnoReferencia">Mês/Ano de Referência (YYYY-MM):</label>
          <input 
            type="month" // Using type="month" for better UX, though backend expects YYYY-MM string
            id="mesAnoReferencia" 
            name="mesAnoReferencia" 
            value={formData.mesAnoReferencia} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="valorCusto">Valor do Custo (R$):</label>
          <input 
            type="number" 
            id="valorCusto" 
            name="valorCusto" 
            value={formData.valorCusto} 
            onChange={handleChange} 
            min="0" 
            step="0.01" 
            required 
          />
        </div>
        
        <div className="form-actions">
          <button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Custo'}</button>
          <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
        </div>

        <style jsx>{`
          .custos-rh-form-modal {
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background-color: rgba(0,0,0,0.5); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            z-index: 1000;
          }
          .custos-rh-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 2rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            width: 90%;
            max-width: 450px;
          }
          .custos-rh-form h3 {
            margin-top: 0;
            margin-bottom: 1rem;
            text-align: center;
          }
          .custos-rh-form div {
            display: flex;
            flex-direction: column;
          }
          .custos-rh-form label {
            margin-bottom: 0.5rem;
            font-weight: bold;
          }
          .custos-rh-form input[type="month"],
          .custos-rh-form input[type="number"] {
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
          }
          .form-actions {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 1rem;
            margin-top: 1rem;
          }
          .form-actions button {
            flex-grow: 1;
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.2s ease;
          }
          .form-actions button[type="submit"] {
            background-color: #007bff;
            color: white;
          }
          .form-actions button[type="submit"]:hover {
            background-color: #0056b3;
          }
          .form-actions .cancel-button {
            background-color: #6c757d;
            color: white;
          }
          .form-actions .cancel-button:hover {
            background-color: #5a6268;
          }
          .error-message {
            color: red;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            text-align: center;
          }
        `}</style>
      </form>
    </div>
  );
};

export default CustosRHForm;

