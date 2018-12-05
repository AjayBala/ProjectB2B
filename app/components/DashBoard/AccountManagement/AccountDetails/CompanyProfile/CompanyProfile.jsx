import React, { Component } from 'react';
import {
    Col, Row, Alert
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import floatingLabelField from '../../../../FloatingLabel/FloatingLabel';
import * as professionalAction from '../../../../../actions/ProfessionalAction';
import Documents from '../DocumentsPopUp/Documents';
import './CompanyProfile.scss';
import RemoveCompanyFile from '../RemoveCompanyFile/RemoveCompanyFile';
import ImageComponent from '../../../../ImageComponent';
import { validateEmail, normalizeZip, companyPhoneNumberFormatting, einNumberFormater, onlyNums } from '../../../../../common/Utils';
import * as SignUpAction from '../../../../../actions/SignUpAction';
import * as MyProfileAction from '../../../../../actions/MyProfileAction';
import * as AccountManagementAction from '../../../../../actions/AccountManagementAction';
import RemoveProfilePopUp from '../../../../Model/DeleteProfilePopup';
import {
    MANAGE_PROFILE,
    DELETE_ACCOUNT,
    SAVE_CHANGES_BUTTON
} from '../../../../../common/Constants';

export const validate = (values, props) => {
    const error = {};
    if (props.dirty) {
        props.actions.isButtonDisabled(false);
    } else {
        props.actions.isButtonDisabled(true);
    }
    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
    }

    const value = onlyNums(values.profilePhone);
    if (value && Number(value[0], 10) === 0) {
            error.profilePhone = 'phoneNumber should not start with zero';
    }

    return error;
};

