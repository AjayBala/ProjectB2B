import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import {
    Events, animateScroll as scroll, scrollSpy
} from 'react-scroll';
import Cookies from 'js-cookie';
import SignupForm from './SignupForm';
import './Signup.scss';
import SignIn from '../Signin/Signin';
import LandingPageNotification from './LandingPageNotification';
import { OPRO_TITLE, OPRO_LOGIN_TITLE, SIGN_UP, SIGN_IN } from '../../common/Constants';
import FooterDetail from '../FooterDetail/FooterDetail';

/* eslint-disable react/prop-types */
class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            isSignUp: false,
        };
    }

    componentWillMount () {
        Cookies.remove('signUserDetails');
        const isSignUp = Cookies.get('isSignUp');
        if (isSignUp) {
            this.setState({ isSignUp: true });
        }
    }

    componentDidMount () {
        Events.scrollEvent.register('begin');
        Events.scrollEvent.register('end');
        scrollSpy.update();
        const { location } = this.props;
        const { pathname } = location;
        if (pathname === '/signup/benefits') {
            const eleWrapID = document.getElementById('benefits');
            if (eleWrapID) {
                const idOffset = (eleWrapID.offsetTop) - 20;
                scroll.scrollTo(idOffset);
            }
        }
        if (pathname === '/signup/contactUs') {
            const eleWrapID = document.getElementById('contactUs');
            if (eleWrapID) {
                scroll.scrollToBottom();
            }
        }
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        const { isSignUp } = this.state;

        return (
            <Fragment>
                <div className="bgStyle">
                    <div className="b2b-custom-container">
                        <span className="bannerTitle_1">{OPRO_TITLE}</span>
                        <Row className="bannerEqualWrap">
                            <Col md={5} sm={12} className="equalWrapFormSection">
                                <div className="bnrFormOutWrap">
                                    <h1 className="signupTitle_1">{OPRO_LOGIN_TITLE}</h1>
                                    <Tabs
                                        defaultIndex={isSignUp ? 1 : 0}
                                        className="SignTabWrap">
                                        <TabList className="SignTabHeadWrap">
                                            <Tab className="SignTabHead">
                                                <span>{SIGN_UP}</span>
                                            </Tab>
                                            <Tab className="SignTabHead">
                                                <span>{SIGN_IN}</span>
                                            </Tab>
                                            {/* <Tab className="SignTabHead">
                                                <span> Forgot </span>
                                            </Tab> */}
                                        </TabList>
                                        <TabPanel>
                                            <SignupForm />
                                            {/* { pathname && pathname === '/signup' && <SignupForm />}
                                            { pathname && pathname === '/user-migration-confirmation' && <UserMigrationConfirmation />} */}
                                        </TabPanel>
                                        <TabPanel>
                                            <SignIn />
                                        </TabPanel>
                                        {/* <TabPanel>
                                            <ForgotPassword />
                                        </TabPanel> */}
                                    </Tabs>
                                </div>
                            </Col>
                            <Col md={2} sm={12}/>
                            <Col md={7} sm={12} className="notification-outter-wrap">
                                <LandingPageNotification/>
                            </Col>
                        </Row>
                    </div>
                </div>
                <FooterDetail />
            </Fragment>
            );
        }
}

export default SignUpPage;
