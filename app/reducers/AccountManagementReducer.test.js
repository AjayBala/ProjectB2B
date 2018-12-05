import { expect } from 'chai';
import Cookies from 'js-cookie';
import AccountManagementReducer from './AccountManagementReducer';
import * as types from '../actionTypes/AccountManagementActionTypes';

describe('AccountManagementReducer', () => {
    const payload = {
        emailId: 'professional@overstock.com',
        password: 'Overstock18',
    };

    it('Should be called GET_COMPANY_PROFILE_REQUEST', () => {
        expect(
            AccountManagementReducer(undefined, {
                type: types.GET_COMPANY_PROFILE_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called COMPANY_PROFILE_SUCCESS', () => {
        expect(
            AccountManagementReducer([], {
                type: types.COMPANY_PROFILE_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called COMPANY_PROFILE_ERROR', () => {
        expect(
            AccountManagementReducer(undefined, {
                type: types.COMPANY_PROFILE_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called DEFAULT_COMPANY_PROFILE', () => {
        Cookies.set('signUserDetails', { emailId: 'Overstock@gmail.com', password: 'Ovetstock18' });
        expect(
            AccountManagementReducer(undefined, {
                type: types.DEFAULT_COMPANY_PROFILE,
                payload: {},
            }),
        ).to.deep.equal({ undefined });
        Cookies.get('signUserDetails');
    });

    it('Should be called DEFAULT_COMPANY_PROFILE', () => {
        Cookies.remove('signUserDetails');
        expect(
            AccountManagementReducer(undefined, {
                type: types.DEFAULT_COMPANY_PROFILE,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            AccountManagementReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
