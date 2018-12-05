import React, { Component } from 'react';
import {
    ControlLabel, Col, Row
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import './ProfessionalInfo.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { required, einNumberFormater } from '../../../common/Utils';
import MultiSelectDropdown from '../../MultiSelectDropdown/MultiSelectDropdown';
import FileUploadComponent from '../../FileUpload/FileUpload';
import * as ProfessionalAction from '../../../actions/ProfessionalAction';
import { EIN_INFO, CATEGORY_INFO, NEXT, BUSINESS_SIGN_UP } from '../../../common/Constants';

export const validate = values => {
    const error = {};
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailPattern.test(values.email, 15);
    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }
    if (values.firstName && values.firstName.length > 15) {
        error.firstName = 'First Name must be less than or equal to 15 characters';
    }
    if (values.lastName && values.lastName.length > 15) {
        error.lastName = 'Last Name must be less than or equal to 15 characters';
    }

    if (values.otherCategory && (values.otherCategory === 'Other' || values.otherCategory === 'other')) {
        error.otherCategory = 'Category already exist';
    }

return error;
};

export const checkBoxField = ({
    label, type, input,
  }) => (
      <div className="form-group">
          <ControlLabel>
              <input
                  {...input}
                  type={type}
                  className="checkBoxStyle" />
              {label}
          </ControlLabel>
      </div>);

export class ProfessionalInfo extends Component {
    constructor() {
        super();
        this.state = {
            BusinessOtherCategory: false,
            SelectedBusinessCategory: [],
            serverErrorCheck: false,
        };
    }

    componentWillMount() {
        const { actions, signUpDetails: { id } } = this.props;
        if (id) {
             actions.getSignupCustomerById(id);
        }
        this.setState({
             serverErrorCheck: true,
        });
    }

    handleServerError = () => {
        this.setState({ serverErrorCheck: false });
    }

    BusinessCategoryOnChange = (e, { value }) => {
        const { change, actions } = this.props;
        if (_isEmpty(value)) {
            change('categorys', null);
            change('uploadFile', null);
            actions.businessCategoryHasValue(false);
            actions.selectedBusinessCategory([]);
        } else {
            change('categorys', value);
            actions.businessCategoryHasValue(true);
            actions.selectedBusinessCategory(value);
        }
        if ((value && value.indexOf('General Contractor') > -1) || (value && value.indexOf('Real Estate Agent') > -1)) {
            actions.businessCategoryHasUpload(true);
        } else {
            actions.businessCategoryHasUpload(false);
        }
        if (value && value.indexOf('Other') > -1) {
            this.setState({
                BusinessOtherCategory: true,
            });
        } else {
            change('otherCategory', null);
            this.setState({
                BusinessOtherCategory: false,
            });
        }
    };

    fileChange = event => {
        const fullPath = event.target.value;
        /* eslint-disable */
        const fileName = fullPath.replace(/^.*[\\\/]/, '');
        this.props.actions.fileChange(fileName)
    }

    render() {
        const {
            handleSubmit, submitting, businessCategorys, BusinessCategoryHasUpload,
            CompanyInfoError, selectedFile, initialValues
        } = this.props;
        const { BusinessOtherCategory, SelectedBusinessCategory, serverErrorCheck } = this.state;

        return (
            <div>
                <div className="formOutterWrap">
                    <Row>
                        <Col lg={12} sm={12}>
                            <p className="HeaderTxt_ComBusiness">{BUSINESS_SIGN_UP}</p>
                        </Col>
                    </Row>
                    <Row>
                        <form onSubmit={handleSubmit} className="Com-form-style">
                            <ul className="formListWrap">
                                <li>
                                    {(CompanyInfoError) && (!serverErrorCheck) ? <span className="server_error_text">{CompanyInfoError}</span> : null}
                                    <Field
                                        name="firstName"
                                        type="text"
                                        label="Your First Name"
                                        component={floatingLabelField}
                                        validate={required} />
                                </li>
                                <li>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        label="Your Last Name"
                                        component={floatingLabelField}
                                        validate={required} />
                                </li>
                                <li>
                                    <Field
                                        name="email"
                                        type="text"
                                        label="Email"
                                        component={floatingLabelField}
                                        validate={required} />
                                </li>
                                <li>
                                    <Field
                                        name="nameOfBusiness"
                                        type="text"
                                        label="Name of Business"
                                        component={floatingLabelField}
                                        validate={required} />
                                </li>
                                <li>
                                    <Field
                                        name="categorys"
                                        className="categorys"
                                        label="Business Category"
                                        validate={required}
                                        component={MultiSelectDropdown}
                                        isInfo={true}
                                        infoText={CATEGORY_INFO}
                                        optionList={businessCategorys}
                                        selectedValue={SelectedBusinessCategory}
                                        onChangeMethod={this.BusinessCategoryOnChange} 
                                        />
                                </li>
                                {BusinessOtherCategory
                                    ? (
                                        <li>
                                            <Field
                                                name="otherCategory"
                                                type="text"
                                                label="Other Category"
                                                component={floatingLabelField}
                                                validate={required} />
                                        </li>
                                        ) : ''}
                                <li>
                                    <Field
                                        name="ein"
                                        className="einError"
                                        type="text"
                                        isInfo={true}
                                        infoText={EIN_INFO}
                                        label="EIN"
                                        normalize={einNumberFormater}
                                        component={floatingLabelField}
                                        validate={required} />
                                </li>
                                <li>
                                    <Field
                                        name="webAddress"
                                        type="text"
                                        label="Web Address"
                                        component={floatingLabelField} />
                                </li>
                                <li className="check-box-info">
                                    <Field
                                        name="isNonProfitOrg"
                                        type="checkbox"
                                        component={checkBoxField}
                                        checked={initialValues && initialValues.isNonProfitOrg}
                                        label="I am a non-profit 501(c) organization"/>
                                    <Field
                                        name="isReseller"
                                        type="checkbox"
                                        component={checkBoxField}
                                        label="I am a reseller"/>
                                </li>
                            </ul>
                            { BusinessCategoryHasUpload &&  
                               <FileUploadComponent
                               fileChange={this.fileChange}
                               selectedFile={selectedFile} /> 
                            }
                            <div className="formBtnWrap">
                                <button
                                    className="formBtn"
                                    type="submit"
                                    onClick={this.handleServerError}
                                    disabled={submitting}>
                                    {NEXT}
                                </button>
                            </div>
                        </form>
                    </Row>
                </div>
            </div>
        );
    }
}

ProfessionalInfo.propTypes = {
    actions: PropTypes.object,
    signUpDetails: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    change: PropTypes.func,
    businessCategorys: PropTypes.array,
    CompanyInfoError: PropTypes.string,
};

const ProfessionalInfoForm = reduxForm({
    form: 'ProfessionalForm', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(ProfessionalInfo);

const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    initialValues: state.professional && state.professional.companyInfoInitValues,
    CompanyInfoError: state.professional.companyInfoError ? state.professional.companyInfoError : '',
    selectedFile: state.professional ? state.professional.selectedFile : '',
    BusinessCategoryHasUpload: state.professional ? state.professional.businessCategoryHasUpload : false,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalInfoForm);