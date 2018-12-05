
import React, { Component } from 'react';
import {
Col, Row, Alert
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomSwitch from '../Switch/Switch';
import floatingLabelField from '../../../../FloatingLabel/FloatingLabel';
import RemoveProfilePopUp from '../../../../Model/DeleteProfilePopup';
import './MyProfile.scss';
import { validateEmail,
    validateNewPassword,
    phoneNumberFormatting, onlyNums } from '../../../../../common/Utils';
import ImageComponent from '../../../../ImageComponent';
import * as MyProfileAction from '../../../../../actions/MyProfileAction';
import { PSWD_MIN_CHAR, PSWD_CAPS_CHAR, PSWD_SPECIAL_CHAR, PSWD_NUMBER, MANAGE_PROFILE, DELETE_ACCOUNT, SAVE_CHANGES_BUTTON, COMMUNICATION_PRE, PROMO_MAIL, PROMO_MAIL_TEXT, DIRECT_MAIL, DIRECT_MAIL_TEXT, UNSUBSCRIBE_EMAILS } from '../../../../../common/Constants';
import history from '../../../../../history';

export const validate = (values, props) => {
    const error = {};
    if (props.dirty) {
        props.actions.isSaveBtnDisabled(false);
    } else {
        props.actions.isSaveBtnDisabled(true);
    }

    if (!values.firstName) {
        error.firstName = 'Required';
    }

    if (!values.lastName) {
        error.lastName = 'Required';
    }

    if (values.firstName && values.firstName.length > 15) {
        error.firstName = 'First Name must be less than or equals 15 characters';
    }
    if (values.lastName && values.lastName.length > 15) {
        error.lastName = 'Last Name must be less than 15 or equals characters';
    }

    const value = onlyNums(values.phoneNumber);
    if (value && Number(value[0], 10) === 0) {
            error.phoneNumber = 'Phone number should not start with zero';
    }

    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
    }

    let length = document.getElementById('length');
    let capital = document.getElementById('capital');
    let special = document.getElementById('special');
    let number = document.getElementById('number');

    const passwordCriteriaBox = document.getElementById('passwordCriteriaBox');
    if (passwordCriteriaBox) {
        if (values.profileNewPassword) {
            const errorObj = validateNewPassword(values, length, capital, special, number);
            if (errorObj.error) {
                error.profileNewPassword = errorObj.error;
                length = errorObj.length;
                capital = errorObj.capital;
                special = errorObj.special;
                number = errorObj.number;
            }
            passwordCriteriaBox.style.display = 'block';
        } else if (passwordCriteriaBox && passwordCriteriaBox.style) {
                passwordCriteriaBox.style.display = 'none';
            }
    }

    if (values.profileNewPassword !== values.confirmNewPassword) {
            error.confirmNewPassword = 'Please provide matching password';
    }

    if (values.confirmNewPassword) {
        if (!values.profileNewPassword) {
            error.profileNewPassword = 'Required';
        }
    }

   return error;
};

