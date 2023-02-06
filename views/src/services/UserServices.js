import axios from 'axios';

export async function postLogin(data) {
    try {
        const response = await axios.post('/api/login', data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}