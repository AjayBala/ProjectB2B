import React from 'react';
import { Button } from 'react-bootstrap';
import './UserMigrationConfirmation.scss';
import history from '../../history';

const UserMigrationConfirmation = () => (
    <div className="formWrap shopYesNoWrap">
        <p className="shopEmailTxt">Do you already Shop on Overstock using your work email?</p>
        <Button
            type="button"
            className="NoButton"
            onClick={() => history.push('./signup')}>
No
        </Button>
        <Button
            type="button"
            className="YesButton"
            onClick={() => history.push('./btoc-migration-from')}>
Yes
        </Button>
        <p className="signInTxt">
Already a member of Overstock Professional?
            <a href="/">&nbsp;&nbsp;Sign In </a>
        </p>
    </div>
);
export default UserMigrationConfirmation;
