import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext';
import axios from 'axios';
import apiRoutes from '../services/apiRoutes';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)
 
    
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
                    setUser(response.data.user);
                    setIsLoading(false);
                }
            } catch (err) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        validateUser();
    }, [navigate, setUser]); // dependency array includes navigate and setUser

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectWrapper;
