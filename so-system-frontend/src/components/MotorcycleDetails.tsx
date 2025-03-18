import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';
import CreateOrder from './CreateOrder'; // Importando o componente CreateOrder

const MotorcycleDetails = ({ motorcycleId, customer, onClose }: { motorcycleId: number, customer: any, onClose: () => void }) => {
  const [motorcycle, setMotorcycle] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false); // Controla exibição do formulário de ordem de serviço

  useEffect(() => {
    // Fazendo a requisição à API para buscar os detalhes da motocicleta
    fetch(`http://localhost:8080/motorcycle/show/${motorcycleId}`)
      .then(response => response.json())
      .then(data => setMotorcycle(data))
      .catch(error => console.error('Erro ao buscar detalhes da motocicleta:', error));

    // Fazendo a requisição à API para buscar as ordens de serviço da motocicleta
    fetch(`http://localhost:8080/motorcycle/showos/${motorcycleId}`)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Erro ao buscar ordens de serviço:', error));
  }, [motorcycleId]);

  const handleOrderCreated = () => {
    // Atualiza a lista de ordens de serviço após criar uma nova ordem
    fetch(`http://localhost:8080/motorcycle/showos/${motorcycleId}`)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Erro ao buscar ordens de serviço:', error));
    setShowOrderForm(false);
  };

  if (!motorcycle) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen flex flex-col p-6 relative overflow-hidden">
      <button
        onClick={onClose}
        className="mb-4 bg-gray-200 text-gray-800 p-2 rounded-lg flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Voltar
      </button>
      <h1 className="text-3xl font-bold text-[#FF6A00]">Detalhes da Motocicleta</h1>
      <div className="mt-6 p-4 bg-[#FF6A00] text-white rounded-lg">
        <h2 className="text-2xl font-semibold">Informações do Cliente</h2>
        <p>Nome: {customer.customerName}</p>
        <p>Telefone: {customer.customerTel}</p>
        <p>Email: {customer.customerEmail}</p>
        <p>CPF: {customer.customerCpf}</p>
        <p>RG: {customer.customerRg}</p>
      </div>
      <div className="mt-6 p-4 bg-[#FF6A00] text-white rounded-lg">
        <h2 className="text-2xl font-semibold">Informações da Motocicleta</h2>
        <p>VIN: {motorcycle.vin}</p>
        <p>Marca: {motorcycle.mark}</p>
        <p>Modelo: {motorcycle.model}</p>
        <p>Placa: {motorcycle.plate}</p>
        <p>Ano: {motorcycle.year}</p>
        <p>KM: {motorcycle.km}</p>
      </div>
      <div className="mt-6 flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800">Ordens de Serviço</h2>
        <button
          onClick={() => setShowOrderForm(true)}
          className="mt-2 mb-4 bg-green-200 text-green-800 p-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" />
          Adicionar Ordem de Serviço
        </button>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200 w-full">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{order.description}</h3>
                  <p className="text-gray-600">{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="px-3 py-1 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300 transition"
                    onClick={() => alert(`Selecionando ordem de serviço ${order.description}`)}
                  >
                    Selecionar
                  </button>
                  <button 
                    className="px-3 py-1 bg-red-200 text-red-700 rounded-md hover:bg-red-300 transition flex items-center"
                    onClick={() => alert(`Removendo ordem de serviço ${order.description}`)}
                  >
                    <FaTrash className="mr-1" />
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para criar ordem de serviço */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <button
              onClick={() => setShowOrderForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <CreateOrder motorcycleId={motorcycleId} onClose={handleOrderCreated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MotorcycleDetails;