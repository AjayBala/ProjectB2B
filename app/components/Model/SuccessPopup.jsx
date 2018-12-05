import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './SuccessPopup.scss';

const ModalPopup = props => {
    const {
        footercontent, bodycontent, onHide, successignup, resetpassword, deleteuser, documentsdisplay
    } = props;

return (
    <Modal {...props} className="popUpContentStyles">
        {bodycontent && (
        <Modal.Body className="popUpBodyStyles">
            {successignup && (
                <div className="successTextStyles successBox">
                    <img className="successImgStyle" src="https://ak1.ostkcdn.com/img/mxc/b2b/success_icon.png" alt="success_icon"/>
                    <div className="temp">{bodycontent}</div>
                </div>
            )}
            {resetpassword && (
            <div className="successTextStyles passwordBox">
                <div className="temp">{bodycontent}</div>
            </div>
                    )}
            {deleteuser && (
            <div className="successTextStyles successBox">
                <img className="closeImgStyle" src="https://ak1.ostkcdn.com/img/mxc/b2b/success_icon.png" alt="close_icon"/>
                <div className="temp">{bodycontent}</div>
            </div>
                    )}
            {documentsdisplay && (
            <div className="successTextStyles documentsBox">
                <div className="temp">{bodycontent}</div>
            </div>
            )}
        </Modal.Body>
            )}
        {footercontent && (
        <Modal.Footer>
            <Button onClick={onHide}>Cancel</Button>
            <Button>Confirm & Proceed</Button>
        </Modal.Footer>
            ) }
    </Modal>
    );
};
export default ModalPopup;
