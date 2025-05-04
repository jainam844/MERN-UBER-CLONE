const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiRoutes = {
    registerUser: `${baseUrl}/users/register`,
    loginUser: `${baseUrl}/users/login`,
    getUser: `${baseUrl}/users/profile`,
    logOut: `${baseUrl}/users/logout`,
    registerCaptain: `${baseUrl}/captains/register`,
    loginCaptain: `${baseUrl}/captains/login`,
    validateCaptainProfile: `${baseUrl}/captains/profile`,
    validateUserProfile: `${baseUrl}/users/profile`,
    captainLogout: `${baseUrl}/captains/logout`,
    getMapSuggestions: `${baseUrl}/maps/get-suggestions`,
    getRide: `${baseUrl}/rides/get-fare`,
    createRide: `${baseUrl}/rides/create`,
};

export default apiRoutes;
