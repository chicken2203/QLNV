import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import LayoutReducer from './Layout';
import employeeReducer from 'app/views/Employee/store/employeeSlice';
import certificateReducer from 'app/views/Employee/store/certificateSlice';
import relationsReducer from 'app/views/Employee/store/relationShipSlice';
import experienceReducer from 'app/views/Employee/store/experienceSlice';
import leadersReducer from 'app/views/Employee/store/leaderSlice';
import promotionReducer from 'app/views/PendingRequest/store/promotionSlice';
import proposalReducer from 'app/views/PendingRequest/store/proposalSlice';
import salarieReducer from 'app/views/PendingRequest/store/salarySlice';

const RootReducer = {
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    employees: employeeReducer,
    certificates: certificateReducer,
    relations: relationsReducer,
    experiences: experienceReducer,
    leaders: leadersReducer,
    promotions: promotionReducer,
    proposals: proposalReducer,
    salaries: salarieReducer,
};

export default RootReducer;
