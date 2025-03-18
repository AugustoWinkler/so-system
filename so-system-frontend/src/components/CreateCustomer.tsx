import React, { useState } from 'react';

const CreateCustomer = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
    setTel(formattedValue);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(formattedValue);
  };

  const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1})$/, '$1-$2');
    setRg(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const customerData = {
      customerName: name,
      customerTel: tel,
      email: email,
      cpf: cpf,
      rg: rg,
    };

    try {
      const response = await fetch('http://localhost:8080/customer/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        console.log('Cliente adicionado com sucesso:', customerData);
        onClose(); // Fecha o formulário após adicionar o cliente
      } else {
        console.error('Erro ao adicionar cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="text"
          value={tel}
          onChange={handleTelChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CPF</label>
        <input
          type="text"
          value={cpf}
          onChange={handleCpfChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">RG</label>
        <input
          type="text"
          value={rg}
          onChange={handleRgChange}
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

export default CreateCustomer;