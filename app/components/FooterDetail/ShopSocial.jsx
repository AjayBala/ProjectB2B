import React from 'react';
import {
    Row, Col,
    NavItem,
} from 'react-bootstrap';
import './ShopSocial.scss';

const ShopSocial = () => (
    <div className="footerBoxContainer">
        <div className="footerBottomBoxWrap">
            <div className="container">
                <Row>
                    <Col xs={12} md={6}>
                        <div id="footerDetails" className="footerContBox p-0">
                            <p className="mb-0">
                                © Copyright 1999-2018, Overstock.com®
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="footer-links clearfix">
                            <NavItem href="#" className="pull-left">
                                Privacy Policy
                            </NavItem>
                            <NavItem href="#" className="pull-left">
                                Terms & Conditions
                            </NavItem>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
);


export default ShopSocial;
