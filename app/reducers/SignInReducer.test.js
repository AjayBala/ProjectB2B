import { expect } from 'chai';
import SignInReducer from './SignInReducer';
import * as types from '../actionTypes/SigninActionTypes';

describe('SignInReducer', () => {
    const payload = {
        emailId: 'professional@overstock.com',
        password: 'Overstock18',
    };
    // const error = 'User already exits';
    it('Should be called SIGN_IN_REQUEST', () => {
        expect(
            SignInReducer(undefined, {
                type: types.SIGN_IN_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called SIGN_IN_SUCCESS', () => {
        expect(
            SignInReducer([], {
                type: types.SIGN_IN_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_EMAILID', () => {
        expect(
            SignInReducer(undefined, {
                type: types.GET_EMAILID_TYPE,
                payload: payload.emailId,
            }),
        ).to.deep.equal({ emailId: payload.emailId });
    });

    it('Should be called SIGN_IN_ERROR', () => {
        expect(
            SignInReducer(undefined, {
                type: types.SIGN_IN_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            SignInReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
