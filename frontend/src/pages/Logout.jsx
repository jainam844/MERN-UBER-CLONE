import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiRoutes from '../services/apiRoutes';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // ✨ Remove empty {} here!!
                const response = await axios.get(apiRoutes.logOut, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Logout failed:', error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>Logging out...</div>
    );
};

export default Logout;
