import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import nock from 'nock';
import { spy, assert } from 'sinon';
import * as ApiConstants from './ApiConstants';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import RestClient from './RestClient';

describe('GET API', () => {
    let config = {
        url: `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`,
        headers: defaultHeaders
    };
    let context = {
        hostname: `${OverstockRestConfig.ApiConfig()}`,
        host: `${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`,
    };

    beforeEach(() => {
        nock(`${OverstockRestConfig.ApiConfig()}`).get(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`).reply(200, { success: {} });
        if (RestClient.get.restore) {
            RestClient.get.restore();
        }
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('Get and verfiy response data with default context and config', () => {
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config -> params & encode', () => {
        config.params = { expand: true };
        config.encode = true;
        config.credentials = 'include';
        config.queryParams = 'test';
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config -> params', () => {
        config.params = { expand: true };
        config.encode = undefined;
        config.credentials = 'same-origin';
        context.isBrowser = true;
        config.isAuthRequired = true;
        global.document = {};
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config -> full url', () => {
        config = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GOVT_CATEGORIES}`;
        context = {
            isSecure: false,
            apiPrefixInternal: '',
            hostname: 'm.jcpenney.com',
        };
        process.env.NODE_ENV = 'development';
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config and context', () => {
        config = {
            url: `${context.hostname}${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`,
            version: '',
            external: true,
            host: `${OverstockRestConfig.ApiConfig()}`,
            credentials: 'omit',
            isAuthRequired: true,
        };
        context = {
            isSecure: false,
            apiPrefixInternal: '',
            headers: {
            },
        };
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get API - 500 error', () => {
        nock.cleanAll();
        nock(`${OverstockRestConfig.ApiConfig()}`).get(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`).replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.get(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Get API - API should be called only once', () => {
        spy(RestClient, 'get');
        nock(`${OverstockRestConfig.ApiConfig()}`).get(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`).reply(200, {});
        RestClient.get(config);
        assert.calledOnce(RestClient.get);
    });


    it('Get API - API should be called with the params', () => {
        spy(RestClient, 'get');
        nock(`${OverstockRestConfig.ApiConfig()}`).get(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`).reply(200, {});
        RestClient.get(config);
        assert.calledWithExactly(RestClient.get, config);
    });

    it('Get API - 200 but emptry string', () => {
        nock.cleanAll();
        nock(`${OverstockRestConfig.ApiConfig()}`).get(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`).reply(200, '');
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).to.have.property('response');
            expect(response.data.response).to.equal('');
        });
    });
});

describe('POST API', () => {
    const config = {
        url: `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNUP}`,
        data: {
            emailId: 'kalidass1@gmail.com',
            password: 'thomas_password',
        },
        headers: defaultHeaders
    };

    beforeEach(() => {
        RestClient.setContext({ hostname: `${OverstockRestConfig.ApiConfig()}` });
    });

    afterEach(() => {
        nock.cleanAll();
        if (RestClient.post.restore) {
            RestClient.post.restore();
        }
    });

    it('Post and verfiy response with params', () => {
        nock(`${OverstockRestConfig.ApiConfig()}`).post(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNUP}`, {
                emailId: 'kalidass1@gmail.com',
                password: 'thomas_password',
        }).reply(201);
        RestClient.post(config).then(response => {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal(undefined);
        });
    });

    it('Post and verfiy response without params', () => {
        config.params = '';
        nock(`${OverstockRestConfig.ApiConfig()}`).post(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNUP}`).reply(201);
        RestClient.post(config).then(response => {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal(undefined);
        });
    });

    it('Post API - 500 error', () => {
        nock(`${OverstockRestConfig.ApiConfig()}`).post(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNUP}`).replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.post(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Post API - API should be called only once', () => {
        spy(RestClient, 'post');
        nock(`${OverstockRestConfig.ApiConfig()}`).post(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNUP}`).reply(200, {});
        RestClient.post(config);
        assert.calledOnce(RestClient.post);
    });

    it('Post API - API should be called with the params', () => {
        spy(RestClient, 'post');
        nock(`${OverstockRestConfig.ApiConfig()}`).post(`${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNUP}`).reply(200, {});
        RestClient.post(config);
        assert.calledWithExactly(RestClient.post, config);
    });
});

