import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';
import { Row, Col, ControlLabel } from 'react-bootstrap';
import './GovtBusinessInfo.scss';
import { connect } from 'react-redux';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { required } from '../../../common/Utils';
import MultiSelectDropdown from '../../MultiSelectDropdown/MultiSelectDropdown';
import * as ProfessionalAction from '../../../actions/ProfessionalAction';
import * as govtAction from '../../../actions/GovtAction';
import FileUploadComponent from '../../FileUpload/FileUpload';
import { ABOUT_ORGANIZATION, NEXT } from '../../../common/Constants';

export const validate = values => {
    const error = {};
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.email);
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);
    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }
    if (values.firstName && values.firstName.length > 15) {
        error.firstName = 'First Name must be less than or equals 15 characters';
    }
    if (values.lastName && values.lastName.length > 15) {
        error.lastName = 'Last Name must be less than or equals 15 characters';
    }

return error;
};

/* eslint-disable react/prop-types */
export const checkBoxField = ({
    label, type, input,
  }) => (
      <div className="form-group">
          <ControlLabel>
              <input
                  {...input}
                  type={type}
                  className="checkBoxStyle" />
              <span className="CheckboxText">{label}</span>
          </ControlLabel>
      </div>);

export const renderField = ({
    placeholder, input, label, type, meta: { touched, error },
}) => (
    <div className="form-group">
        <ControlLabel className="labelTxt">{label}</ControlLabel>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            className="form-control SqaureText" />
        {touched && ((error && (<span className="errorTxt">{error}</span>)))}
    </div>
);

export class GovtBusinessInfo extends Component {
    constructor() {
        super();
        this.state = {
            BusinessCategoryHasValue: false,
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
        this.setState({ serverErrorCheck: true });
    }

    handleServerError = () => {
        this.setState({ serverErrorCheck: false });
    }

    BusinessCategoryOnChange = (e, { value }) => {
        const { change, actions } = this.props;
        if (_isEmpty(value)) {
            change('categorys', []);
            actions.businessCategoryHasValue(false);
            actions.selectedBusinessCategory([]);
        } else {
            change('categorys', value);
            actions.businessCategoryHasValue(true);
            actions.selectedBusinessCategory(value);
        }
        if (value.indexOf('Contractor') > -1 || value.indexOf('Real Estate Agent') > -1) {
            actions.businessCategoryHasUpload(true);
        } else {
            actions.businessCategoryHasUpload(false);
        }
        if (value.indexOf('Other') > -1) {
            this.setState({
                BusinessOtherCategory: true,
            });
        } else {
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
        const { handleSubmit, submitting, categorysList, CompanyInfoError, selectedFile, BusinessCategoryHasUpload } = this.props;
        const { BusinessCategoryHasValue, BusinessOtherCategory, SelectedBusinessCategory, serverErrorCheck } = this.state;

        return (
            <div className="formOutterWrap">
                <Row>
                    <Col lg={12} sm={12}>
                        <p className="formTextTitle">{ABOUT_ORGANIZATION} </p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} sm={12} >
                        <form
                            onSubmit={handleSubmit}
                            className="Com-form-style">
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
                                        name="agencyName"
                                        type="text"
                                        label="Agency Name"
                                        component={floatingLabelField}
                                        validate={required} />
                                </li>
                                <li>
                                    <Field
                                        name="categorys"
                                        className="categorys"
                                        component={MultiSelectDropdown}
                                        optionList={categorysList}
                                        selectedValue={SelectedBusinessCategory}
                                        onChangeMethod={this.BusinessCategoryOnChange}
                                        label="Organization Category (optional)"/>
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
                                <li className="govt-check-box-info">
                                    <Field
                                        name="isNonProfitOrg"
                                        type="checkbox"
                                        component={checkBoxField}
                                        label="I am a non-profit 501(c) organization"/>
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
                    </Col>
                </Row>
            </div>
        );
    }
}

GovtBusinessInfo.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signUpDetails: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    change: PropTypes.func,
    categorysList: PropTypes.array,
    CompanyInfoError: PropTypes.string,
};

const GovtBusinessPage = reduxForm({
    form: 'Govt', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true
})(GovtBusinessInfo);


const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    initialValues: state.professional && state.professional.companyInfoInitValues,
    selectedFile: state.professional ? state.professional.selectedFile : '',
    CompanyInfoError: state.professional.companyInfoError ? state.professional.companyInfoError : '',
    BusinessCategoryHasUpload: state.professional ? state.professional.businessCategoryHasUpload : false,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction, govtAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GovtBusinessPage);
