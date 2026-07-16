import axios from "axios";

const api = axios.create({
    baseURL: "https://finance-tracker-production-ba0e.up.railway.app/api"
});

export default api;