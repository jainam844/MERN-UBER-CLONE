import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const CaptainSignup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        color: '',
        plate: '',
        capacity: '',
        vehicleType: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const payload = {
            fullname: {
                firstname: formData.firstname,
                lastname: formData.lastname,
            },
            email: formData.email,
            password: formData.password,
            vehicle: {
                color: formData.color,
                plate: formData.plate,
                capacity: parseInt(formData.capacity, 10),
                vehicleType: formData.vehicleType,
            },
        };
        console.log('Form Payload:', payload);

        // try {
        //     const response = await axios.post('/api/captain/register', payload); // update with actual endpoint
        //     console.log('Signup successful:', response.data);
        //     alert('Captain registered successfully!');
        //     navigate('/login'); // or redirect elsewhere
        // } catch (error) {
        //     console.error('Error registering captain:', error);
        //     alert(error.response?.data?.message || 'Something went wrong');
        // }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Captain Signup</h2>
                <form onSubmit={handleSubmit}>

                    <div className="flex space-x-4">
                        <input
                            name="firstname"
                            type="text"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                            placeholder="First Name"
                            className="w-1/2 bg-gray-100 border px-3 py-2 rounded"
                        />
                        <input
                            name="lastname"
                            type="text"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                            placeholder="Last Name"
                            className="w-1/2 bg-gray-100 border px-3 py-2 rounded"
                        />
                    </div>

                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className="w-full bg-gray-100 border px-3 py-2 rounded mt-4"
                    />

                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                        className="w-full bg-gray-100 border px-3 py-2 rounded mt-4"
                    />

                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm Password"
                        className="w-full bg-gray-100 border px-3 py-2 rounded mt-4"
                    />
                    <h3 className="mt-6 mb-2 font-semibold text-gray-700">Vehicle Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            name="color"
                            type="text"
                            value={formData.color}
                            onChange={handleChange}
                            required
                            placeholder="Vehicle Color"
                            className="bg-gray-100 border px-3 py-2 rounded"
                        />

                        <input
                            name="plate"
                            type="text"
                            value={formData.plate}
                            onChange={handleChange}
                            required
                            placeholder="Plate Number"
                            className="bg-gray-100 border px-3 py-2 rounded"
                        />

                        <input
                            name="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                            placeholder="Seating Capacity"
                            className="bg-gray-100 border px-3 py-2 rounded"
                        />

                        <input
                            name="vehicleType"
                            type="text"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            required
                            placeholder="Vehicle Type (Car, Bike)"
                            className="bg-gray-100 border px-3 py-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                        Register as Captain
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already registered?{' '}
                    <Link to="/login" className="text-green-600 font-medium hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
