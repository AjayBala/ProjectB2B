import { expect } from 'chai';
import * as SignUpActionTypes from '../actionTypes/SignUpActionTypes';
import * as actions from './SignUpAction';

describe('SignUp Actions', () => {
    describe('getSignUpDetails', () => {
        let signUpRequest = null;
        it('gets the sign up details', () => {
            signUpRequest = actions.getSignUpDetails();
            expect(signUpRequest.type).to.equal(SignUpActionTypes.GET_SIGN_UP_DETAILS);
        });
    });
    describe('signUpRequest', () => {
        let signUpRequest = null;
        it('Sign Up request is initiated', () => {
            signUpRequest = actions.signUpRequest();
            expect(signUpRequest.type).to.equal(SignUpActionTypes.SIGN_UP_REQUEST);
        });
    });
});
