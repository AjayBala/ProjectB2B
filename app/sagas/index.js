import { fork } from 'redux-saga/effects';
import watchSignInSaga from './SignInSaga';
import watchSignUpSaga from './SignUpSaga';
import watchGovtSaga from './GovtSaga';
import watchProfessionalSaga from './ProfessionalSaga';
import watchMyProfileSaga from './MyProfileSaga';
import watchAccountManagementSaga from './AccountManagementSaga';
import watchGroupManagementSaga from './GroupManagementSaga';
import watchUserManagementSaga from './UserManagementSaga';

export default function* rootSagas() {
    yield* [
        fork(watchSignInSaga),
        fork(watchSignUpSaga),
        fork(watchGovtSaga),
        fork(watchProfessionalSaga),
        fork(watchMyProfileSaga),
        fork(watchAccountManagementSaga),
        fork(watchGroupManagementSaga),
        fork(watchUserManagementSaga)
    ];
}
