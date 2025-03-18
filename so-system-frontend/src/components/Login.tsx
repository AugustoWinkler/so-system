import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook do react-router-dom para navegação

  const handleLogin = () => {
    // Aqui você pode adicionar lógica de autenticação, mas por enquanto, só redirecionamos
    navigate('/dashboard'); // Redireciona para o Dashboard
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#222222]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#FF6A00]">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-[#222222]">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-1 border border-[#FF6A00] rounded-md"
            placeholder="Digite seu nome de usuário"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-[#222222]">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-[#FF6A00] rounded-md"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[#FF6A00] text-white py-2 rounded-md hover:bg-[#FF4500]"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
