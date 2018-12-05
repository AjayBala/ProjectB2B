import * as GovtActionTypes from '../actionTypes/GovtActionTypes';

export const getGovtCategorys = (values = {}) => ({
    type: GovtActionTypes.GET_CATEGORYS_REQUEST,
    payload: values,
});

export default {
    getGovtCategorys
};
