import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import './FooterComponent.scss';

const FooterComponent = () => (
    <footer>
        <div id="footerWrap">
            <Nav className="footerNav_1">
                <NavItem href="https://help.overstock.com/help/s/article/PRIVACY-AND-SECURITY-POLICY">
                    Privacy Policy
                </NavItem>
                <NavItem href="https://help.overstock.com/help/s/article/TERMS-AND-CONDITIONS">
                    Terms & Conditions
                </NavItem>
            </Nav>
            <div className="copyRightsText">
                © Copyright 1999-2018, Overstock.com
                <sup>®</sup>
            </div>
        </div>
    </footer>
);

export default FooterComponent;
