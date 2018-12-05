import React, { Component } from 'react';
import {
Col, Row,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import floatingLabelField from '../../../../../FloatingLabel/FloatingLabel';
import { phoneNumberFormatting, onlyNums, validateEmail } from '../../../../../../common/Utils';
import { COMMUNICATION_PRE, PROMO_MAIL, PROMO_MAIL_TEXT, DIRECT_MAIL, DIRECT_MAIL_TEXT, UNSUBSCRIBE_EMAILS, SAVE_CHANGES_BUTTON } from '../../../../../../common/Constants';
import CustomSwitch from '../../../../AccountManagement/AccountDetails/Switch/Switch';
import * as UserManagementActions from '../../../../../../actions/UserManagementAction';
import * as MyProfileAction from '../../../../../../actions/MyProfileAction';
import './RowExpandinator.scss';

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

    const value = values.phoneNumber ? values.phoneNumber : '';
    if (value && Number(value[0], 10) === 0) {
            error.phoneNumber = 'Phone number should not start with zero';
    }

    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
    }


   return error;
};

class ProfileAccordionView extends Component {
    constructor() {
        super();
        this.state = {
            isAccordionVisible: true,
            promotionalchecked: false,
            directmailchecked: false,
            unsubscribechecked: false,
        };
    }

    componentWillMount = () => {
        const { userData } = this.props;
        const communicationPref = {
            enablePromotionalMail: true,
            enableDirectMail: true,
            unsubscribeAllMails: true
        };
        const commPref = userData.communicationPref ? userData.communicationPref : communicationPref;
        this.setState({
            promotionalchecked: commPref.enablePromotionalMail,
            directmailchecked: commPref.enableDirectMail,
            unsubscribechecked: commPref.unsubscribeAllMails
        });
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

    render() {
        const { handleSubmit, closeAccordionCallBack, deleteUserCallBack, rowData, futureName, isSaveBtnDisabled } = this.props;
        const { isAccordionVisible, promotionalchecked, directmailchecked, unsubscribechecked } = this.state;

        const updateProfile = values => {
            const { actions, initialValues } = this.props;
                const signUserDetails = Cookies.get('signUserDetails') ? JSON.parse(Cookies.get('signUserDetails')) : null;

                const usersListUpdatedData = {
                    id: initialValues.id,
                    businessId: signUserDetails.companyInfo.id,
                    emailId: values.emailId,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber ? onlyNums(values.phoneNumber.toString()) : '',
                    b2cCustomerId: signUserDetails.b2cCustomerId,
                    communicationPref: {
                        enablePromotionalMail: promotionalchecked,
                        enableDirectMail: directmailchecked,
                        unsubscribeAllMails: unsubscribechecked
                    },
                  };
                if (signUserDetails && signUserDetails.profileImageId) {
                    usersListUpdatedData.profileImageId = signUserDetails.profileImageId;
                }
                usersListUpdatedData.futureName = futureName;
                actions.updateProfileDataRequest(usersListUpdatedData);
                actions.isSaveBtnDisabled(true);
        };

        return (
            <div>
                {isAccordionVisible ? (
                    <div className="myProfileFormWrap">
                        <button type="button" className="close" onClick={() => { closeAccordionCallBack(); }}>
                            <span aria-hidden="true" className="accordionCloseIcon">&times;</span>
                        </button>
                        <form onSubmit={handleSubmit(updateProfile)}>
                            <Row>
                                <Col lg={6} md={6}>
                                    <ul className="myProfileInnerLeftTxtWrap">
                                        <li className="nonEditableField">
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
                                                type="text"
                                                label="Email"
                                                component={floatingLabelField}
                                            />
                                        </li>
                                        <li className="nonEditableField">
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
                                                type="text"
                                                label="Account type"
                                                component={floatingLabelField}
                                            />
                                        </li>
                                    </ul>
                                </Col>

                                <Col lg={6} md={6} className="preferences">
                                    <ul className="myProfileAccordionRightContentWrap">
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
                                                        type="promotional"
                                                        name="enablePromotionalMail" />
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
                                                        name="enableDirectMail"
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
                                                        type="unsubscribe"
                                                        name="unsubscribeAllMails"
                                                    />
                                                </Col>
                                            </Row>
                                            <hr/>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>

                            <div className="formBtnWrap controlBtnWrap">
                                <a
                                    className="removeProfileButton"
                                    onClick={() => deleteUserCallBack(rowData)}
                        >
                                Remove
                                </a>
                                <button
                                    className="formBtnComProfile saveBtnComProfile"
                                    type="submit"
                                    disabled={isSaveBtnDisabled}
                                    >
                                    {SAVE_CHANGES_BUTTON}
                                </button>
                            </div>
                        </form>
                    </div>) : null }
            </div>

        );
    }
}


ProfileAccordionView.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    initialValues: PropTypes.object,
    userData: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    closeAccordionCallBack: PropTypes.func,
    deleteUserCallBack: PropTypes.func,
    rowData: PropTypes.object,
    futureName: PropTypes.string,
    isSaveBtnDisabled: PropTypes.bool,
};


const ProfileAccordionForm = reduxForm({
    form: 'ProfileAccordionFormlForm',
    validate, // a unique identifier for this form
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(ProfileAccordionView);

const mapStateToProps = state => ({
    isActionButtonEnabled: state.userManagement.isButtonEnabled ? state.userManagement.isButtonEnabled : false,
    initialValues: state.userManagement && state.userManagement.viewProfileDetail ? state.userManagement.viewProfileDetail : {},
    isSaveBtnDisabled: state.myProfile ? state.myProfile.isSaveBtnDisabled : false,
    isOpenDeletePopup: state.myProfile.isOpenDeletePopup ? state.myProfile.isOpenDeletePopup : false,

  });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(UserManagementActions, MyProfileAction), dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAccordionForm);
