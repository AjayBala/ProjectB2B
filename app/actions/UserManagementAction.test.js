import { expect } from 'chai';
import * as UserManagementActionTypes from '../actionTypes/UserManagementActionTypes';
import * as actions from './UserManagementAction';

describe('UserManagement Actions', () => {
    describe('UserManagement Action Form', () => {
        let userManagementDeleteUserRequest = null;
        it('returns correct action type get note', () => {
            userManagementDeleteUserRequest = actions.userManagementDeleteUserRequest();
            expect(userManagementDeleteUserRequest.type).to.equal(UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_REQUEST);
        });
    });
    describe('UserManagement Action Form', () => {
        let userManagementDeleteUserSuccess = null;
        it('returns correct action type get note', () => {
            userManagementDeleteUserSuccess = actions.userManagementDeleteUserSuccess();
            expect(userManagementDeleteUserSuccess.type).to.equal(UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_SUCCESS);
        });
    });
    describe('UserManagement Action Form', () => {
        let userManagementDeleteUserError = null;
        it('returns correct action type get note', () => {
            userManagementDeleteUserError = actions.userManagementDeleteUserError();
            expect(userManagementDeleteUserError.type).to.equal(UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_ERROR);
        });
    });
});
