import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../context/UserDataContext';
import apiRoutes from '../../services/apiRoutes';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext)
    const [loading, setIsLoading] = useState(true)


    useEffect(() => {
        const validateUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get(apiRoutes.validateUserProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setUser(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        validateUser();
    }, [navigate, setUser]);

    return (
        <>
            {loading ? <div>Loading...</div> : children}
        </>
    );
};

export default UserProtectWrapper;
