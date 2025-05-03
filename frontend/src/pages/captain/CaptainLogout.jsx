import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRoutes from '../../services/apiRoutes';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate('/captain-login');
                return;
            }

            try {
                // ✨ Remove empty {} here!!
                const response = await axios.get(apiRoutes.captainLogout, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    localStorage.removeItem('token')
                    navigate('/captain-login')
                }
            } catch (error) {
                console.error('Logout failed:', error);
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        };

        logoutUser();
    }, [navigate]);
    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default CaptainLogout;   