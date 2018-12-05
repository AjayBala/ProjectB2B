
import RestClient from './RestClient';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

export default function signInCase (data) {
    const config = {};
    config.data = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.CUSTOMER_SIGNIN}`;
    config.headers = defaultHeaders;

    return RestClient.authorizationPost(config)
        .then(json => json);
}
