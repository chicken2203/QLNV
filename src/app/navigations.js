import ConstantList from './appConfig';
export const navigations = [
    {
        name: 'Dashboard.dashboard',
        icon: 'dashboard',
        path: ConstantList.ROOT_PATH + 'dashboard/analytics',
        isVisible: true,
    },

    {
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
    {
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
