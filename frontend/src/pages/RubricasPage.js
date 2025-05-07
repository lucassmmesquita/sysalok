import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx library
import jsPDF from 'jspdf'; // Import jsPDF library
import 'jspdf-autotable'; // Import jspdf-autotable for table support

const RubricasPage = () => {
  const [rubricas, setRubricas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProjetoId, setSelectedProjetoId] = useState('');
  const [selectedProjetoNome, setSelectedProjetoNome] = useState('');

  const apiClient = axios.create({
    baseURL: '/api',
  });

  const fetchProjetos = useCallback(async () => {
    try {
      const response = await apiClient.get('/projetos');
      setProjetos(response.data);
    } catch (err) {
      console.error("Erro ao buscar projetos para filtro:", err);
    }
  }, [apiClient]);

  const fetchRubricas = useCallback(async () => {
    if (!selectedProjetoId) {
      setRubricas([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get(`/rubricas?projetoId=${selectedProjetoId}`);
      setRubricas(response.data);
    } catch (err) {
      console.error("Erro ao buscar rubricas:", err);
      setError('Falha ao carregar rubricas para o projeto selecionado.');
    }
    setLoading(false);
  }, [apiClient, selectedProjetoId]);

  useEffect(() => {
    fetchProjetos();
  }, [fetchProjetos]);

  useEffect(() => {
    if (selectedProjetoId) {
      const projetoSelecionado = projetos.find(p => p.id === selectedProjetoId);
      setSelectedProjetoNome(projetoSelecionado ? projetoSelecionado.nome : '');
      fetchRubricas();
    } else {
      setRubricas([]);
      setSelectedProjetoNome('');
      setLoading(false);
    }
  }, [fetchRubricas, selectedProjetoId, projetos]);

  const handleConsolidarCustos = async () => {
    if (!selectedProjetoId) {
      alert('Por favor, selecione um projeto para consolidar os custos.');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post(`/rubricas/consolidar/${selectedProjetoId}`);
      alert('Custos do projeto consolidados com sucesso! Recarregando rubricas...');
      fetchRubricas();
    } catch (err) {
      console.error("Erro ao consolidar custos do projeto:", err);
      alert(`Falha ao consolidar custos: ${err.response?.data?.message || err.message}`);
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (!selectedProjetoId || rubricas.length === 0) {
      alert('Selecione um projeto com rubricas para exportar.');
      return;
    }
    const dataToExport = rubricas.map(r => ({
      'Descrição': r.descricao,
      'Tipo': r.tipo,
      'Custo RH (R$)': parseFloat(r.valorCustoRH || 0).toFixed(2),
      'Alocação (R$)': parseFloat(r.valorAlocacao || 0).toFixed(2),
      'Viagens (R$)': parseFloat(r.valorViagens || 0).toFixed(2),
      'Total Rubrica (R$)': parseFloat(r.valorTotalRubrica || 0).toFixed(2),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rubricas');
    XLSX.writeFile(workbook, `Rubricas_${selectedProjetoNome.replace(/\s+/g, '_') || 'Projeto'}.xlsx`);
  };

  const handleExportPDF = () => {
    if (!selectedProjetoId || rubricas.length === 0) {
      alert('Selecione um projeto com rubricas para exportar.');
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Relatório de Rubricas - Projeto: ${selectedProjetoNome || 'N/A'}`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const tableColumn = ["Descrição", "Tipo", "Custo RH (R$)", "Alocação (R$)", "Viagens (R$)", "Total Rubrica (R$)"];
    const tableRows = [];

    rubricas.forEach(rubrica => {
      const rubricaData = [
        rubrica.descricao,
        rubrica.tipo,
        parseFloat(rubrica.valorCustoRH || 0).toFixed(2),
        parseFloat(rubrica.valorAlocacao || 0).toFixed(2),
        parseFloat(rubrica.valorViagens || 0).toFixed(2),
        parseFloat(rubrica.valorTotalRubrica || 0).toFixed(2),
      ];
      tableRows.push(rubricaData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save(`Rubricas_${selectedProjetoNome.replace(/\s+/g, '_') || 'Projeto'}.pdf`);
  };

  return (
    <div className="rubricas-page">
      <h1>Gerenciamento de Rubricas e Consolidação de Custos</h1>
      
      <div>
        <label htmlFor="projetoSelect">Selecione o Projeto: </label>
        <select 
          id="projetoSelect" 
          value={selectedProjetoId} 
          onChange={(e) => setSelectedProjetoId(e.target.value)}
        >
          <option value="">-- Selecione um Projeto --</option>
          {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
      </div>

      {selectedProjetoId && (
        <>
          <button onClick={handleConsolidarCustos} disabled={loading || loadingCustosRH}>
            {loading ? 'Consolidando...' : 'Consolidar Custos do Projeto'}
          </button>
          <button onClick={handleExportExcel} style={{marginLeft: '10px'}} disabled={rubricas.length === 0}>
            Exportar para Excel
          </button>
          <button onClick={handleExportPDF} style={{marginLeft: '10px'}} disabled={rubricas.length === 0}>
            Exportar para PDF
          </button>
        </>
      )}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && selectedProjetoId && <p>Carregando rubricas...</p>}

      {!loading && selectedProjetoId && rubricas.length === 0 && (
        <p>Nenhuma rubrica encontrada para este projeto. Tente consolidar os custos.</p>
      )}
      {!loading && rubricas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Descrição da Rubrica</th>
              <th>Tipo</th>
              <th>Valor Custo RH</th>
              <th>Valor Alocação</th>
              <th>Valor Viagens</th>
              <th>Valor Total Rubrica</th>
            </tr>
          </thead>
          <tbody>
            {rubricas.map((rubrica) => (
              <tr key={rubrica.id}>
                <td>{rubrica.descricao}</td>
                <td>{rubrica.tipo}</td>
                <td>{rubrica.valorCustoRH ? `R$ ${parseFloat(rubrica.valorCustoRH).toFixed(2)}` : 'R$ 0.00'}</td>
                <td>{rubrica.valorAlocacao ? `R$ ${parseFloat(rubrica.valorAlocacao).toFixed(2)}` : 'R$ 0.00'}</td>
                <td>{rubrica.valorViagens ? `R$ ${parseFloat(rubrica.valorViagens).toFixed(2)}` : 'R$ 0.00'}</td>
                <td><strong>{rubrica.valorTotalRubrica ? `R$ ${parseFloat(rubrica.valorTotalRubrica).toFixed(2)}` : 'R$ 0.00'}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        .rubricas-page {
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
        button, select {
          margin-top: 10px;
          margin-right: 5px;
          padding: 8px 12px;
          cursor: pointer;
        }
        select {
            min-width: 250px;
        }
        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default RubricasPage;

