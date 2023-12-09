import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Icon, withStyles, Tooltip, IconButton, MuiThemeProvider } from '@material-ui/core';

import { connect } from 'react-redux';
import { setLayoutSettings, setDefaultSettings } from 'app/redux/LayoutActions';
import { logoutUser } from 'app/redux/UserActions';
import { withRouter } from 'react-router-dom';
import Sidenav from '../SharedCompoents/Sidenav';
import Brand from '../SharedCompoents/Brand';
import SidenavTheme from '../EgretTheme/SidenavTheme';
import { isMdScreen } from 'utils';
import ConstantList from '../../appConfig';
import authService from '../../services/jwtAuthService';
const styles = (theme) => ({});

const IconButtonWhite = withStyles((theme) => ({
    root: {
        // color: theme.palette.getContrastText(purple[500]),
        backgroundColor: 'transparent',
        padding: '5px',
    },
}))(IconButton);

const IconSmall = withStyles(() => ({
    root: {
        fontSize: '1rem',
    },
}))(Icon);

class Layout1Sidenav extends Component {
    state = {
        sidenavToggleChecked: false,
        hidden: true,
    };

    componentWillMount() {
        // CLOSE SIDENAV ON ROUTE CHANGE ON MOBILE
        this.unlistenRouteChange = this.props.history.listen((location, action) => {
            if (isMdScreen()) {
                this.updateSidebarMode({ mode: 'close' });
            }
        });

        setTimeout(() => {
            this.setState({ hidden: false });
        }, 400);
    }

    componentWillUnmount() {
        this.unlistenRouteChange();
    }

    updateSidebarMode = (sidebarSettings) => {
        let { settings, setLayoutSettings, setDefaultSettings } = this.props;
        const updatedSettings = {
            ...settings,
            layout1Settings: {
                ...settings.layout1Settings,
                leftSidebar: {
                    ...settings.layout1Settings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        };
        setLayoutSettings(updatedSettings);
        setDefaultSettings(updatedSettings);
    };

    handleSidenavToggle = () => {
        let { sidenavToggleChecked } = this.state;
        let mode = sidenavToggleChecked ? 'full' : 'compact';
        this.updateSidebarMode({ mode });
        this.setState({ sidenavToggleChecked: !sidenavToggleChecked });
    };

    handleSignOut = () => {
        this.props.logoutUser();
    };

    renderLogoSwitch = () => (
        // Open Brand component file to replace logo and text
        <Brand>
            <Switch
                className="sidenav__toggle hide-on-mobile"
                onChange={this.handleSidenavToggle}
                checked={this.state.sidenavToggleChecked}
                color="secondary"
            />
        </Brand>
    );

    renderUser = () => {
        const { t } = this.props;
        let imagePath = ConstantList.ROOT_PATH + 'assets/images/avatar.jpg';

        let user = authService.getLoginUser();
        if (user != null && user.imagePath != null) {
            imagePath = ConstantList.API_ENPOINT + user.imagePath;
        }

        if (user != null && user.imagePath != null) {
            imagePath = ConstantList.API_ENPOINT + user.imagePath;
        }
        return (
            <div className="sidenav__user">
                <div className="username-photo">
                    <img src={imagePath} alt="user" />
                    <span className="username text-center">
                        {user ? user.username : ''}
                        <br />
                        {user ? user.username : ''}
                    </span>
                </div>
                <div className="user__menu">
                    <Tooltip title={t('Dashboard.logout')}>
                        <IconButtonWhite aria-label="Delete" className="" size="small" onClick={this.handleSignOut}>
                            <IconSmall>exit_to_app</IconSmall>
                        </IconButtonWhite>
                    </Tooltip>
                </div>
            </div>
        );
    };

    render() {
        let { theme, settings } = this.props;
        const sidenavTheme = settings.themes[settings.layout1Settings.leftSidebar.theme] || theme;

        return (
            <MuiThemeProvider theme={sidenavTheme}>
                <SidenavTheme theme={sidenavTheme} settings={settings} />

                <div className="sidenav">
                    <div className="sidenav__hold">
                        {!this.state.hidden && (
                            <Fragment>
                                {this.renderLogoSwitch()}
                                <Sidenav>{this.renderUser()}</Sidenav>
                            </Fragment>
                        )}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

Layout1Sidenav.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    setDefaultSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    setDefaultSettings: PropTypes.func.isRequired,
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: state.user,
    settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
    withRouter(
        connect(mapStateToProps, {
            setLayoutSettings,
            setDefaultSettings,
            logoutUser,
        })(Layout1Sidenav),
    ),
);
