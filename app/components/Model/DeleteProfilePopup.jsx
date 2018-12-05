
import React from 'react';
import {
    Button, Row, Col, Modal
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './DeleteProfilePopup.scss';
import { Icon } from 'react-icons-kit';
import { x } from 'react-icons-kit/feather/x';
import { SINGLE_ADMIN_NO_CONTRIBUTER, SINGLE_ADMIN_SINGLE_CONTRIBUTER, DELETE_PROFILE_BUTTON, CANCEL_CHANGES_BUTTON, DELETE_HEADER_ACCOUNT, DELETE_HEADER_USER } from '../../common/Constants';
import * as MyProfileAction from '../../actions/MyProfileAction';

class DeleteProfilePopup extends React.Component {
    render() {
        const { onHide, modeltype, show, isAdminUser, isdeactivatecompanyaccount, onDeleteConfirm, removeheader } = this.props;
        const removeProfileProps = { onHide, modeltype, show, isdeactivatecompanyaccount, removeheader };

        return (
            <div className="deleteUserWrap signupFormWrap">
                <Modal {...removeProfileProps} id="newUserPopUp">
                    <Modal.Body className="popUpBodyStyles">
                        <button type="button" className="close" id="newUserPopUpClose" onClick={onHide} aria-label="Close">
                            <Icon size={25} style={{ color: '#ECF5FD' }} icon={x} />
                        </button>
                        {isAdminUser && !isdeactivatecompanyaccount && (
                        <div>
                            {removeheader ? (
                                <h3 className="deleteProfile">
                                    { DELETE_HEADER_USER }
                                </h3>) : (
                                    <h3 className="deleteProfile">
                                        { DELETE_HEADER_ACCOUNT }
                                    </h3>
                            )
                            }
                            <p className="deleteProfileMidContentWrap">On doing so,</p>
                            <div className="deleteProfileMidContentWrap">
                                { modeltype !== SINGLE_ADMIN_SINGLE_CONTRIBUTER && (
                                <div>
                                    <p>1) Your Overstock Pro account will be deactivated (Login : User/Pwd).</p>
                                    {modeltype !== SINGLE_ADMIN_NO_CONTRIBUTER ? <p>2) The company account won't be deactivated. You need to contact the conceirge for doing so.</p> : <p>3) The company account won't be deactivated. You will need to contact the conceirge if that is required.</p>}
                                    <p>You can reach out at overstockpro@overstock.com or call (800)273-6063. (Monday-Friday 9am-5pm MST)</p>
                                    <p>3) You will stop receiving communication emails from Overstock Pro (Our B2B website)</p>
                                    <p>4) You can still continue use your userid/email and password to make purchases on Overstock.com (Our B2C website)</p>
                                    <p>5) You can always change your email preferences on Overstock.com if you anticipate losing access to your current email</p>
                                </div>
                               )}
                                { modeltype === SINGLE_ADMIN_SINGLE_CONTRIBUTER && (
                                <div>
                                    <p>1) Xyz (Contributor) will get Admin priviliges.</p>
                                    <p>2) Your Overstock Pro account will be deactivated (Login : User/Pwd).</p>
                                    <p>3) The company account won't be deactivated. You will need to contact the conceirge if that is required.</p>
                                    <p>You can reach out at overstockpro@overstock.com or call (800)273-6063. (Monday-Friday 9am-5pm MST)</p>
                                    <p>4) You will stop receiving communication emails from Overstock Pro (Our B2B website)</p>
                                    <p>5) You can still continue use your userid/email and password to make purchases on Overstock.com (Our B2C website)</p>
                                    <p>6) You can always change your email preferences on Overstock.com if you anticipate losing access to your current email</p>
                                </div>
                               )}
                            </div>
                        </div>
)}
                        {!isAdminUser && !isdeactivatecompanyaccount && (
                        <div>
                            <h3 className="deleteProfile">
                                You cannot deactivate your Account. Please contact your company Admin to deactivate your account
                            </h3>
                        </div>
)}
                        {(!isdeactivatecompanyaccount && (
                        <form>
                            <Row className="delete-pop-up-btn-align">
                                {isAdminUser && (
                                <Col lg={6} sm={6}>
                                    <div className="form-group formdeleteProfileLeftBtn">
                                        <Button
                                            type="button"
                                            onClick={() => onDeleteConfirm()}
                                            className="deleteProfileButtonWrap">
                                            {DELETE_PROFILE_BUTTON}
                                        </Button>
                                    </div>
                                </Col>
    )}
                                <Col lg={6} sm={6}>
                                    <div className={`form-group ${isAdminUser ? 'formdeleteProfileRightBtn' : 'non-admin-cancel-btn'}`}>
                                        <Button
                                            type="button"
                                            className="deleteProfileButtonWrap"
                                            onClick={() => onHide()}>
                                            {CANCEL_CHANGES_BUTTON}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
))}
                        {(isdeactivatecompanyaccount
                        && (
                        <div>
                            <h3 className="deleteProfile">
                               Deactivate Company Account.
                            </h3>
                            <div className="deleteProfileMidContentWrap">
                                <p> You cannot deactivate your Company Account. Please contact conceirge to deactivate your company account </p>
                                <p>at overstockpro@overstock.com or</p>
                            </div>
                            <form>
                                <Row className="delete-pop-up-btn-align">
                                    <Col sm={6}>
                                        <div className="deleteProfileMidContentWrap">
                                            call concierge (800) 273-6063
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="form-group formdeleteProfileRightBtn">
                                            <Button
                                                onClick={onHide}
                                                type="button"
                                                className="deleteProfileButtonWrap">
                                                    Request Deactivation
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </div>
)
                    )}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

DeleteProfilePopup.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isdeactivatecompanyaccount: PropTypes.string
};

const mapStateToProps = state => ({
    userRoleData: state.myProfile.userRoleResponse
});

const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators(Object.assign(MyProfileAction), dispatch),
    });

const removeProfileForm = reduxForm({
    form: 'removeProfilePopUpDetails',
})(DeleteProfilePopup);

export default connect(mapStateToProps, mapDispatchToProps)(removeProfileForm);
