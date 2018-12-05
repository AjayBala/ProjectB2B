import RestClient from './RestClient';
import { OverstockRestConfig,
         defaultHeaders,
} from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

export default function getCategorysInGovt (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.get(config)
        .then(json => json);
}
