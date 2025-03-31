import axios from "axios";
require("dotnev").config();

const API_URL = `${process.env.API_HOST}:${process.env.API_PORT}`;

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {email, password});
    return response.data.token;
}

const signup = async(userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data.token;
}

module.exports = {login, signup};