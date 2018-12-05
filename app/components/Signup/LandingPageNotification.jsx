import React, { Component } from 'react';
import {
    Row, Col
} from 'react-bootstrap';
import { NOTIFICATION_MESSAGE_HEADER, NOTIFICATION_BENEFITS, NOTIFICATION_MESSAGE_BODY, CONCIERGE_EMAIL, CONCIERGE_PHONE_AVAILABILITY, OR } from '../../common/Constants';
import './LandingPageNotification.scss';

export class LandingPageNotification extends Component {
    render() {
        return (
            <div className="landing-notification">
                <Row>
                    <Col sm={12}>
                        <h1 className="landing-notif-header">
                            {NOTIFICATION_MESSAGE_HEADER}
                            <br />
                            <span>{NOTIFICATION_BENEFITS}</span>
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="landing-notif-message">
                        <p>
                            {NOTIFICATION_MESSAGE_BODY}
                            <br />
                            <a>{CONCIERGE_EMAIL}</a>
                            <br />
                            {OR}
                            <br />
                            {CONCIERGE_PHONE_AVAILABILITY}
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LandingPageNotification;
