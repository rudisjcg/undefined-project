import axios from "axios";
import Cookie from "js-cookie";

const AxiosInstance = axios.create();


AxiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = Cookie.get("_auth");
        console.log(token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
);

export default AxiosInstance;
