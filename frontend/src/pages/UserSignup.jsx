import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            username: {
                firstName: formData.firstName,
                lastName: formData.lastName,
            },
            email: formData.email,
            password: formData.password,
        };
        console.log('Form Payload:', payload);
        // Clear form (optional)
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        // Add your signup logic here (API call, etc.)
    };

    return (
        <div
            className="h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <img
                        className="w-20 mx-auto mb-4"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                        alt="Uber Logo"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
                    <p className="text-gray-600">Sign up to start your journey</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-2">First Name</label>
                            <input
                                required
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-lg placeholder-gray-500"
                                type="text"
                                placeholder="First name"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                            <input
                                required
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-lg placeholder-gray-500"
                                type="text"
                                placeholder="Last name"
                            />
                        </div>
                    </div>

                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-100 mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder-gray-500"
                        type="email"
                        placeholder="email@example.com"
                    />

                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-100 mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder-gray-500"
                        type="password"
                        placeholder="Enter your password"
                    />

                    <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                    <input
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-gray-100 mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder-gray-500"
                        type="password"
                        placeholder="Confirm your password"
                    />

                    <button
                        className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-lg hover:bg-gray-800 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 font-medium hover:underline">
                        Login here
                    </Link>
                </p>

                <p className="text-center text-xs text-gray-400 mt-6 leading-snug px-4">
                    This site is protected by reCAPTCHA and the{' '}
                    <span className="underline">Google Privacy Policy</span> and{' '}
                    <span className="underline">Terms of Service</span> apply.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;