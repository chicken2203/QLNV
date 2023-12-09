import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setUserData } from '../redux/UserActions';
import jwtAuthService from '../services/jwtAuthService';
import history from 'history.js';
import ConstantList from '../appConfig';
import LocalStorageService from 'app/services/LocalStorageService';
class Auth extends Component {
    state = {};

    constructor(props) {
        super(props);
        let user = LocalStorageService.getItem('auth_user');
        let token = LocalStorageService.getItem('jwt_token');
        let expire_time = LocalStorageService.getItem('token_expire_time');
        let dateObj = new Date(expire_time);
        if (token) {
            jwtAuthService.setSession(token);
        }
        let isExpired = false;
        if (dateObj != null) {
            if (dateObj < Date.now()) {
                isExpired = true;
            }
        }
        if (user != null && isExpired === false) {
            this.props.setUserData(user);
        } else {
            history.push(ConstantList.LOGIN_PAGE);
        }
    }

    render() {
        const { children } = this.props;
        return <Fragment>{children}</Fragment>;
    }
}

const mapStateToProps = (state) => ({
    setUserData: PropTypes.func.isRequired,
    login: state.login,
});

export default connect(mapStateToProps, { setUserData })(Auth);
