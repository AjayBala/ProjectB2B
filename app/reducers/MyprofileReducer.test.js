import { expect } from 'chai';
import MyProfileReducer from './MyProfileReducer';
import * as types from '../actionTypes/MyProfileActionTypes';

describe('MyProfileReducer', () => {
    const payload = {};
    it('Should be called GET_PROFILE_REQUEST', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.GET_PROFILE_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_PROFILE_SUCCESS', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.GET_PROFILE_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_PROFILE_ERROR', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.GET_PROFILE_ERROR,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called ACCOUNT_MANAGEMENT_GET_USER_ROLE_REQUEST', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.ACCOUNT_MANAGEMENT_GET_USER_ROLE_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called ACCOUNT_MANAGEMENT_GET_USER_ROLE_SUCCESS', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.ACCOUNT_MANAGEMENT_GET_USER_ROLE_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called ACCOUNT_MANAGEMENT_GET_USER_ROLE_ERROR', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.ACCOUNT_MANAGEMENT_GET_USER_ROLE_ERROR,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called MY_PROFILE_PROFILE_IMAGE_UPLOAD_REQUEST', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.MY_PROFILE_PROFILE_IMAGE_UPLOAD_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called MY_PROFILE_PROFILE_IMAGE_UPLOAD_SUCCESS', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.MY_PROFILE_PROFILE_IMAGE_UPLOAD_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called MY_PROFILE_PROFILE_IMAGE_UPLOAD_ERROR', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.MY_PROFILE_PROFILE_IMAGE_UPLOAD_ERROR,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_REQUEST', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });
    it('Should be called ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_SUCCESS', () => {
        expect(
            MyProfileReducer(undefined, {
                type: types.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('initialstate', () => {
        expect(
            MyProfileReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
