import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import { getCategroysInBusiness, createCompanyInformation,
    createCardDetailsInfo,
    createShoppingPreferenceInformation,
    uploadFileCompanyInformation,
    getCustomerDataById } from './ProfessionalApi';
import * as ApiConstants from './ApiConstants';
import { OverstockRestConfig } from '../common/OverstockRestConfig';
import { PROFESSIONAL_BENEFITS } from '../common/Constants';

describe('Professional api', () => {
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

    it('Professional getCategroysInBusiness API', () => {
        const data = 20171220000065;
        nock(context1.hostname).get(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.BUSINESS_CATEGORIES}`).reply(200, PROFESSIONAL_BENEFITS);
        getCategroysInBusiness(data).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional createCompanyInformation API ', () => {
        const action = {
            payload: {
                id: 1,
                isNonProfitOrg: false,
                isReseller: false,
                name: '',
                email: '',
                ein: '',
                uploadFile: {},
                categorys: ['Carpenter', 'Contractor'],
                agencyName: '',
                otherCategory: '',
            },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.B2B_CUSTOMER}${action.payload.id}`, action
            .payload).reply(200, {});

            createCompanyInformation(action).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional createCardDetailsInfo API ', () => {
        const action = {
            payload: {
                id: 1,
                nameOnCard: '',
                cardNumber: '4111111111111111',
                expirationMonth: '',
                expirationYear: '',
                cvv: '',
                address1: '28 test Road',
                city: '',
                state: '',
                email: '',
                zip: '',
            },
            actionType: 'CREATE_CARD_DETAILS_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.B2B_CUSTOMER}${action.payload.id}`, action
            .payload).reply(200, {});

            createCardDetailsInfo(action).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional createShoppingPreferenceInformation API ', () => {
        const action = {
            payload: {
                id: 1,
                shoppingPrefrences: ['Electronics', 'Painting']
            },
            actionType: 'CREATE_SHOPPING_PREFERENCES_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.B2B_CUSTOMER}${action.payload.id}`, action
            .payload).reply(200, {});

            createShoppingPreferenceInformation(action).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional uploadFileCompanyInformation API ', () => {
        const action = {
            data: {
            },
            actionType: 'UPLOAD_FILE_COMPANY_INFO_REQUEST',
        };
        nock(`${OverstockRestConfig.FileUpoadCofig()}`).post('', action
            .payload).reply(200, {});

            uploadFileCompanyInformation(action).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional getCustomerDataById API', () => {
        const action = {
            payload: 2,
            actionType: 'GET_SIGNUP_CUSTOMER_BY_ID_REQUEST',
        };
        const data = 20171220000065;
        nock(context1.hostname).get(`${ApiConstants.B2B_CUSTOMER}${action.payload}`).reply(200, PROFESSIONAL_BENEFITS);
        getCustomerDataById(data).then(response => {
            expect(response).deep.equals({});
        });
    });
    it('Professional uploadFileCompanyInformation API', () => {
        const action = {
            payload: 2,
            actionType: 'GET_SIGNUP_CUSTOMER_BY_ID_REQUEST',
        };
        const data = 20171220000065;
        nock(context1.hostname).get(`${ApiConstants.B2B_CUSTOMER}${action.payload}`).reply(200, PROFESSIONAL_BENEFITS);
        uploadFileCompanyInformation(data).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('Professional Cases', () => {
        RestClient.setContext(context1);
    });
});
