import { expect } from 'chai';
import * as AccountManagementActionTypes from '../actionTypes/AccountManagementActionTypes';
import * as actions from './AccountManagementAction';

describe('AccountManagementAction Actions', () => {
    describe('UpdateCompanyProfile', () => {
        let UpdateCompanyProfile = null;
        it('gets the UpdateCompanyProfile', () => {
            UpdateCompanyProfile = actions.UpdateCompanyProfile();
            expect(UpdateCompanyProfile.type).to.equal(AccountManagementActionTypes.GET_COMPANY_PROFILE_REQUEST);
        });
    });
    describe('CompanyProfileError', () => {
        let CompanyProfileError = null;
        it('gets the CompanyProfileError', () => {
            CompanyProfileError = actions.CompanyProfileError();
            expect(CompanyProfileError.type).to.equal(AccountManagementActionTypes.COMPANY_PROFILE_ERROR);
        });
    });
    describe('CompanyProfileSuccess', () => {
        let CompanyProfileSuccess = null;
        it('gets the CompanyProfileSuccess', () => {
            CompanyProfileSuccess = actions.CompanyProfileSuccess();
            expect(CompanyProfileSuccess.type).to.equal(AccountManagementActionTypes.COMPANY_PROFILE_SUCCESS);
        });
    });
    describe('getDefaultCompanyProfile', () => {
        let getDefaultCompanyProfile = null;
        it('gets the GetDefaultCompanyProfile', () => {
            getDefaultCompanyProfile = actions.getDefaultCompanyProfile();
            expect(getDefaultCompanyProfile.type).to.equal(AccountManagementActionTypes.DEFAULT_COMPANY_PROFILE);
        });
    });
    describe('isButtonDisabled', () => {
        let isButtonDisabled = null;
        it('gets the isButtonDisabled', () => {
            isButtonDisabled = actions.isButtonDisabled();
            expect(isButtonDisabled.type).to.equal(AccountManagementActionTypes.IS_BUTTON_DISABLED);
        });
    });
    describe('resetServerAlert', () => {
        let resetServerAlert = null;
        it('gets the resetServerAlert', () => {
            resetServerAlert = actions.resetServerAlert();
            expect(resetServerAlert.type).to.equal(AccountManagementActionTypes.RESEST_SERVER_ERROR_MSG);
        });
    });
    describe('isButtonDisabled', () => {
        let isButtonDisabled = null;
        it('gets the isButtonDisabled', () => {
            isButtonDisabled = actions.isButtonDisabled();
            expect(isButtonDisabled.type).to.equal(AccountManagementActionTypes.IS_BUTTON_DISABLED);
        });
    });
    describe('resetServerAlert', () => {
        let CompanyProfileSuccess = null;
        it('gets the resetServerAlert', () => {
            resetServerAlert = actions.resetServerAlert();
            expect(resetServerAlert.type).to.equal(AccountManagementActionTypes.RESEST_SERVER_ERROR_MSG);
        });
    });
    describe('companyProfileImageUploadRequest', () => {
        let companyProfileImageUploadRequest = null;
        it('gets the companyProfileImageUploadRequest', () => {
            companyProfileImageUploadRequest = actions.companyProfileImageUploadRequest();
            expect(companyProfileImageUploadRequest.type).to.equal(AccountManagementActionTypes.COMPANY_PROFILE_IMAGE_UPLOAD_REQUEST);
        });
    });
});
