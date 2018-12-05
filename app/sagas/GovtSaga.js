import { takeLatest, put, call, all } from 'redux-saga/effects';
import _isEmpty from 'lodash/isEmpty';
import _orderBy from 'lodash/orderBy';
import getCategorysInGovt from '../api/GovtApi';
import * as GovtActionTypes from '../actionTypes/GovtActionTypes';

function* getGovtCategorys(action) {
    try {
        const categorysResponse = yield call(getCategorysInGovt, action);
        let { data } = categorysResponse;
        if (data && !_isEmpty(data)) {
            data = data.map(Obj => {
                Obj.value = Obj.categoryName;
                Obj.text = Obj.categoryName;
                delete Obj.categoryName;

                return Obj;
            });
            data = _orderBy(data, [data => data.value.toLowerCase()], ['asc']);
        }
        yield put({ type: GovtActionTypes.GET_CATEGORYS_SUCCESS, data });
    } catch (error) {
        yield all([
            put({ type: GovtActionTypes.GET_CATEGORYS_ERROR, error }),
        ]);
    }
}

export default function* watchGovtSaga() {
    yield all([
        takeLatest(GovtActionTypes.GET_CATEGORYS_REQUEST, getGovtCategorys),
    ]);
}
