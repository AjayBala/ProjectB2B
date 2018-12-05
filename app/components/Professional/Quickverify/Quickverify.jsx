import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './Quickverify.scss';
import _map from 'lodash/map';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';
import { connect } from 'react-redux';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { validateYear, validateMonth } from '../../../common/Utils';
import * as ProfessionalAction from '../../../actions/ProfessionalAction';
import { BACK, QUICK_VERIFY_TEXT, BUSINESS_CARD_INFO, CARD_INFO } from '../../../common/Constants';

export const validate = (values, props) => {
    const errors = {};
    const fields = ['nameOnCard', 'cardNumber', 'expirationMonth', 'expirationYear', 'cvv', 'address1', 'state', 'city', 'zip'];
    const enterFields = [];
    _map(fields, obj => {
        if (values[obj] && obj in values) {
            enterFields.push(obj);
        }
    });
    if (enterFields.length) {
        props.actions.nextToSkipForNow(true);
    } else {
        props.actions.nextToSkipForNow(false);
    }
    const validCardNumber = _includes(values.cardNumber, '****');
    if (!_isEmpty(enterFields)) {
        _map(fields, obj => {
            if (!values[obj]) {
                if (obj === 'cvv') {
                    if (validCardNumber) {
                        errors[obj] = '';
                    } else {
                        errors[obj] = 'Required';
                    }
                } else {
                    errors[obj] = 'Required';
                }
            } else if (obj === 'expirationYear') {
                const currentDate = new Date();
                const yearCount = currentDate.getFullYear();
                if (values[obj] < yearCount || values[obj] > (yearCount + 50)) {
                    errors[obj] = 'Invalid Year';
                }
            }
        });

        const yearError = validateYear(values);
        if (yearError) {
            errors.year = yearError;
        }

        const monthError = validateMonth(values);
        if (monthError) {
            errors.month = monthError;
        }
    }

    return errors;
};

export class QuickVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: props,
            serverErrorCheck: false,
        };
        this.formValues = [];
    }

    componentWillMount() {
        this.setState({ serverErrorCheck: true });
    }

    handleServerError = () => {
        this.setState({ serverErrorCheck: false });
    }

    render() {
        const { property, serverErrorCheck } = this.state;
        const { CardDetialError, NextToSkipForNow } = this.props;
        const { handleSubmit, submitting, previousPage } = property;

return (
    <Fragment>
        <div className="QuickVerifyWrap">
            <div className="get-verified-quicker"><b>{QUICK_VERIFY_TEXT}</b></div>
            <p className="business-credit-card">
                {BUSINESS_CARD_INFO}
                <b>{CARD_INFO}</b>
            </p>
            <div className="QuickVerifyOutterWrap">
                <form onSubmit={handleSubmit} className="form-style">
                    {(CardDetialError) && (!serverErrorCheck) ? <span className="server_error_text">{CardDetialError}</span> : null}
                    <Field
                        name="nameOnCard"
                        type="text"
                        label="Name on Card"
                        component={floatingLabelField} />
                    <Field
                        name="cardNumber"
                        type="text"
                        label="Card Number"
                        fieldID="cardNumberInfo"
                        component={floatingLabelField} />
                    <Row>
                        <Col lg={4} sm={4} className="expmonth" >
                            <Field
                                name="expirationMonth"
                                type="number"
                                label="MM"
                                component={floatingLabelField}/>
                        </Col>
                        <Col lg={4} sm={4} >
                            <Field
                                name="expirationYear"
                                type="number"
                                component={floatingLabelField}
                                label="YYYY" />
                        </Col>
                        <Col lg={4} sm={4}>
                            <Field
                                name="cvv"
                                type="password"
                                component={floatingLabelField}
                                label="CVV" />
                        </Col>
                    </Row>
                    <Field name="address1" type="text" component={floatingLabelField} label="Street Address" />
                    <Row>
                        <Col lg={3} sm={3}>
                            <Field
                                name="state"
                                type="text"
                                component={floatingLabelField}
                                label="State" />
                        </Col>
                        <Col lg={5} sm={5}>
                            <Field
                                name="city"
                                component={floatingLabelField}
                                label="City" />
                        </Col>
                        <Col lg={4} sm={4} className="zip">
                            <Field
                                name="zip"
                                type="number"
                                component={floatingLabelField}
                                label="Zip"/>
                        </Col>
                    </Row>
                    <div className="formBtnWrap">
                        <button className="formBtn back-btn" type="submit" onClick={previousPage} >{BACK}</button>
                        <button className="formBtn" type="submit" onClick={this.handleServerError} disabled={submitting}>{NextToSkipForNow ? 'Next' : 'Skip for Now'}</button>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
        );
    }
}

QuickVerify.propTypes = {
    CardDetialError: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func),
    NextToSkipForNow: PropTypes.bool
};

const quickVerify = reduxForm({
    form: 'ProfessionalCardForm',
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(QuickVerify);


const mapStateToProps = state => ({
    initialValues: state.professional && state.professional.cardDetails,
    CardDetialError: state.professional.cardDetialError ? state.professional.cardDetialError : '',
    NextToSkipForNow: state.professional ? state.professional.nextToSkipForNow : false,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(quickVerify);
