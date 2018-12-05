import axios from 'axios';
import RestClient from './RestClient';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';
import userDetail from '../json/userDetail.json';

export function getProfile (data) {
    const config = {};
    config.data = data.payload;

    return { data: userDetail };
}

export function updateProfileData (data) {
    const config = {};
    const id = data.payload.id;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.UPDATE_MY_PROFILE}${id}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.put(config)
        .then(json => json);
}

export function getUserProfile (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GET_USER_PROFILE}${data.payload}`;
    config.headers = defaultHeaders;

    return RestClient.get(config)
        .then(json => json);
}

export function uploadProfileImage (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiUploadConfig()}`;
    const formData = new FormData();
    formData.append('file', data.payload);

    return axios({
        method: 'POST',
        url: config.url,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCMkIiLCJzdWIiOiJzcmVlcmFtX29mczFAb3ZlcnN0b2NrLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfYWRtaW4iXSwiaWF0IjoxNTQyMDMwMjg3LCJleHAiOjE1NDIwMzIwODd9.U24LBpptHGG9OnSWhS7tVriM-q0jGP10jBOz5K6mENggNm0MQl4PX1IaSQnlrwxfa2wgxL0_aITChYb_2kI4WA'
        },
        credentials: 'include',
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

export function deleteUserAccount (data) {
    const config = {};
    const userId = data.payload.userId ? data.payload.userId : data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${userId}`;
    // Need to remove the empty data object when server side is done with complete fix for this service
    config.data = {};
    config.headers = defaultHeaders;

    // This is a delete call but Put is used because In server side, there no concept of hard Delete.
    return RestClient.delete(config)
        .then(json => json);
}

export function updateUserProfile (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.UPDATE_MY_PROFILE}${data.id}`;
    config.headers = defaultHeaders;
    config.data = data;

    return RestClient.put(config)
        .then(json => json);
}

export function getProfileImg (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiUploadConfig()}${data.payload}`;
    config.headers = defaultHeaders;
    config.data = data;

    return RestClient.getProfileImg(config)
        .then(response => ({ imgId: data.payload,
            imgData: response })
        );
}
export default {
    getProfile,
    getUserProfile,
    deleteUserAccount,
    updateUserProfile,
    getProfileImg,
    updateProfileData
 };
