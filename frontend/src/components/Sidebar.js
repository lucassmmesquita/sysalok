import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/projetos">Projetos</Link></li>
        <li><Link to="/alocacoes">Alocações</Link></li>
        <li><Link to="/perfis">Perfis Profissionais</Link></li>
        <li><Link to="/viagens">Viagens</Link></li>
        <li><Link to="/rubricas">Rubricas</Link></li>
        <li><Link to="/usuarios">Usuários</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

