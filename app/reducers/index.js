import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';
import SignInReducer from './SignInReducer';
import SignUpReducer from './SignUpReducer';
import GovtReducer from './GovtReducer';
import ProfessionalReducer from './ProfessionalReducer';
import MyProfileReducer from './MyProfileReducer';
import AccountManagementReducer from './AccountManagementReducer';
import UsermanagementReducer from './UserManagementReducer';
import GroupManagementReducer from './GroupManagementReducer';

const allReducers = combineReducers({
    signIn: SignInReducer,
    signUp: SignUpReducer,
    govt: GovtReducer,
    professional: ProfessionalReducer,
    myProfile: MyProfileReducer,
    form: forms,
    accountManagement: AccountManagementReducer,
    userManagement: UsermanagementReducer,
    groupManagement: GroupManagementReducer
});
export default allReducers;
