import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, ButtonBase } from '@material-ui/core';
import EgretVerticalNavExpansionPanel from './EgretVerticalNavExpansionPanel';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from 'react-i18next';
import ConstantList from '../../../app/appConfig.js';

const ViewEgretVerticalNavExpansionPanel = withTranslation()(EgretVerticalNavExpansionPanel);

const styles = () => ({
    expandIcon: {
        transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(90deg)',
    },
    collapseIcon: {
        transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        transform: 'rotate(0deg)',
    },
});

const EgretVerticalNav = ({ navigation, t }) => {
    const renderLevels = (data) => {
        return data.map((item) => {
            if (item.path && item.path.length > 0 && !item.path.startsWith(ConstantList.ROOT_PATH)) {
                item.path = ConstantList.ROOT_PATH + item.path;
            }
            let visible = item.isVisible;
            if (item.children && item.children.length > 0) {
                return (
                    <ViewEgretVerticalNavExpansionPanel item={item} key={item.name}>
                        {renderLevels(item.children)}
                    </ViewEgretVerticalNavExpansionPanel>
                );
            } else if (visible) {
                if (item.path == null) {
                    item.path = '';
                }
                return (
                    <NavLink key={item.name} to={item.path} className="nav-item">
                        <ButtonBase name="child" className="w-100">
                            {item.icon ? (
                                <Icon className="item-icon text-middle">{item.icon}</Icon>
                            ) : (
                                <span className="item-icon icon-text">{item.iconText}</span>
                            )}
                            <span className="text-middle pl-20 item-text">{t(item.name)}</span>
                            <div className="mx-auto"></div>
                            {item.badge && <div className={`badge bg-${item.badge.color}`}>{item.badge.value}</div>}
                        </ButtonBase>
                    </NavLink>
                );
            }
            return null;
        });
    };

    return <div className="navigation">{renderLevels(navigation)}</div>;
};

export default withStyles(styles)(withTranslation()(EgretVerticalNav));
