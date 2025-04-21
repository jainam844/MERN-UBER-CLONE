// src/api/api.js (or wherever your structure is)

const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log('Base URL:', import.meta.env.VITE_API_BASE_URL);

const apiRoutes = {
    registerUser: `${baseUrl}/users/register`,
    loginUser: `${baseUrl}/users/login`,
    getUser: `${baseUrl}/users/profile`,

};

export default apiRoutes;
