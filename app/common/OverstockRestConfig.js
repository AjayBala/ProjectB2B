export class OverstockRestConfig {
    // PROD API Gateway URL
    // static ApiConfig = () => 'https://api.overstock.com/';
    // static ApiUploadConfig = () => 'https://api.overstock.com/b2bdocument/';

    // Dev API Gateway URL
    // static ApiConfig = () => 'https://api-b2bmarketplacedev.test.overstock.com/';

    // static ApiUploadConfig = () => 'https://api-b2bmarketplacedev.test.overstock.com/b2bdocument/';
    // Dev Sandbox URL
    // static ApiConfig = () => 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/';

    static ApiUploadConfig = () => 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:9090/b2bdocument/';

    // Local
    static ApiConfig = () => 'http://192.168.4.170:8082/';
}

export default OverstockRestConfig;

export const defaultHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json'
};

export const fileUploadHeaders = {
    'content-type': 'multipart/form-data'
};
