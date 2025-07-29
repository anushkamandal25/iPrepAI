import axios from "axios";
import {BASE_URL} from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000, // Set timeout to 80 seconds
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//Request Interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                //Redirect to login page
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            } 
        } else if (error.code=== 'ECONNABORTED') {
            console.error("Request timed out. Please check your internet connection.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;