export class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalAppear: false,
            deactivateAcc: false,
            RemoveComFileIcon: false,
            isProfileImgExist: false,
            avatarName: '',
            imageCropResp: null,
        };
    }

    componentWillMount = () => {
        const { actions } = this.props;
        const signUser = Cookies.get('signUserDetails');
        const signUpDetails = signUser ? JSON.parse(signUser) : {};
        if (signUpDetails.companyInfo && signUpDetails.companyInfo.profileImageId) {
            actions.getCompanyProfileImageRequest(signUpDetails.companyInfo.profileImageId);
            this.setState({
                isProfileImgExist: true
            });
        } else {
            let userAvatarName;
            if (signUpDetails.companyInfo && signUpDetails.companyInfo.name) {
                userAvatarName = signUpDetails.companyInfo.name[0];
            } else {
                userAvatarName = 'C';
            }
            this.setState({
                avatarName: userAvatarName,
                isProfileImgExist: false
            });
        }
        actions.getDefaultCompanyProfile();
    }

    closeModel = () => {
        this.setState({
            deactivateAcc: false,
            isModalAppear: false,
        });
    }

    closeModelAcc = () => {
        this.setState({
            deactivateAcc: false,
        });
    }

    closeModelRemoveFile = () => {
        this.setState({
            RemoveComFileIcon: false,
        });
    }

    deactivateAccount = () => {
        this.setState({ deactivateAcc: true });
    };

    RemoveComFile = () => {
        this.setState({ RemoveComFileIcon: true });
    };

    removeMyProfile = () => {
        this.setState({ deactivateAcc: true });
    };

    handleDismiss = () => {
        const { actions } = this.props;
        actions.resetServerAlert();
    }

    cropSuccessCallBack = file => {
        const { actions } = this.props;
        this.setState({ imageCropResp: file });
        actions.isButtonDisabled(false);
    }

    render() {
        const {
            isModalAppear, deactivateAcc, RemoveComFileIcon, isProfileImgExist, avatarName
        } = this.state;
        const { initialValues, companyProfileImageResponse, handleSubmit, updateError, isUpdateSuccess, isSaveBtnDisabled } = this.props;
        const updateCompanyProfile = values => {
            const { imageCropResp } = this.state;
            const { actions } = this.props;
            const dataToBeUpdated = {
                id: values.id,
                companyProfileImageId: values.profileImageId,
                ein: onlyNums(values.ein),
                emailId: values.emailId,
                name: values.nameOfBusiness,
                phoneNumber: onlyNums(values.profilePhone),
                address1: values.address1,
                city: values.city,
                state: values.state,
                zip: values.zip
            };
            if (imageCropResp) {
                dataToBeUpdated.uploadFile = imageCropResp;
                actions.companyProfileImageUploadRequest(dataToBeUpdated);
            } else {
                actions.UpdateCompanyProfile(dataToBeUpdated);
            }
            actions.resetServerAlert();
        };

        return (
            <div>
                { isModalAppear && (
                    <div >
                        <Documents
                            show={isModalAppear}
                            onHide={this.closeModel}
                        />
                    </div>
                )}
                { deactivateAcc && (
                    <RemoveProfilePopUp
                        show={deactivateAcc}
                        onHide={this.closeModelAcc}
                        isdeactivatecompanyaccount="true"
                    />
                )}
                { RemoveComFileIcon && (
                    <RemoveCompanyFile
                        show={RemoveComFileIcon}
                        onHide={this.closeModelRemoveFile}
                    />
                )}
                <div className="myProfileFormWrap">
                    <form onSubmit={handleSubmit(updateCompanyProfile)} className="formListWrap companyDetailsWrap" onFocus={this.changeButton}>
                        { updateError && (
                        <Alert bsStyle="danger" className="alert-banner-error serverErrorBanner" onDismiss={this.handleDismiss}>
                            <p>{updateError}</p>
                        </Alert>
                        )}
                        <div className="">
                            <h1 className="HeaderTxt_ComBu manage_title">{MANAGE_PROFILE}</h1>
                            <div className="fullWrap">
                                {isProfileImgExist
                                        ? (
                                            <div>
                                                { companyProfileImageResponse
                                                    ? (
                                                        <ImageComponent
                                                            imageSrc={companyProfileImageResponse.imgData}
                                                            height="64"
                                                            width="64"
                                                            isUploadActive={true}
                                                            cropSuccess={this.cropSuccessCallBack}
                                                            containerStyles={{ width: '64px', margin: '10px' }}
                                                        />
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
                            <Row>
                                <Col lg={6} md={6} >
                                    <ul className={initialValues && initialValues.roleType === 'contributor' ? 'companyProfileInnerLeftTxtWrap nonEditableField' : 'companyProfileInnerLeftTxtWrap'} >
                                        <li>
                                            <Field
                                                name="nameOfBusiness"
                                                type="text"
                                                label="Company name"
                                                component={floatingLabelField}
                                                disabled={initialValues && initialValues.roleType === 'contributor'}
                                            />
                                        </li>
                                        <li>
                                            <Field
                                                name="profilePhone"
                                                type="text"
                                                label="Company phone"
                                                component={floatingLabelField}
                                                normalize={companyPhoneNumberFormatting}
                                                disabled={initialValues && initialValues.roleType === 'contributor'}
                                            />
                                        </li>
                                        <li>
                                            <Field
                                                name="city"
                                                type="text"
                                                label="City"
                                                component={floatingLabelField}
                                                disabled={initialValues && initialValues.roleType === 'contributor'}
                                            />
                                        </li>
                                        <li>
                                            <Field
                                                name="emailId"
                                                type="text"
                                                label="Company email"
                                                component={floatingLabelField}
                                                disabled={initialValues && initialValues.roleType === 'contributor'}
                                            />
                                        </li>
                                        <li>
                                            <Field
                                                name="address1"
                                                type="text"
                                                label="Street address"
                                                component={floatingLabelField}
                                                disabled={initialValues && initialValues.roleType === 'contributor'}
                                            />
                                        </li>
                                        <li>
                                            <Row>
                                                <Col lg={6} sm={6} >
                                                    <Field
                                                        name="state"
                                                        type="text"
                                                        label="State"
                                                        component={floatingLabelField}
                                                        disabled={initialValues && initialValues.roleType === 'contributor'}
                                                        />
                                                </Col>
                                                <Col lg={6} sm={6} >
                                                    <Field
                                                        name="zip"
                                                        type="number"
                                                        component={floatingLabelField}
                                                        label="Zip"
                                                        normalize={normalizeZip}
                                                        disabled={initialValues && initialValues.roleType === 'contributor'}/>
                                                </Col>
                                            </Row>
                                        </li>
                                        <li>
                                            <Field
                                                name="ein"
                                                type="text"
                                                label="EIN"
                                                component={floatingLabelField}
                                                normalize={einNumberFormater}
                                                disabled={initialValues && initialValues.roleType === 'contributor'}
                                            />
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                        {(initialValues && initialValues.roleType === 'admin') && (
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
                                    disabled={isSaveBtnDisabled || (isSaveBtnDisabled && isUpdateSuccess)}
                                    >
                                    {SAVE_CHANGES_BUTTON}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}

CompanyProfile.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.objectOf(PropTypes.func),
    initialValues: PropTypes.object,
    updateError: PropTypes.string,
    isUpdateSuccess: PropTypes.bool,
    isSaveBtnDisabled: PropTypes.bool,
    companyProfileImageResponse: PropTypes.object
};

const CompanyProfileForm = reduxForm({
    form: 'CompanyProfileForm',
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(CompanyProfile);


const mapStateToProps = state => ({
    initialValues: state.accountManagement ? state.accountManagement.companyProfileInitValues : {},
    isUpdateSuccess: state.accountManagement ? state.accountManagement.isValuesUpdated : false,
    updateError: state.accountManagement ? state.accountManagement.error : {},
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    userDetails: state.professional ? state.professional : {},
    isSaveBtnDisabled: state.accountManagement ? state.accountManagement.isButtonDisabled : false,
    companyProfileImageResponse: state.accountManagement ? state.accountManagement.companyProfileImageResponse : {}
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignUpAction, AccountManagementAction, professionalAction, MyProfileAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfileForm);
