import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import SignUpApi from './SignUpApi';
import { OverstockRestConfig } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

describe('SignUp api', () => {
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

    it('SignUp API should have detail', () => {
        const data = 20171220000065;
        nock(context1.hostname).post(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNUP}`,
         { emailId: 'kalidass1@gmail.com',
        password: 'thomas_password' }).reply(200, {});

        SignUpApi(data).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('SignUp Cases', () => {
        RestClient.setContext(context1);
    });
});
