import React, { Component } from 'react';
import {
   Nav, NavItem, Col
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import './HeaderComponent.scss';
import {
    Events, animateScroll as scroll, scrollSpy
} from 'react-scroll';
import { connect } from 'react-redux';
import history from '../../history';
import { CONTACT_US } from '../../common/Constants';


/* eslint-disable react/prop-types */
export class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount () {
        Events.scrollEvent.register('begin');

        Events.scrollEvent.register('end');
        scrollSpy.update();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isLoggedIn: nextProps.isSignedIn });
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    onLocalRedirect() {
        Cookies.remove('signUpDetails');
        history.push('/signup/benefits');
        const targetWrapper = document.getElementById('benefits');
        if (targetWrapper) {
            const idOffset = (targetWrapper.offsetTop) - 20;
            scroll.scrollTo(idOffset);
        }
    }

    scrollToBottom() {
        Cookies.remove('signUpDetails');
        history.push('/signup/contactUs');
        scroll.scrollToBottom();
    }

    render() {
        const { isLoggedIn } = this.state;
        const { pathname } = location;
        const pathnameSplit = pathname.split('/');

        return (
            <header>
                { pathnameSplit[1] === 'dashboard'
                ? (
                    <div id="dashboardHeaderWrap">
                        <div className="mainLogoWrap">
                            <a onClick={() => history.push('/')}>
                                <img src="https://ak1.ostkcdn.com/img/mxc/b2b/overstock-logo.png" className="mainLogo" alt="HearderLogo"/>
                            </a>
                        </div>
                        <div className="HeaderTopMenu">
                            <Nav className="HeaderIconWrap">
                                <NavItem onClick={() => history.push('/overview')}>
                                Overview
                                </NavItem>
                                <NavItem onClick={this.onLocalRedirect} alt="benefits">
                                Benefits
                                </NavItem>
                                <NavItem onClick={this.scrollToBottom} alt="contactUS">
                                    {CONTACT_US}
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
)
                : (
                    <div id="HeaderWrap">
                        <div className="mainLogoWrap">
                            <a onClick={() => history.push('/')}>
                                <img src="https://ak1.ostkcdn.com/img/mxc/b2b/overstock-logo.png" className="mainLogo" alt="HearderLogo"/>
                            </a>
                        </div>
                        <div className="HeaderTopMenu">
                            <Nav className="HeaderIconWrap">
                                <NavItem onClick={() => history.push('/overview')}>
                                Overview
                                </NavItem>
                                <NavItem onClick={this.onLocalRedirect} alt="benefits">
                                Benefits
                                </NavItem>
                                <NavItem onClick={this.scrollToBottom} alt="contactUS">
                                    {CONTACT_US}
                                </NavItem>
                            </Nav>
                        </div>
                        <Col>
                            <div className="active-logo-wrap">
                                { !isLoggedIn ? <img src="https://ak1.ostkcdn.com/img/mxc/b2b/icon_dashboard_inactive.png" className="active-logo" alt="HearderLogo"/> : <img src="https://ak1.ostkcdn.com/img/mxc/b2b/icon_dashboard_active.png" className="active-logo" alt="HearderLogo"/>}
                            </div>
                        </Col>
                    </div>
)
                }
            </header>
        );
    }
}

const mapStateToProps = state => ({
    isSignedIn: state.signIn.isSignedIn
});

export default connect(mapStateToProps)(HeaderComponent);
