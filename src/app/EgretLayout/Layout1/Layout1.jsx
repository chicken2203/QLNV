import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setLayoutSettings } from 'app/redux/LayoutActions';
import { withStyles } from '@material-ui/core';
import { isMdScreen, classList } from 'utils';
import { renderRoutes } from 'react-router-config';
import Layout1Topbar from './Layout1Topbar';
import Layout1Sidenav from './Layout1Sidenav';
import AppContext from 'app/appContext';
import { withTranslation } from 'react-i18next';

const ViewLayout1Sidenav = withTranslation()(Layout1Sidenav);
const ViewLayout1Topbar = withTranslation()(Layout1Topbar);
const styles = (theme) => {
    return {
        layout: {
            backgroundColor: theme.palette.background.default,
        },
    };
};

class Layout1 extends Component {
    componentWillMount() {
        if (isMdScreen()) {
            this.updateSidebarMode({ mode: 'close' });
        }
    }

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

    render() {
        let { settings, classes } = this.props;

        let { layout1Settings } = settings;

        let layoutClasses = {
            [classes.layout]: true,
            [`${settings.activeLayout} sidenav-${layout1Settings.leftSidebar.mode}`]: true,
            'topbar-fixed': layout1Settings.topbar.fixed,
        };
        return (
            <AppContext.Consumer>
                {({ routes }) => (
                    <div className={classList(layoutClasses)}>
                        {layout1Settings.leftSidebar.show && <ViewLayout1Sidenav />}

                        <div className="content-wrap position-relative">
                            {layout1Settings.topbar.show && layout1Settings.topbar.fixed && <ViewLayout1Topbar />}

                            {settings.perfectScrollbar && (
                                <div className="scrollable-content">
                                    {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && <Layout1Topbar />}
                                    <div className="content">{renderRoutes(routes)}</div>
                                    <div className="my-auto" />
                                </div>
                            )}

                            {!settings.perfectScrollbar && (
                                <div className="scrollable-content">
                                    {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && <Layout1Topbar />}
                                    <div className="content">{renderRoutes(routes)}</div>
                                    <div className="my-auto" />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

Layout1.propTypes = {
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    setLayoutSettings: PropTypes.func.isRequired,
    settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { setLayoutSettings })(Layout1));
