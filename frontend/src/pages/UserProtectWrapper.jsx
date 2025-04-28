import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]); // dependency array includes token and navigate

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectWrapper;
