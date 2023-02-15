import axios from 'axios';

export async function postSignup(data) {
    const response = await axios.post('/auth/signup', data, { validateStatus: false });
    return {status: response.status, res: response.data};
}

export async function verifyUser(confirmationCode) {
    const response = await axios.post('/auth/signup/confirm/' + confirmationCode, { validateStatus: false });
    return {status: response.status, res: response.data};
}

export async function postLogin(data) {
    const response = await axios.post('/auth/login', data, { validateStatus: false });
    return {status: response.status, res: response.data};
}

export async function tokenAuthentication() {
    const response = await axios.post('/auth/token', {}, { validateStatus: false });
    return {status: response.status, res: response.data};
}