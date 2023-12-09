import { EgretLoadable } from 'egret';
import ConstantList from 'app/appConfig';
const EmployeeAdd = EgretLoadable({
    loader: () => import('./Employee/EmployeeTable'),
});
const EmployeeManagement = EgretLoadable({
    loader: () => import('./EmployeeManagement/EmployeeManagement'),
});
const EmployeeEnd = EgretLoadable({
    loader: () => import('./EmployeeEnd/EmployeeEndTable'),
});

const WaitingApproval = EgretLoadable({
    loader: () => import('./PendingRequest'),
});
const ConfirmApproval = EgretLoadable({
    loader: () => import('./ConfirmRequest/ConfirmRequestTable'),
});

const EmployeeRoutes = [
    {
        path: ConstantList.ROOT_PATH + 'employee-add',
        component: EmployeeAdd,
    },
    {
        path: ConstantList.ROOT_PATH + 'employee-management',
        component: EmployeeManagement,
    },
    {
        path: ConstantList.ROOT_PATH + 'employee-end',
        component: EmployeeEnd,
    },
    {
        path: ConstantList.ROOT_PATH + 'leader-confirm-approval',
        component: ConfirmApproval,
    },
    {
        path: ConstantList.ROOT_PATH + 'leader-wait-approval',
        component: WaitingApproval,
    },
];

export default EmployeeRoutes;
