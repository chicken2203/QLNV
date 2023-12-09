import axios from 'axios';
import LocalStorageService from './LocalStorageService';
import ConstantList from '../appConfig';
import UserService from '../services/UserService';
import MenuService from '../services/MenuService';
import history from 'history.js';
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic Y29yZV9jbGllbnQ6c2VjcmV0',
    },
};
class JwtAuthService {
    user = {
        userId: '1',
        role: 'ADMIN',
        displayName: 'Watson Joyce',
        email: 'watsonjoyce@gmail.com',
        photoURL: ConstantList.ROOT_PATH + 'assets/images/avatar.jpg',
        age: 25,
        token: 'faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh',
    };
    async getCurrentUser() {
        const user = LocalStorageService.getItem('auth_user');
        if (user) {
            return Promise.resolve(user);
        } else {
            let url = ConstantList.API_ENPOINT + '/api/users/getCurrentUser';
            const response = await axios.get(url);
            const currentUser = response.data;
            this.setLoginUser(currentUser);
            return currentUser;
        }
    }
    async loginWithUserNameAndPassword(username, password) {
        let requestBody = 'client_id=core_client&grant_type=password&client_secret=secret';
        requestBody = requestBody + '&username=' + username + '&password=' + password;

        await axios.post(ConstantList.API_ENPOINT + '/oauth/token', requestBody, config).then((response) => {
            let dateObj = new Date(Date.now() + response.data.expires_in * 1000);
            LocalStorageService.setItem('token_expire_time', dateObj);
            this.setSession(response.data.access_token);
        });

        const user = await this.getCurrentUser();

        await MenuService.getAllMenuItemByRoleList().then((res) => {
            LocalStorageService.setLocalStorageItem('navigations', res.data);
        });

        return user;
    }

    loginWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.user);
            }, 1000);
        }).then((data) => {
            this.setUser(data);
            this.setSession(data.token);
            return data;
        });
    };

    loginWithToken = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.user);
            }, 100);
        }).then((data) => {
            this.setSession(data.token);
            this.setUser(data);
            return data;
        });
    };

    async logout() {
        if (ConstantList.AUTH_MODE === 'Keycloak') {
            UserService.doLogout();
            this.setSession(null);
            this.removeUser();
            history.push(ConstantList.HOME_PAGE);
        } else {
            this.setSession(null);
            this.removeUser();
            history.push(ConstantList.LOGIN_PAGE);
        }
    }

    setSession(token) {
        if (token) {
            LocalStorageService.setItem('jwt_token', token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
            LocalStorageService.removeItem('jwt_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }
    async setLoginUser(user) {
        LocalStorageService.setItem('auth_user', user);
        return user;
    }
    getLoginUser = () => {
        return LocalStorageService.getItem('auth_user');
    };
    setUser = (user) => {
        LocalStorageService.setItem('auth_user', user);
    };
    removeUser = () => {
        LocalStorageService.removeItem('auth_user');
    };
}

export default new JwtAuthService();
