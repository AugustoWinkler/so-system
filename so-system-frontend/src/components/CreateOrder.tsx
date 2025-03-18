import React, { useState } from 'react';

const CreateOrder = ({ motorcycleId, onClose }: { motorcycleId: number, onClose: () => void }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      description,
    };

    try {
      const response = await fetch(`http://localhost:8080/create/${motorcycleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log('Ordem de serviço criada com sucesso:', orderData);
        onClose(); // Fecha o formulário após adicionar a ordem de serviço
      } else {
        console.error('Erro ao criar ordem de serviço:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Adicionar
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;