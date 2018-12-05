import { takeLatest, put, call, all } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import SignUpCase from '../api/SignUpApi';
import * as signUpActionTypes from '../actionTypes/SignUpActionTypes';
import * as ProfessionalActionTypes from '../actionTypes/ProfessionalActionTypes';
import history from '../history';
import { getEmailDomain } from '../common/Utils';
import { GOVT_EMAIL_EXTENSION } from '../common/Constants';

function* SignUp(action) {
    try {
        const signUpResponse = yield call(SignUpCase, action);
        const { data, error } = signUpResponse;
        if (error) {
            const { message } = signUpResponse;
            yield put({ type: signUpActionTypes.SIGN_UP_ERROR, error: message });
        } else {
            yield put({ type: signUpActionTypes.SIGN_UP_SUCCESS, data });
            Cookies.set('isSignUp', data.emailId);
            const { emailId = null, signupStage } = data;
            const getDomain = getEmailDomain(emailId);
            if (GOVT_EMAIL_EXTENSION.includes(getDomain)) {
                history.push('/gov');
                yield put({ type: ProfessionalActionTypes.CURRENT_STAGE, signupStage });
            } else {
                history.push('/professional');
                yield put({ type: ProfessionalActionTypes.CURRENT_STAGE, signupStage });
            }
        }
    } catch (error) {
        yield all([
            put({ type: signUpActionTypes.SIGN_UP_ERROR, error }),
        ]);
    }
}

export default function* watchSignUpSaga() {
    yield all([
        takeLatest(signUpActionTypes.SIGN_UP_REQUEST, SignUp),
    ]);
}
