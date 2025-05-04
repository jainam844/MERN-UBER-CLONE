import React, { useState } from 'react';
import { UserDataContext } from './UserDataContext';

const UserContext = ({ children }) => {
    const [ user, setUser ] = useState({
        email: '',
        useContext: {
            firstName: '',
            lastName: ''
        }
    })

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext;
