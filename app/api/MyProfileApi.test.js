import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import { uploadProfileImage, getProfile, getUserProfile, deleteUserAccount, updateUserProfile, getProfileImg } from './MyProfileApi';
import { OverstockRestConfig } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

describe('MyProfile api', () => {
    const context1 = {
        hostname: `${OverstockRestConfig.ApiConfig()}`,
        isBrowser: true,
        isSecure: true,
    };

    beforeEach(() => {
        RestClient.setContext(context1);
    });

    afterEach(() => {
        nock.cleanAll();
    });

      it('Professional getProfile API ', () => {
        const action = {
            payload: { },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.GET_COMPANY_PROFILE}${action.payload.id}`, action
        .payload).reply(200, {});
            getProfile(action).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional getUserProfile API ', () => {
        const action = {
            payload: { },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.GET_USER_PROFILE}${action.payload.id}`, action
            .payload).reply(200, {});

            getUserProfile(action).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional deleteUserAccount API ', () => {
        const action = {
            payload: { },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.B2B_CUSTOMER}${action.payload.id}`, action
            .payload).reply(200, {});

            deleteUserAccount(action).then(response => {
            expect(response).deep.equals({});
        });
    });
    it('Professional updateUserProfile API ', () => {
        const action = {
            payload: { },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.UPDATE_MY_PROFILE}${action.payload.id}`, action
            .payload).reply(200, {});

            updateUserProfile(action).then(response => {
            expect(response).deep.equals({});
        });
    });
    it('Professional getProfileImg API ', () => {
        const action = {
            payload: { },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.UPDATE_MY_PROFILE}${action.payload.id}`, action
            .payload).reply(200, {});

            getProfileImg(action).then(response => {
            expect(response).deep.equals({});
        });
    });
    it('Professional uploadProfileImage API ', () => {
        const action = {
            payload: { },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.UPDATE_MY_PROFILE}${action.payload.id}`, action
            .payload).reply(200, {});

            uploadProfileImage(action).then(response => {
            expect(response).deep.equals({});
        });
    });
    it('SignUp Cases', () => {
        RestClient.setContext(context1);
    });
});
