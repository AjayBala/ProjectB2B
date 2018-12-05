import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { REG_SUCCESS_MESSAGE_FIRST_HALF, 
    CONTACT_US,
    CONTACT_US_INFO,
    CONCIERGE_EMAIL,
    CONCIERGE_PHONE,
    CONCIERGE_AVAILABILITY,
    OPRO_QUESTIONS_ANSWER,
    OPRO_TITLE,
    FREQUENT_ASKED_QUESTIONS,
    SHOP_NOW,
    QUESTION,
    ANSWER
 } from '../../common/Constants';
import './OprofessionalHomePage.scss';
import * as SignUpAction from '../../actions/SignUpAction';

export class OprofessionalHomePage extends Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.getSignUpDetails();
    }

    redirectToB2C = () => {
        const { signUpDetails } = this.props;

        if (signUpDetails.id !== '') {
            const b2curl = 'https://www.overstock.com/myaccount?cst_email=';
            const b2curlpassword = '&cst_password=';
            const b2curlloginparams = '&bvkey_myacckey=myacckey&myacckey=order_info&processlogin=true&loggingin=true&submit=true';
            const configUrl = `${b2curl}${signUpDetails.emailId}${b2curlpassword}${signUpDetails.password}${b2curlloginparams}`;
            axios.post(configUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                 }
            })
            .then(response => {
                window.location.href = configUrl;
                window.location.href = 'https://www.overstock.com/Office-Supplies/22/store.html';
            });
        }
    }

    render() {
        return (
            <div id="opro-home">
                <Row>
                    <div className="opro-image-wrap">
                        <img className="opro-image" src="https://ak1.ostkcdn.com/img/mxc/b2b/successful_signup.png" alt="oprofessionalImage"/>
                    </div>
                </Row>
                <div id="opro-reg-message">
                    <div className="insideContainerWrap">
                        <Row>
                            <Col sm={12} className="opro-header">
                                <h1>{OPRO_TITLE}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className="opro-message">
                                <p className="opro-mesg-first">
                                    {REG_SUCCESS_MESSAGE_FIRST_HALF}
                                </p>
                                <Row>
                                    <Col sm={12}>
                                        <button className="opro-btn-styles opro-shopNow-btn" type="button" onClick={this.redirectToB2C}>{SHOP_NOW}</button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className="opro-title">
                                <h1>{FREQUENT_ASKED_QUESTIONS}</h1>
                            </Col>
                            <Col sm={12} className="opro-QA">
                                {OPRO_QUESTIONS_ANSWER.map((obj, index) => (
                                    <div key={index} className="opro-qa-section">
                                        <div className="opro-section">{QUESTION}</div>
                                        <span>{obj.question}</span>
                                        <div className="opro-answer-section">
                                            <div className="opro-answer opro-section">{ANSWER}</div>
                                            <span>
                                                {obj.answer_0}
                                                {obj.multiLineAnswers
                                                && (
                                                <Fragment>
                                                    <br />
                                                    {obj.answer_1}
                                                    <br />
                                                    {obj.answer_2}
                                                    <br />
                                                    {obj.answer_3}
                                                    <br />
                                                </Fragment>
                                                )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </div>
                </div>
                <div id="contactUs" className="contactUs-styles">
                    <div className="insideContainerWrap">
                        <Row className="rowMargin">
                            <Col sm={12}>
                                <div className="contactUs-info">
                                    <img src="https://ak1.ostkcdn.com/img/mxc/b2b/overstock-logo.png" className="mainLogo" alt="HearderLogo"/>
                                    <p className="contactUs-txt">{CONTACT_US_INFO}</p>
                                </div>
                                <div className="contactUs-details">
                                    <h1>{CONTACT_US}</h1>
                                    <p>
                                        <i className="fa fa-envelope" />
                                        <span className="contactUs-email">{CONCIERGE_EMAIL}</span>
                                    </p>
                                    <p>
                                        <i className="fa fa-phone" />
                                        <span className="contactUs-phone">{CONCIERGE_PHONE}</span>
                                        <br/>
                                        <span className="contactUs-timeDate">{CONCIERGE_AVAILABILITY}</span>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

OprofessionalHomePage.propTypes = {
    actions: PropTypes.object,
    signUpDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignUpAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OprofessionalHomePage);
