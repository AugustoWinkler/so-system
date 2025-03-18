import React, { useState } from 'react';

const CreateMotorcycle = ({ customerId, onClose }: { customerId: number, onClose: () => void }) => {
  const [vin, setVin] = useState('');
  const [mark, setMark] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [km, setKm] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const motorcycleData = {
      vin: vin,
      mark: mark,
      plate: plate,
      model: model,
      year: year,
      km: km,
    };

    try {
      const response = await fetch(`http://localhost:8080/motorcycle/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motorcycleData),
      });

      if (response.ok) {
        console.log('Motocicleta adicionada com sucesso:', motorcycleData);
        onClose(); // Fecha o formulário após adicionar a motocicleta
      } else {
        console.error('Erro ao adicionar motocicleta:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar motocicleta:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">VIN</label>
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Marca</label>
        <input
          type="text"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Modelo</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Placa</label>
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Ano</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">KM</label>
        <input
          type="number"
          value={km}
          onChange={(e) => setKm(Number(e.target.value))}
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

export default CreateMotorcycle;