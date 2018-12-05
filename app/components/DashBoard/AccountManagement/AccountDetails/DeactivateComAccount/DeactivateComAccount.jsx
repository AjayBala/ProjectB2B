
import React from 'react';
import {
    Button, Row, Col, Modal
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './DeactivateComAccount.scss';
import history from '../../../../history';


export class DeactivateComAccount extends React.Component {
    render() {
        const { onHide, handleSubmit } = this.props;
        const handleSubmitForm = () => {
            history.push('./Email Concierge');
        };


return (

    <div className="deleteUserWrap signupFormWrap">
        <Modal {...this.props} id="newUserPopUp">
            <Modal.Body className="popUpBodyStyles ">
                <button onClick={onHide} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <h1 className="deleteUserHeaderWrap contactConciergeHead">
        Please Contact Concierge to Deactivate your Company Account.
                </h1>
                <p className="deleteUserMidContentWrap contactConciergeHead"> In order to deactivate your company account you must contact our concierge service. You can reach our concierge office via email or phone call. You can reach the concierge team here: </p>

                <form onSubmit={handleSubmit(handleSubmitForm)}>

                    <Row>
                        <Col lg={12} sm={12}>
                            <div className="deactivatePhone deactivateCompanyAcc contactConciergeHead">
                1-800-123-4567
                            </div>
                        </Col>
                        <Col lg={12} sm={12}>
                            <div className="contactConciergeHead"> or </div>
                        </Col>
                        <Col lg={12} sm={12}>
                            <div className="form-group formRowWrap contactConciergeHead">
                                <Button
                                    onClick={onHide}
                                    type="button"
                                    className="deactivateComButtonWrap ">
                      Email Concierge
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </form>

            </Modal.Body>
        </Modal>
    </div>
            );
    }
}

DeactivateComAccount.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'DeleteUserPopUpDetails',
})(DeactivateComAccount);
