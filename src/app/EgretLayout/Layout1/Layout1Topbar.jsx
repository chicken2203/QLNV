import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, IconButton, withStyles, MuiThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import { setLayoutSettings } from 'app/redux/LayoutActions';
import { logoutUser } from 'app/redux/UserActions';
import { PropTypes } from 'prop-types';
import { isMdScreen } from 'utils';
const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
});

class Layout1Topbar extends Component {
    state = {};

    updateSidebarMode = (sidebarSettings) => {
        let { settings, setLayoutSettings } = this.props;

        setLayoutSettings({
            ...settings,
            layout1Settings: {
                ...settings.layout1Settings,
                leftSidebar: {
                    ...settings.layout1Settings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        });
    };

    handleSidebarToggle = () => {
        let { settings } = this.props;
        let { layout1Settings } = settings;

        let mode;
        if (isMdScreen()) {
            mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
        } else {
            mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
        }
        this.updateSidebarMode({ mode });
    };

    render() {
        let { theme, settings } = this.props;

        const topbarTheme = settings.themes[settings.layout1Settings.topbar.theme] || theme;

        return (
            <MuiThemeProvider theme={topbarTheme}>
                <div className="topbar">
                    <div className={`topbar-hold`} style={{ backgroundColor: topbarTheme.palette.primary.main }}>
                        <div className="flex flex-space-between flex-middle h-100">
                            <div className="flex">
                                <IconButton onClick={this.handleSidebarToggle}>
                                    <Icon>menu</Icon>
                                </IconButton>
                                {/* <BreadCrumb /> */}
                                <div className="hide-on-mobile"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

Layout1Topbar.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)),
);
