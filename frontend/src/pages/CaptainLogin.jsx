import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Captain Email:', email);
        console.log('Captain Password:', password);
        setCaptainData({ email, password });
        setEmail('');
        setPassword('');
    };

    return (
        <div
            className="h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <img
                        className="w-20 mx-auto mb-4"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                        alt="Uber Logo"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">Captain Login</h2>
                    <p className="text-gray-600">Login to manage your rides</p>
                </div>

                <form onSubmit={submitHandler}>
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
                    Not a captain?{' '}
                    <Link to="/login" className="text-green-600 font-medium hover:underline">
                        Login as User
                    </Link>
                </p>

                <div className="mt-6">
                    <Link
                        to="/captain-signup"
                        className="bg-green-600 flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg hover:bg-green-700 transition"
                    >
                        Become a Captain
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaptainLogin;