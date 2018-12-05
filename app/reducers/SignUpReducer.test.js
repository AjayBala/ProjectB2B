import { expect } from 'chai';
import Cookies from 'js-cookie';
import SignUpReducer from './SignUpReducer';
import * as types from '../actionTypes/SignUpActionTypes';

describe('SignUpReducer', () => {
    const payload = {
        emailId: 'professional@overstock.com',
        password: 'Overstock18',
    };
    // const error = 'User already exits';
    it('Should be called SIGN_UP_REQUEST', () => {
        expect(
            SignUpReducer(undefined, {
                type: types.SIGN_UP_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called SIGN_UP_SUCCESS', () => {
        expect(
            SignUpReducer([], {
                type: types.SIGN_UP_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called SIGN_UP_ERROR', () => {
        expect(
            SignUpReducer(undefined, {
                type: types.SIGN_UP_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called GET_SIGN_UP_DETAILS', () => {
        Cookies.set('signUserDetails', { emailId: 'Overstock@gmail.com', password: 'Ovetstock18' });
        expect(
            SignUpReducer(undefined, {
                type: types.GET_SIGN_UP_DETAILS,
                payload: {},
            }),
        ).to.deep.equal({ undefined });
        Cookies.remove('signUserDetails');
    });

    it('Should be called GET_SIGN_UP_DETAILS', () => {
        Cookies.remove('signUserDetails');
        expect(
            SignUpReducer(undefined, {
                type: types.GET_SIGN_UP_DETAILS,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            SignUpReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
