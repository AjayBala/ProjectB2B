import React, { Component } from 'react';
import {
    Row, Col,
} from 'react-bootstrap';
import '../../Style.scss';
import {
    CONTACT_US_INFO,
    CONCIERGE_EMAIL,
    CONTACT_US,
    CONCIERGE_PHONE,
    CONCIERGE_AVAILABILITY,
    OVERVIEW_MESG,
    OVERVIEW_PHONE_AVAILABILITY,
    DEDICATED_ACCOUNT_CONCIERGE_MESG,
    EXCL_PRO_SAVINGS,
    DEDICATED_ACCOUNT,
    EXCLU_PRO_MESSAGE,
    FREE_SHIPPING_MESSAGE,
    FREE_SHIPING,
    BUSINESS_POPUP_MESSAGE,
    SIGN_UP,
    EXCLUSIVE_DISCOUNT,
    MEMBER_ADVANTAGE
} from '../../common/Constants';
import './Overview.scss';
import history from '../../history';

class Overview extends Component {
    overviewSignupClick = () => history.push('/');

    render() {
        return (
            <div>
                <Row className="rowMargin">
                    <Col md={12}>
                        <div className="overViewBnrWrap">
                            <div className="overViewSignupBox">
                                <h2 className="overViewSignupTitle">{BUSINESS_POPUP_MESSAGE}</h2>
                                <a className="overViewSignupBtn" onClick={this.overviewSignupClick}>{SIGN_UP}</a>
                            </div>
                        </div>
                        <div className="exclusiveOutsideWrap">
                            <div className="insideContainerWrap">
                                <h1 className="exclusiveWrapTitle">{EXCLUSIVE_DISCOUNT}</h1>
                                <p className="exclusiveWrapText">
                                    {OVERVIEW_MESG}
                                    <br/>
                                    <a className="textBreak">{CONCIERGE_EMAIL}</a>
                                    <br/>
                                    {OVERVIEW_PHONE_AVAILABILITY}
                                </p>
                            </div>
                        </div>
                        <div className="membersAdvantageWrap">
                            <div className="insideContainerWrap">
                                <h1 className="membersAdvantageTitle">{MEMBER_ADVANTAGE}</h1>
                                <ul className="membersAdvantageList">
                                    <li>
                                        <img src="https://ak1.ostkcdn.com/img/mxc/b2b/Conceirge.png" alt="Dedicated Account Concierge" />
                                        <h5>{DEDICATED_ACCOUNT}</h5>
                                        <br />
                                        <p>{DEDICATED_ACCOUNT_CONCIERGE_MESG}</p>
                                    </li>
                                    <li>
                                        <img src="https://ak1.ostkcdn.com/img/mxc/b2b/savings.png" alt="Exclusive Savings" />
                                        <h5>{EXCL_PRO_SAVINGS}</h5>
                                        <br />
                                        <p>{EXCLU_PRO_MESSAGE}</p>
                                    </li>
                                    <li>
                                        <img src="https://ak1.ostkcdn.com/img/mxc/b2b/shop.png" alt="Free Shipping over $45" />
                                        <h5>{FREE_SHIPING}</h5>
                                        <br />
                                        <p>{FREE_SHIPPING_MESSAGE}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </Col>
                </Row>
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


export default Overview;
