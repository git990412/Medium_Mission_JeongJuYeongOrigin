import axios from "axios";

const getInstance = axios.create({
    baseURL: 'http://localhost:8090/api/v1'
});

const postInstance = axios.create({
    baseURL: 'http://localhost:8090/api/v1',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
});