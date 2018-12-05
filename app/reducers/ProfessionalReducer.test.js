import { expect } from 'chai';
import ProfessionalReducer from './ProfessionalReducer';
import * as types from '../actionTypes/ProfessionalActionTypes';

describe('ProfessionalReducer', () => {
    const payload = {};
    const categorys = {};
    const data = {
        companyInfo: {
        isNonProfitOrg: false,
        isReseller: false,
        name: '',
        email: 'Overstock18@gmail.com',
        ein: '',
        uploadFile: null,
        categorys: [],
        categories: [{ id: 1, categoryName: 'Contractor' },
        { id: 2, categoryName: 'Real estate agent' }],
        agencyName: '',
    },
    creditCard: [{
        nameOnCard: '',
        cardNumber: '41111111111111111',
        expirationMonth: '',
        expirationYear: '',
        cvv: '',
    }],
    address: [{
        address1: '',
        city: '',
        state: '',
        email: '',
        zip: '',
    }] };
    it('Should be called GET_BUSINESS_CATEGORYS_REQUEST', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_BUSINESS_CATEGORYS_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_BUSINESS_CATEGORYS_SUCCESS', () => {
        expect(
            ProfessionalReducer([], {
                type: types.GET_BUSINESS_CATEGORYS_SUCCESS,
                payload: categorys,
            }),
        ).to.deep.equal({ categorys });
    });

    it('Should be called GET_BUSINESS_CATEGORYS_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_BUSINESS_CATEGORYS_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called GET_SIGNUP_CUSTOMER_BY_ID_REQUEST', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_SIGNUP_CUSTOMER_BY_ID_REQUEST,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called GET_SIGNUP_CUSTOMER_BY_ID_SUCCESS', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_SIGNUP_CUSTOMER_BY_ID_SUCCESS,
                data
            }),
        ).to.deep.equal({ data });
    });

    it('Should be called GET_SIGNUP_CUSTOMER_BY_ID_SUCCESS', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_SIGNUP_CUSTOMER_BY_ID_SUCCESS,
                data: {}
            }),
        ).to.deep.equal({});
    });

    it('Should be called GET_SIGNUP_CUSTOMER_BY_ID_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_SIGNUP_CUSTOMER_BY_ID_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called FILE_CHANGE', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.FILE_CHANGE,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called BUSINESS_CATEGORY_HAS_UPLOAD', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.BUSINESS_CATEGORY_HAS_UPLOAD,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called GET_SIGNUP_CUSTOMER_BY_ID_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_SIGNUP_CUSTOMER_BY_ID_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_COMPANY_INFO_REQUEST', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_COMPANY_INFO_REQUEST,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_COMPANY_INFO_SUCCESS', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_COMPANY_INFO_SUCCESS,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_COMPANY_INFO_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_COMPANY_INFO_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called UPLOAD_FILE_COMPANY_INFO_REQUEST', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.UPLOAD_FILE_COMPANY_INFO_REQUEST,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called UPLOAD_FILE_COMPANY_INFO_SUCCESS', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.UPLOAD_FILE_COMPANY_INFO_SUCCESS,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called UPLOAD_FILE_COMPANY_INFO_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.UPLOAD_FILE_COMPANY_INFO_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called INCREMENT_STAGE', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.INCREMENT_STAGE,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called DECREMENT_STAGE', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.DECREMENT_STAGE,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CURRENT_STAGE', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CURRENT_STAGE,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_CARD_DETAILS_REQUEST', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_CARD_DETAILS_REQUEST,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_CARD_DETAILS_SUCCESS', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_CARD_DETAILS_SUCCESS,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_CARD_DETAILS_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_CARD_DETAILS_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_SHOPPING_PREFERENCES_REQUEST', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_SHOPPING_PREFERENCES_REQUEST,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_SHOPPING_PREFERENCES_SUCCESS', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_SHOPPING_PREFERENCES_SUCCESS,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called NEXT_TO_SKIP_FOR_NOW', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.NEXT_TO_SKIP_FOR_NOW,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('Should be called CREATE_SHOPPING_PREFERENCES_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.CREATE_SHOPPING_PREFERENCES_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            ProfessionalReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
