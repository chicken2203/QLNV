import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppContext from 'app/appContext';
import ConstantList from '../appConfig';

const AuthGuard = ({ location, history, children }) => {
    const authenticated = true;
    const redirectRoute = () => {
        history.push({
            pathname: ConstantList.HOME_PAGE,
            state: { redirectUrl: location.pathname },
        });
    };

    return <Fragment>{authenticated ? <>{children}</> : redirectRoute()}</Fragment>;
};

AuthGuard.contextType = AppContext;

const mapStateToProps = (state) => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
