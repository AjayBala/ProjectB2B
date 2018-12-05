import React from 'react';
import {
    Button, Row, Col, Modal
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './DeleteGroupPopUp.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupManagementAction from '../../actions/GroupManagementAction';

class DeleteGroupPopUpDetails extends React.Component {
    confirm = () => {
        const { onConfirm, onHide } = this.props;
        onConfirm();
        onHide();
    }

    render() {
        const { handleSubmit, onHide, bodycontent, multipleUserDetails, resetpassword, show } = this.props;
        const removeGroupProps = { onHide, bodycontent, resetpassword, show };
        const handleSubmitForm = () => {
        };

        return (
            <Modal {...removeGroupProps} id="deleUserPopup" className="remove-group-popup">
                <Modal.Body>
                    <div className="deleteUserWrap signupFormWrap">
                        <Col sm={12} className="deleteBtnWrap">
                            <button type="button" className="close" id="deleteUserPopUpClose" onClick={onHide} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Col>
                        <h1 className="deleteUserHeaderWrap">
                            {bodycontent.title}
                        </h1>
                        <p className="deleteUserMidContentWrap">
                            {bodycontent.content}
                        </p>
                        {multipleUserDetails && multipleUserDetails.map(obj => {
                            return (
                                <Row>
                                    <Col className="userNameStyles" md={12}>{obj.name}</Col>
                                    <Col className="userEmailStyles" md={12}>{obj.email}</Col>
                                </Row>
                            );
                        })}

                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <Row>
                                <Col lg={6} sm={12}>
                                    <div className="form-group formRowWrap">
                                        <Button
                                            type="submit"
                                            onClick={() => this.confirm()}
                                            className="deleteUserButtonWrap rmvBtn">
                                            Remove Group
                                        </Button>
                                    </div>
                                </Col>
                                <Col lg={6} sm={12}>
                                    <div className="form-group formRowWrap">
                                        <Button
                                            type="submit"
                                            className="deleteUserButtonWrap cancelBtn"
                                            onClick={() => onHide()}>
                                            Cancel
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

DeleteGroupPopUpDetails.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onHide: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(GroupManagementAction), dispatch),
});

const DeleteGroupPopUpForm = reduxForm({
    form: 'DeleteUserPopUpDetails',
})(DeleteGroupPopUpDetails);

export default connect(null, mapDispatchToProps)(DeleteGroupPopUpForm);
