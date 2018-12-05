import RestClient from './RestClient';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

export default function updateCompanyProfile(data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GET_COMPANY_PROFILE}${data.payload.id}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.put(config)
        .then(json => json);
}
