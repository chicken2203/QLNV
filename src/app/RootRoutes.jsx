import React from 'react';
import { Redirect } from 'react-router-dom';

import ConstantList from './appConfig';
import sessionRoutes from 'app/views/Sessions/SessionRoutes';
import dashboardRoutes from 'app/views/Dashboard/DashboardRoutes';
import EmployeeRoutes from 'app/views/EmployeeRoutes';

const errorRoute = [
    {
        component: () => <Redirect to={ConstantList.ROOT_PATH + 'session/404'} />,
    },
];

const routes = [...sessionRoutes, ...dashboardRoutes, ...EmployeeRoutes, ...errorRoute];

export default routes;