describe('PUT API', () => {
    const config = {
        url: `${OverstockRestConfig.ApiConfig()}`,
        headers: defaultHeaders
    };

    beforeEach(() => {
        RestClient.setContext({ hostname: `${OverstockRestConfig.ApiConfig()}` });
    });

    afterEach(() => {
        nock.cleanAll();
        if (RestClient.put.restore) {
            RestClient.put.restore();
        }
    });

    it('Put and verfiy response with params', () => {
        const data = {
            payload: {
                id: 2,
            }
        };
        nock(`${OverstockRestConfig.ApiConfig()}`).put(`${ApiConstants.B2B_CUSTOMER}${data.payload.id}`).reply(204);
        RestClient.put(config).then(response => {
            expect(response.status).to.be.equal(204);
            expect(response.statusText).to.be.equal('No Content');
        });
    });

    it('Put and verfiy response without params', () => {
        const data = {
            payload: {
                id: 2,
            }
        };
        config.params = '';
        nock(`${OverstockRestConfig.ApiConfig()}`).put(`${ApiConstants.B2B_CUSTOMER}${data.payload.id}`).reply(204);
        RestClient.put(config).then(response => {
            expect(response.status).to.be.equal(204);
            expect(response.statusText).to.be.equal('No Content');
        });
    });

    it('Put API - 500 error', () => {
        const data = {
            payload: {
                id: 2,
            }
        };
        nock(`${OverstockRestConfig.ApiConfig()}`).put(`${ApiConstants.B2B_CUSTOMER}${data.payload.id}`).replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.put(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Put API - API should be called only once', () => {
        const data = {
            payload: {
                id: 2,
            }
        };
        spy(RestClient, 'put');
        nock(`${OverstockRestConfig.ApiConfig()}`).put(`${ApiConstants.B2B_CUSTOMER}${data.payload.id}`).reply(204);
        RestClient.put(config);
        assert.calledOnce(RestClient.put);
    });

    it('Put API - API should be called with the params', () => {
        const data = {
            payload: {
                id: 2,
            }
        };
        spy(RestClient, 'put');
        nock(`${OverstockRestConfig.ApiConfig()}`).put(`${ApiConstants.B2B_CUSTOMER}${data.payload.id}`).reply(204);
        RestClient.put(config);
        assert.calledWithExactly(RestClient.put, config);
    });
});

describe('DELETE API', () => {
    const config = {
        url: `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}2`,
        headers: defaultHeaders
    };

    beforeEach(() => {
        RestClient.setContext(`${OverstockRestConfig.ApiConfig()}`);
    });

    afterEach(() => {
        nock.cleanAll();
        if (RestClient.delete.restore) {
            RestClient.delete.restore();
        }
    });

    it('Delete and verfiy response with params', () => {
        nock(`${OverstockRestConfig.ApiConfig()}`).delete(`${ApiConstants.B2B_CUSTOMER}2`).reply(200, {});
        RestClient.delete(config).then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK');
        });
    });

    it('Delete and verfiy response without params', () => {
        config.url = '/savedItems/c1gi536736132';
        config.params = '';
        nock(`${OverstockRestConfig.ApiConfig()}`).delete(`${ApiConstants.B2B_CUSTOMER}2`).reply(200, {});
        RestClient.delete(config).then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK');
        });
    });

    it('Delete API - 500 error', () => {
        nock(`${OverstockRestConfig.ApiConfig()}`).delete(`${ApiConstants.B2B_CUSTOMER}2`).replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.delete(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Delete API - API should be called only once', () => {
        spy(RestClient, 'delete');
        nock(`${OverstockRestConfig.ApiConfig()}`).delete(`${ApiConstants.B2B_CUSTOMER}2`).reply(200, {});
        RestClient.delete(config);
        assert.calledOnce(RestClient.delete);
    });

    it('Delete API - API should be called with the params', () => {
        spy(RestClient, 'delete');
        nock(`${OverstockRestConfig.ApiConfig()}`).delete(`${ApiConstants.B2B_CUSTOMER}2`).reply(200, {});
        RestClient.delete(config);
        assert.calledWithExactly(RestClient.delete, config);
    });
});

describe('JSONP API', () => {
    beforeEach(() => {
        RestClient.setContext({ hostname: `${OverstockRestConfig.ApiConfig()}`, isSecure: true });
    });
    it('should return empty response when config is empty', () => {
        const response = RestClient.jsonp({ external: true });
        expect(response).to.eql({});
        expect(response).to.be.empty;
    });
});
