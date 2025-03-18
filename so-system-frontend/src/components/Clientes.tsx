import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaTrash, FaMotorcycle } from 'react-icons/fa'; // ícones para a busca, adicionar e remover
import CreateCustomer from './CreateCustomer'; // Importando o componente CreateCustomer
import ClienteDetalhes from './ClienteDetalhes'; // Importando o componente ClienteDetalhes

const Clientes = () => {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);
  const [expandedClientId, setExpandedClientId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false); // Controla exibição do formulário
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null); // Controla o cliente selecionado

  useEffect(() => {
    // Fazendo a requisição à API para buscar os clientes
    fetch('http://localhost:8080/customer/show')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Erro ao buscar clientes:', error));
  }, []);

  const filteredClients = clients.filter(client => 
    client.customerName.toLowerCase().includes(search.toLowerCase()) || 
    client.customerEmail.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (clientId: number) => {
    setExpandedClientId(expandedClientId === clientId ? null : clientId);
  };

  // Função para redirecionar para a página de detalhes do cliente
  const handleViewDetails = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 relative overflow-hidden">
      {selectedClientId ? (
        <ClienteDetalhes clientId={selectedClientId} onClose={() => setSelectedClientId(null)} />
      ) : (
        <>
          {/* Título da página */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#FF6A00]">Clientes</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-200 text-green-800 p-2 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" />
              Adicionar Cliente
            </button>
          </div>

          {/* Barra de pesquisa */}
          <div className="mb-6 flex items-center border-b-2 border-[#FF6A00]">
            <FaSearch className="text-[#FF6A00] mr-2" />
            <input 
              type="text" 
              placeholder="Pesquisar Cliente..." 
              className="outline-none w-full p-2" 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Lista de Clientes */}
          <div className="overflow-y-auto flex-1">
            {filteredClients.map(client => (
              <div key={client.customerId} className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200 w-full">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(client.customerId)}>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-800">{client.customerName}</h3>
                    <FaMotorcycle className="text-gray-500" />
                    <span className="text-gray-500">{client.motorcycles.length}</span>
                  </div>
                  <span className="text-gray-600 text-sm">ID: {client.customerId}</span>
                </div>
                {expandedClientId === client.customerId && (
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-600 text-sm">Telefone: {client.customerTel}</p>
                    <p className="text-gray-600 text-sm">
                      ✉️ <span className="font-medium">{client.customerEmail}</span>
                    </p>
                    <div className="flex flex-col items-end space-y-2 mt-2">
                      <button 
                        className="px-3 py-1 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300 transition"
                        onClick={() => handleViewDetails(client.customerId)} // Chama a função de navegação
                      >
                        Selecionar
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-200 text-red-700 rounded-md hover:bg-red-300 transition flex items-center"
                        onClick={() => alert(`Removendo cliente ${client.customerName}`)}
                      >
                        <FaTrash className="mr-1" />
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Modal para criar cliente */}
          {showForm && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-20">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
                <CreateCustomer onClose={() => setShowForm(false)} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Clientes;