export class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotionalchecked: true,
            directmailchecked: true,
            unsubscribechecked: false,
            isProfileImgExist: false,
            avatarName: '',
            imageCropResp: null,
        };
    }

    componentWillMount = () => {
        const { actions } = this.props;
        const signUser = Cookies.get('signUserDetails');
        const signUpDetails = signUser ? JSON.parse(signUser) : {};
        if (signUpDetails.profileImageId) {
            actions.getMyProfileImageRequest(signUpDetails.profileImageId);
            this.setState({
                isProfileImgExist: true
            });
        } else {
            let userAvatarName;
            if (signUpDetails.firstName && signUpDetails.firstName[0] && signUpDetails.lastName && signUpDetails.lastName[0]) {
                userAvatarName = `${signUpDetails.firstName[0]}${signUpDetails.lastName[0]}`;
            } else {
                userAvatarName = 'Image';
            }
            this.setState({
                avatarName: userAvatarName,
                isProfileImgExist: false
            });
        }
        actions.getDefaultProfile();
    }

    componentWillReceiveProps = nextProps => {
        const updateResponse = nextProps.profileUpdateResponse;
        if (updateResponse) {
            this.setState({ imageCropResp: null });
        }
    }

    cropSuccessCallBack = file => {
        const { actions } = this.props;
        this.setState({ imageCropResp: file });
        actions.isSaveBtnDisabled(false);
    }

    removeMyProfile = () => {
        const { initialValues = {}, actions } = this.props;
        const { companyInfo: { id } } = initialValues;
        if (id) {
            actions.accountManagementGetUserRoleRequest(id);
        }
    };

    closeModelRemoveFile = () => {
        const { actions } = this.props;
        actions.accountManagementDeletePopupClose();
    }

    onSwitchChange = props => {
        if (props === 'promotional') {
            this.setState(prevState => ({
                promotionalchecked: !prevState.promotionalchecked
            }));
        } else if (props === 'directmail') {
            this.setState(prevState => ({
                directmailchecked: !prevState.directmailchecked
            }));
        } else {
            this.setState(prevState => ({
                unsubscribechecked: !prevState.unsubscribechecked
            }));
        }
    }

    deleteAccountConfirm = () => {
        this.closeModelRemoveFile();
        history.push('/signup');
    }

    handleDismiss = () => {
        const { actions } = this.props;
        actions.resetServerAlert();
    }

    render() {
        const {
            promotionalchecked,
            directmailchecked,
            unsubscribechecked,
            isProfileImgExist,
            avatarName,
        } = this.state;
        const { handleSubmit, initialValues = {}, myProfileImageResponse, isOpenDeletePopup, companyUsersProfile = {}, profileUpdateResponse, isSaveBtnDisabled, profileUpdateError, futureName } = this.props;
        // const { show } = this.state;
        const passwordCriteriaBox = document.getElementById('passwordCriteriaBox');

        const saveChanges = values => {
            const { imageCropResp } = this.state;
            const { actions, change } = this.props;
            const updateData = {
                id: values.id,
                emailId: values.emailId,
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: onlyNums(values.phoneNumber),
                communicationPref: values.communicationPref,
                b2cCustomerId: values.b2cCustomerId
            };
            updateData.futureName = 'accountManagement';

            if (values.profileNewPassword) {
                updateData.password = values.profileNewPassword;
                updateData.oldPassword = values.password;
            }

            if (imageCropResp) {
                updateData.uploadFile = imageCropResp;
                actions.profileImageUploadRequest(updateData);
            } else {
                actions.updateMyProfileRequest(updateData);
            }
            change('profileNewPassword', null);
            change('confirmNewPassword', null);
            change('password', '123456789');

            actions.resetServerAlert();
            passwordCriteriaBox.style.display = 'none';
        };

        return (

            <div>
                { isOpenDeletePopup
                        ? (
                            <RemoveProfilePopUp
                                show={isOpenDeletePopup}
                                onHide={this.closeModelRemoveFile}
                                onDeleteConfirm={this.deleteAccountConfirm}
                                modeltype={companyUsersProfile.code}
                                isAdminUser={initialValues.roleType === 'admin'}
                            />
                    ) : null }
                <div className="myProfileFormWrap">
                    <form
                        onSubmit={handleSubmit(saveChanges)}
                        className="formListWrap"
                        onFocus={this.changeButton}>
                        { profileUpdateError && (
                        <Alert bsStyle="danger" className="alert-banner-error serverErrorBanner" onDismiss={this.handleDismiss}>
                            <p>{profileUpdateError}</p>
                        </Alert>
                        )}
                        <Row>
                            <Col lg={6} md={12}>
                                <h1 className="HeaderTxt_ComBu manage_title">{MANAGE_PROFILE}</h1>
                                <div className="fullWrap">
                                    {isProfileImgExist
                                        ? (
                                            <div>
                                                {myProfileImageResponse
                                                    && (
                                                        <ImageComponent
                                                            imageSrc={myProfileImageResponse.imgData}
                                                            height="64"
                                                            width="64"
                                                            isUploadActive={true}
                                                            cropSuccess={this.cropSuccessCallBack}
                                                            containerStyles={{ width: '64px', margin: '10px' }}
                                                        />
                                                    )
                                                }
                                            </div>
                                        )
                                        : (
                                            <ImageComponent
                                                height="64px"
                                                width="64px"
                                                isNoImage={true}
                                                isUploadActive={true}
                                                cropSuccess={this.cropSuccessCallBack}
                                                placeholder={avatarName}
                                                containerStyles={{ width: '64px', margin: '10px' }}
                                            />
                                    )}
                                </div>
                                <ul className="myProfileInnerLeftTxtWrap">
                                    <li>
                                        <div className="col-lg-6 col-md-6 nameWrap">
                                            <Field
                                                name="firstName"
                                                type="text"
                                                label="First name"
                                                component={floatingLabelField}
                                                    />
                                        </div>
                                        <div className="col-lg-6 col-md-6 nameWrap">
                                            <Field
                                                name="lastName"
                                                type="text"
                                                label="Last name"
                                                component={floatingLabelField}
                                                    />
                                        </div>
                                    </li>
                                    <li className="nonEditableField">
                                        <Field
                                            name="emailId"
                                            disabled={true}
                                            type="text"
                                            label="Email"
                                            component={floatingLabelField}
                                        />
                                    </li>
                                    <li>
                                        <Field
                                            name="phoneNumber"
                                            type="text"
                                            label="Phone number"
                                            component={floatingLabelField}
                                            normalize={phoneNumberFormatting}
                                                />
                                    </li>
                                    <li className="nonEditableField">
                                        <Field
                                            name="roleType"
                                            disabled={true}
                                            type="text"
                                            label="Account type"
                                            component={floatingLabelField}
                                        />
                                    </li>
                                    <li>
                                        <Field
                                            name="password"
                                            type="password"
                                            label="Current password"
                                            id="myInput"
                                            showHide="txt"
                                            component={floatingLabelField}
                                        />
                                    </li>
                                    <li className="hideError">
                                        <Field
                                            name="profileNewPassword"
                                            type="password"
                                            label="New password"
                                            component={floatingLabelField}
                                            id="pswd"
                                            onFocus={() => {
                                                    passwordCriteriaBox.style.display = 'block';
                                                }}
                                            />
                                        <div id="passwordCriteriaBox">
                                            <p id="length">
                                                {PSWD_MIN_CHAR}
                                            </p>
                                            <p id="capital">
                                                {PSWD_CAPS_CHAR}
                                            </p>
                                            <p id="special">
                                                {PSWD_SPECIAL_CHAR}
                                            </p>
                                            <p id="number">
                                                {PSWD_NUMBER}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <Field
                                            name="confirmNewPassword"
                                            type="password"
                                            label="Confirm new password"
                                            component={floatingLabelField}
                                                />
                                    </li>
                                </ul>
                            </Col>

                            <Col lg={6} md={12} className="preferences">
                                <Row className="myProfileRightContentWrap">
                                    <Col lg={12} sm={12}>
                                        <ul>
                                            <li>
                                                <p className="HeaderTxt_ComBu">
                                                    { COMMUNICATION_PRE }
                                                </p>
                                            </li>
                                            <li>
                                                <Row>
                                                    <Col lg={6} sm={6}>
                                                        <p className="subHeadings">
                                                            { PROMO_MAIL }
                                                        </p>
                                                    </Col>
                                                    <Col lg={6} sm={6}>
                                                        <CustomSwitch
                                                            checkedState={promotionalchecked}
                                                            changeCallBack={this.onSwitchChange}
                                                            type="promotional" />
                                                    </Col>
                                                </Row>
                                                <p>
                                                    { PROMO_MAIL_TEXT }
                                                </p>
                                                <hr/>
                                            </li>
                                            <li className="preferences">
                                                <Row>
                                                    <Col lg={6} sm={6}>
                                                        <p className="subHeadings">
                                                            { DIRECT_MAIL }
                                                        </p>
                                                    </Col>
                                                    <Col lg={6} sm={6}>
                                                        <CustomSwitch
                                                            checkedState={directmailchecked}
                                                            changeCallBack={this.onSwitchChange}
                                                            type="directmail"
                                                            />
                                                    </Col>
                                                </Row>
                                                <p>
                                                    { DIRECT_MAIL_TEXT }
                                                </p>
                                                <hr/>
                                            </li>
                                            <li className="preferences">
                                                <Row>
                                                    <Col lg={6} sm={6}>
                                                        <p className="subHeadings">
                                                            { UNSUBSCRIBE_EMAILS }
                                                        </p>
                                                    </Col>
                                                    <Col lg={6} sm={6}>
                                                        <CustomSwitch
                                                            checkedState={unsubscribechecked}
                                                            changeCallBack={this.onSwitchChange}
                                                            type="unsubscribe" />
                                                    </Col>
                                                </Row>
                                                <hr/>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <div className="formBtnWrap controlBtnWrap">
                            <a
                                className="removeProfileButton"
                                onClick={this.removeMyProfile}
                                >
                                {DELETE_ACCOUNT}
                            </a>
                            <button
                                className="formBtnComProfile saveBtnComProfile"
                                type="submit"
                                disabled={isSaveBtnDisabled || (isSaveBtnDisabled && profileUpdateResponse)}
                                >
                                {SAVE_CHANGES_BUTTON}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

MyProfile.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.objectOf(PropTypes.func),
    companyUsersProfile: PropTypes.object,
    initialValues: PropTypes.object,
    profileUpdateResponse: PropTypes.object,
    isOpenDeletePopup: PropTypes.bool,
    isSaveBtnDisabled: PropTypes.bool,
    profileUpdateError: PropTypes.string,
    futureName: PropTypes.string,
    myProfileImageResponse: PropTypes.object,
    change: PropTypes.func,
};

const MyProfileForm = reduxForm({
    form: 'ProfessionalForm', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(MyProfile);

const mapStateToProps = state => ({
    initialValues: (state.myProfile && state.myProfile.myProfileInitValues) ? state.myProfile.myProfileInitValues : undefined,
    companyUsersProfile: state.myProfile.userRoleResponse ? state.myProfile.userRoleResponse : {},
    deleteUsers: state.myProfile ? state.myProfile.userDeleteResposne : undefined,
    fileUploadResponse: state.myProfile && state.myProfile.imageUploadResponse,
    isOpenDeletePopup: state.myProfile.isOpenDeletePopup ? state.myProfile.isOpenDeletePopup : false,
    profileUpdateResponse: state.myProfile && state.myProfile.profileUpdateResponse,
    profileUpdateError: state.myProfile.error ? state.myProfile.error : '',
    isSaveBtnDisabled: state.myProfile ? state.myProfile.isSaveBtnDisabled : false,
    myProfileImageResponse: state.myProfile ? state.myProfile.myProfileImageResponse : {}
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        MyProfileAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileForm);
