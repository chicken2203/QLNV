import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import 'app/assets/TabPanel.scss';

function TabPanel(props) {
    const { children, value, index, tabClassName, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0} className={`${tabClassName}`}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export function a11yProps(index, type) {
    return {
        id: `${type}-tab-${index}`,
        'aria-controls': `${type}-tabpanel-${index}`,
    };
}

export default TabPanel;
