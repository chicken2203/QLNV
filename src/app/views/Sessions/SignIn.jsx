import React, { useState } from 'react';
import { Button, withStyles, CircularProgress } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { loginWithEmailAndPassword } from 'app/redux/LoginActions';
import 'app/assets/Button.scss';

const styles = () => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

function SignIn(props) {
    const { t, classes, loginWithEmailAndPassword, login } = props;
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        event.persist();
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        loginWithEmailAndPassword({ ...state });
    };

    const { email, password } = state;

    return (
        <div className="signup w-100 h-100vh ">
            <div className="signup-card h-100vh pt-48">
                <div container className="signup-content h-100">
                    <div className="text-center mb-8">
                        <h1 className="signup-header">Đăng nhập hệ thống</h1>
                    </div>
                    <div className="flex flex-wrap justify-center items-center mb-24">
                        <img className="singup-image" src="/assets/images/illustrations/breaking_barriers.svg" alt="" />
                    </div>
                    <div className="signup-form w-100">
                        <ValidatorForm onSubmit={handleFormSubmit}>
                            <TextValidator
                                className="mb-24 w-100"
                                variant="outlined"
                                label={t('username')}
                                onChange={handleChange}
                                type="text"
                                name="email"
                                value={email.trim()}
                                validators={['required']}
                                errorMessages={['Tên đăng nhập không được để trống']}
                            />
                            <TextValidator
                                className="mb-16 w-100"
                                label={t('password')}
                                variant="outlined"
                                onChange={handleChange}
                                name="password"
                                type="password"
                                value={password.trim()}
                                validators={['required']}
                                errorMessages={['Chưa nhập Password']}
                            />
                            <div className="flex flex-center mb-8">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={login.loading}
                                    type="submit"
                                >
                                    {t('sign_in.title')}
                                </Button>
                                {login.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>

                            <Button fullWidth variant="contained" className="btn-secondary">
                                {t('sign_up.title')}
                            </Button>
                        </ValidatorForm>
                    </div>
                </div>
            </div>
        </div>
    );
}

SignIn.propTypes = {
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    login: PropTypes.object,
};

const mapStateToProps = (state) => ({
    login: state.login,
});

export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn)),
);
