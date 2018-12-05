import { expect } from 'chai';
import * as SignInActionTypes from '../actionTypes/SigninActionTypes';
import * as actions from './SigninAction';

describe('SignIn Actions', () => {
    describe('SignIn Action Form', () => {
        let signInAction = null;
        it('returns correct action type get note', () => {
            signInAction = actions.signInRequest();
            expect(signInAction.type).to.equal(SignInActionTypes.SIGN_IN_REQUEST);
        });
        it('returns correct action type get note', () => {
            signInAction = actions.getEmailId();
            expect(signInAction.type).to.equal(SignInActionTypes.GET_EMAILID_TYPE);
        });
        it('returns correct action type get note', () => {
            signInAction = actions.sideMenuProps();
            expect(signInAction.type).to.equal(SignInActionTypes.SET_SIDEMENUSTATE);
        });
    });
});
