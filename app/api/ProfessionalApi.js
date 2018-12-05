import axios from 'axios';
import RestClient from './RestClient';
import { OverstockRestConfig,
       defaultHeaders
} from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';


export function getCategroysInBusiness (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.BUSINESS_CATEGORIES}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.get(config)
        .then(json => json);
}

export function createCompanyInformation (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${data.payload.id}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.put(config)
             .then(json => json);
}

export function createCardDetailsInfo (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${data.payload.id}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.put(config)
              .then(json => json);
}

export function createShoppingPreferenceInformation (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${data.payload.id}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.put(config)
              .then(json => json);
}

export function uploadFileCompanyInformation (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiUploadConfig()}`;
    const formData = new FormData();
    formData.append('file', data);

return axios({
        method: 'POST',
        url: config.url,
        withCredentials: 'include',
        data: formData
    }).then(response => {
        const status = response.status;
        const statusText = response.statusText;

return { status, statusText, data: response.data, error: false };
    }).catch(error => {
        const errorDetails = error.response;

return { error: true, statusText: errorDetails.statusText, status: errorDetails.status, message: errorDetails.data };
   });
}

export function getCustomerDataById (action) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${action.payload}`;
    config.headers = defaultHeaders;

return RestClient.get(config)
              .then(json => json);
}
