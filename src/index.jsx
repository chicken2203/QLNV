import 'babel-polyfill';
import './_index.scss';
import './i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import UserService from './app/services/UserService';
import ConstantList from './app/appConfig';
import HttpService from 'app/services/HttpService';

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));

if (ConstantList.AUTH_MODE === 'Keycloak') {
    UserService.initKeycloak(renderApp);
} else {
    renderApp();
}
HttpService.configure();
