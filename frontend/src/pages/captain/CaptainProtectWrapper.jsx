import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../../context/CaptainDataContext';
import apiRoutes from '../../services/apiRoutes';

const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { setCaptain } = useContext(CaptainDataContext);

    useEffect(() => {
        const validateCaptain = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/captain-login');
                return;
            }

            try {
                const response = await axios.get(apiRoutes.validateCaptainProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setCaptain(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        };

        validateCaptain();
    }, [navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
