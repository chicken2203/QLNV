import React, { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { EgretVerticalNav } from 'egret';
import { setLayoutSettings } from 'app/redux/LayoutActions';
import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';
import LocalStorageService from '../../services/LocalStorageService';
import { ROLE } from 'app/Utils/Constants';
const ViewEgretVerticalNav = withTranslation()(EgretVerticalNav);
function Sidenav(props) {
    const user = useSelector((state) => state.user);
    const role = user?.roles?.[0]?.id !== ROLE.USER; /// BE : Luôn trả về 1 phần tử
    const updateSidebarMode = (sidebarSettings) => {
        let { settings, setLayoutSettings } = props;
        let activeLayoutSettingsName = settings.activeLayout + 'Settings';
        let activeLayoutSettings = settings[activeLayoutSettingsName];

        setLayoutSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        });
    };

    const renderOverlay = () => (
        <div onClick={() => updateSidebarMode({ mode: 'close' })} className="sidenav__overlay" />
    );
    const getNavigation = () => {
        let navigation = LocalStorageService.getLocalStorageItem('navigations');
        if (navigation && navigation.length > 0) {
            return navigation;
        } else {
            return [
                {
                    name: 'Dashboard.dashboard',
                    icon: 'dashboard',
                    path: ConstantList.ROOT_PATH + 'dashboard/analytics',
                    isVisible: true,
                },

                !role && {
                    name: 'Dashboard.employee.title',
                    icon: 'supervisor_account',
                    isVisible: true,
                    children: [
                        {
                            name: 'Dashboard.employee.employee-add',
                            path: ConstantList.ROOT_PATH + 'employee-add',
                            icon: 'donut_large',
                            isVisible: true,
                        },
                        {
                            name: 'Dashboard.employee.employee-management',
                            path: ConstantList.ROOT_PATH + 'employee-management',
                            icon: 'donut_large',
                            isVisible: true,
                        },
                        {
                            name: 'Dashboard.employee.employee-end',
                            isVisible: true,
                            path: ConstantList.ROOT_PATH + 'employee-end',
                            icon: 'donut_large',
                        },
                    ],
                },

                role && {
                    name: 'Dashboard.leader.title',
                    icon: 'business_center',
                    isVisible: true,
                    children: [
                        {
                            name: 'Dashboard.leader.wait-approval',
                            path: ConstantList.ROOT_PATH + 'leader-wait-approval',
                            icon: 'donut_large',
                            isVisible: true,
                        },
                        {
                            name: 'Dashboard.leader.confirm-approval',
                            path: ConstantList.ROOT_PATH + 'leader-confirm-approval',
                            icon: 'donut_large',
                            isVisible: true,
                        },
                    ],
                },
            ];
        }
    };
    return (
        <Fragment>
            <Scrollbar option={{ suppressScrollX: true }} className="scrollable position-relative">
                {props.children}
                <ViewEgretVerticalNav navigation={getNavigation()} />
            </Scrollbar>
            {renderOverlay()}
        </Fragment>
    );
}
Sidenav.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    setLayoutSettings: PropTypes.func.isRequired,
    settings: state.layout.settings,
});
export default withRouter(
    connect(mapStateToProps, {
        setLayoutSettings,
    })(Sidenav),
);
