import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const submitHanldler = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setUserData({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1486976862325-fbac7b41739b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img
            className="w-20 mx-auto mb-4"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600">Login to continue</p>
        </div>

        <form onSubmit={submitHanldler}>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder-gray-500"
            type="email"
            placeholder="email@example.com"
          />

          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder-gray-500"
            type="password"
            placeholder="Enter your password"
          />

          <button
            className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          New here?{' '}
          <Link to="/signup" className="text-green-600 font-medium hover:underline">
            Create an Account
          </Link>
        </p>

        <div className="mt-6">
          <Link
            to="/captain-login"
            className="bg-green-600 flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg hover:bg-green-700 transition"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;