
import React from 'react';
import {
    Button, Row, Col, Modal
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './RemoveCompanyFile.scss';
import history from '../../../../../history';


class RemoveCompanyFile extends React.Component {
    render() {
        const { handleSubmit, onHide } = this.props;
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
        Removing This File Will Deactivate Your Company Account.
                </h1>
                <p className="deleteUserMidContentWrap contactConciergeHead"> If your document has expired and you need to upload a new one, please add the updated file before removing the existing file. </p>

                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Row>
                        <Col lg={6} sm={6}>
                            <div className="form-group formRowWrap ">
                                <Button
                                    onClick={onHide}
                                    type="button"
                                    className="deleteUserBut">
                     Cancel
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} sm={6}>
                            <div className="form-group formRowWrap">
                                <Button
                                    onClick={onHide}
                                    type="button"
                                    className="deleteUserButtonWrap">
                      Remove This File
                                </Button>
                            </div>
                            {/* <div className="forgotTxt">
                                    Already a member of Overstock Professional?
                                    <a onClick={() => history.push('/')}>
                                    Sign In
                                    </a>
                                </div> */}
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    </div>
            );
        }
    }

    RemoveCompanyFile.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'DeleteUserPopUpDetails',
})(RemoveCompanyFile);
