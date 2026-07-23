import axios from 'axios';

const backendApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";

const signupApi = `${backendApiUrl}signup`;
const loginApi = `${backendApiUrl}login`;
const expenseApi = `${backendApiUrl}expense`;

function authAxios(token) {
    const instance = axios.create({
        baseURL: backendApiUrl,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return instance;
}

export { signupApi, loginApi, expenseApi, authAxios };