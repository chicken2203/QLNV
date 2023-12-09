import axios from 'axios';
import ConstantList from 'app/appConfig';
const API_PATH_USER = ConstantList.API_ENPOINT + '/api/users/getCurrentUser';

export const getCurrentUser = () => {
    let url = API_PATH_USER;
    return axios.get(url);
};
