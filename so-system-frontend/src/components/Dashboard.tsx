import React, { useState } from 'react';
import { FaHome, FaUsers, FaClipboardList, FaChartLine, FaWarehouse } from 'react-icons/fa'; // Importando ícones do FontAwesome
import Clientes from './Clientes'; // Importando o componente Clientes

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'clientes':
        return <Clientes />;
      case 'osAtivas':
        return <div>OS Ativas Content</div>;
      case 'relatorios':
        return <div>Relatórios Content</div>;
      case 'estoque':
        return <div>Estoque Content</div>;
      default:
        return (
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500">Visão geral do sistema</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Navegação Lateral (com bordas arredondadas apenas à direita) */}
      <div className="bg-[#222222] w-64 p-6 flex-shrink-0">
        <ul className="space-y-6">
          {/* Home */}
          <li
            className="text-white flex items-center space-x-4 border-b-2 border-transparent cursor-pointer"
            onClick={() => setActiveSection('home')}
          >
            <FaHome className="text-2xl text-[#FF6A00]" />
            <div>
              <p className="font-semibold">Home</p>
              <p className="text-sm">Visão geral do sistema</p>
            </div>
          </li>
          {/* Clientes */}
          <li
            className="text-white flex items-center space-x-4 border-b-2 border-transparent cursor-pointer"
            onClick={() => setActiveSection('clientes')}
          >
            <FaUsers className="text-2xl text-[#FF6A00]" />
            <div>
              <p className="font-semibold">Clientes</p>
              <p className="text-sm">Gerenciar clientes e motos</p>
            </div>
          </li>
          {/* OS Ativas */}
          <li
            className="text-white flex items-center space-x-4 border-b-2 border-transparent cursor-pointer"
            onClick={() => setActiveSection('osAtivas')}
          >
            <FaClipboardList className="text-2xl text-[#FF6A00]" />
            <div>
              <p className="font-semibold">OS Ativas</p>
              <p className="text-sm">Acompanhe ordens de serviço</p>
            </div>
          </li>
          {/* Relatórios */}
          <li
            className="text-white flex items-center space-x-4 border-b-2 border-transparent cursor-pointer"
            onClick={() => setActiveSection('relatorios')}
          >
            <FaChartLine className="text-2xl text-[#FF6A00]" />
            <div>
              <p className="font-semibold">Relatórios</p>
              <p className="text-sm">Análise de desempenho e métricas</p>
            </div>
          </li>
          {/* Estoque */}
          <li
            className="text-white flex items-center space-x-4 border-b-2 border-transparent cursor-pointer"
            onClick={() => setActiveSection('estoque')}
          >
            <FaWarehouse className="text-2xl text-[#FF6A00]" />
            <div>
              <p className="font-semibold">Estoque</p>
              <p className="text-sm">Gerenciar estoque de peças e acessórios</p>
            </div>
          </li>
        </ul>
      </div>
      {/* Conteúdo Principal */}
      <div className="flex-1 p-6 overflow-y-auto h-screen">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;