import { expect } from 'chai';
import * as ProfessionalActionTypes from '../actionTypes/ProfessionalActionTypes';
import * as actions from './ProfessionalAction';

describe('Professional Actions', () => {
    describe('Professional Action Form', () => {
        let professionalAction = null;

        it('Get customer id', () => {
            professionalAction = actions.getSignupCustomerById();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.GET_SIGNUP_CUSTOMER_BY_ID_REQUEST);
        });

        it('Get business category', () => {
            professionalAction = actions.getBusinessCategorys();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.GET_BUSINESS_CATEGORYS_REQUEST);
        });

        it('Create company info', () => {
            professionalAction = actions.createCompanyInfo();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.CREATE_COMPANY_INFO_REQUEST);
        });

        it('Upload company info', () => {
            professionalAction = actions.uploadFileCompanyInfo();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.UPLOAD_FILE_COMPANY_INFO_REQUEST);
        });

        it('Create card details', () => {
            professionalAction = actions.createCardDetails();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.CREATE_CARD_DETAILS_REQUEST);
        });

        it('Create shopping preference', () => {
            professionalAction = actions.createShoppingPreferences();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.CREATE_SHOPPING_PREFERENCES_REQUEST);
        });

        it('Increment Stage', () => {
            professionalAction = actions.incrementStage();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.INCREMENT_STAGE);
        });

        it('Decrement Stage', () => {
            professionalAction = actions.decrementStage();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.DECREMENT_STAGE);
        });

        it('File change', () => {
            professionalAction = actions.fileChange();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.FILE_CHANGE);
        });

        it('Business category has upload', () => {
            professionalAction = actions.businessCategoryHasUpload();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.BUSINESS_CATEGORY_HAS_UPLOAD);
        });

        it('Business category has value', () => {
            professionalAction = actions.businessCategoryHasValue();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.BUSINESS_CATEGORY_HAS_VALUE);
        });

        it('Selected business category', () => {
            professionalAction = actions.selectedBusinessCategory();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.SELECTED_BUSINESS_CATEGORYS);
        });

        it('Skip for now', () => {
            professionalAction = actions.nextToSkipForNow();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.NEXT_TO_SKIP_FOR_NOW);
        });
        it('shoppingPreferenceHasValue', () => {
            professionalAction = actions.shoppingPreferenceHasValue();
            expect(professionalAction.type).to.equal(ProfessionalActionTypes.SHOPPING_PREFERENCE_HAS_VALUE);
        });
    });
});
