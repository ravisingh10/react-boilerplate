import axios from './axios';

class UserService {
    async register(userDetails) {
        let res = await axios.post('/user', userDetails);
        return res.data;
    }

    async login(username, password) {
        let res = await axios.post('/user/login', {
            username, password
        });
        return res.data;
    }

    async checkSession() {
        let res = await axios.get('/user/session');
        return res.data;
    }

    async logout() {
        let res = await axios.post('/user/logout');
        return res.data;
    }
}

export default new UserService();