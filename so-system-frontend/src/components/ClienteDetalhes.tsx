import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaArrowLeft, FaClipboardList } from 'react-icons/fa';
import CreateMotorcycle from './CreateMotorcycle'; // Importando o componente CreateMotorcycle
import MotorcycleDetails from './MotorcycleDetails'; // Importando o componente MotorcycleDetails

const ClienteDetalhes = ({ clientId, onClose }: { clientId: number, onClose: () => void }) => {
  const [client, setClient] = useState<any>(null);
  const [showForm, setShowForm] = useState(false); // Controla exibição do formulário
  const [expandedMotoId, setExpandedMotoId] = useState<number | null>(null); // Controla a expansão das motocicletas
  const [selectedMotoId, setSelectedMotoId] = useState<number | null>(null); // Controla a motocicleta selecionada

  useEffect(() => {
    // Fazendo a requisição à API para buscar os detalhes do cliente
    fetch(`http://localhost:8080/customer/customer/${clientId}`)
      .then(response => response.json())
      .then(data => setClient(data))
      .catch(error => console.error('Erro ao buscar detalhes do cliente:', error));
  }, [clientId]);

  if (!client) return <div>Carregando...</div>;

  const toggleExpand = (motoId: number) => {
    setExpandedMotoId(expandedMotoId === motoId ? null : motoId);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 relative overflow-hidden">
      {selectedMotoId ? (
        <MotorcycleDetails motorcycleId={selectedMotoId} customer={client} onClose={() => setSelectedMotoId(null)} />
      ) : (
        <>
          <button
            onClick={onClose}
            className="mb-4 bg-gray-200 text-gray-800 p-2 rounded-lg flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-[#FF6A00]">{client.customerName}</h1>
          <div className="mt-6 p-4 bg-[#FF6A00] text-white rounded-lg">
            <p>Email: {client.customerEmail}</p>
            <p>Telefone: {client.customerTel}</p>
            <p>CPF: {client.customerCpf}</p>
            <p>RG: {client.customerRg}</p>
          </div>
          <div className="mt-6 flex-1 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800">Motocicletas</h2>
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 mb-4 bg-green-200 text-green-800 p-2 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" />
              Adicionar Motocicleta
            </button>
            <div className="space-y-4">
              {client.motorcycles.map((moto: any) => (
                <div key={moto.id} className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200 w-full">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(moto.id)}>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-800">{moto.model || 'Modelo não informado'}</h3>
                      <FaClipboardList className="text-gray-600" />
                      <span className="text-gray-600 text-sm">OS: {moto.os_history.length}</span>
                    </div>
                    <span className="text-gray-600 text-sm">ID: {moto.id}</span>
                  </div>
                  {expandedMotoId === moto.id && (
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-600 text-sm">Placa: {moto.plate || 'Placa não informada'}</p>
                      <p className="text-gray-600 text-sm">Ano: {moto.year}</p>
                      <p className="text-gray-600 text-sm">KM: {moto.km}</p>
                      <p className="text-gray-600 text-sm">VIN: {moto.vin}</p>
                      <div className="flex flex-col items-end space-y-2 mt-2">
                        <button 
                          className="px-3 py-1 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300 transition"
                          onClick={() => setSelectedMotoId(moto.id)}
                        >
                          Selecionar
                        </button>
                        <button 
                          className="px-3 py-1 bg-red-200 text-red-700 rounded-md hover:bg-red-300 transition flex items-center"
                          onClick={() => alert(`Removendo motocicleta ${moto.model || 'Modelo não informado'}`)}
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
          </div>

          {/* Modal para criar motocicleta */}
          {showForm && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-20">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
                <CreateMotorcycle customerId={clientId} onClose={() => setShowForm(false)} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClienteDetalhes;