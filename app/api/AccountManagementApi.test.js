import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import updateCompanyProfile from './AccountManagementApi';
import { OverstockRestConfig } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

describe('SignUp api', () => {
    const context1 = {
        hostname: `${OverstockRestConfig.ApiConfig()}${ApiConstants.GET_COMPANY_PROFILE}`,
        isBrowser: true,
        isSecure: true,
    };

    beforeEach(() => {
        RestClient.setContext(context1);
    });

    afterEach(() => {
        nock.cleanAll();
    });

      it('Professional updateCompanyProfile API ', () => {
        const action = {
            payload: { },
            actionType: 'CREATE_COMPANY_INFO_REQUEST',
        };
        nock(context1.hostname).put(`${ApiConstants.GET_COMPANY_PROFILE}${action.payload.id}`, action
            .payload).reply(200, {});

            updateCompanyProfile(action).then(response => {
            expect(response).deep.equals({});
        });
    });


    it('SignUp Cases', () => {
        RestClient.setContext(context1);
    });
});
