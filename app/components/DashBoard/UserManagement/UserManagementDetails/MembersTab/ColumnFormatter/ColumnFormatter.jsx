import React, { Component, Fragment } from 'react';
import { Icon } from 'react-icons-kit';
import { threeHorizontal } from 'react-icons-kit/entypo/threeHorizontal';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as UserManagementActions from '../../../../../../actions/UserManagementAction';
import './ColumnFormatter.scss';
import * as MyProfileAction from '../../../../../../actions/MyProfileAction';

class ColumnFormatter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false
      };
      this.buttonRefs = null;
    }

    componentWillMount = () => {
        const { actions } = this.props;
        actions.getDefaultProfile();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    enableButtons = () => {
        this.setState({
            show: true
        });
    };

    setButtonRefs = e => {
        this.buttonRefs = e;
    }

    handleClickOutside = event => {
        if (this.buttonRefs && !this.buttonRefs.contains(event.target)) {
            this.setState({
                show: false
            });
        }
    };

    actionsCall = (type, rowData) => {
        const { viewProfileCallBack, removeUserCallBack } = this.props;
        this.setState({ show: false });
        if (type === 'remove') {
            removeUserCallBack(rowData);
        } else {
            viewProfileCallBack();
        }
    }

    render() {
        const { show } = this.state;
        const { rowData, roleType } = this.props;
        this.getUserData = rowData => {
            const { actions } = this.props;
            actions.getuserDetails(rowData);
        };

        return (
            <Fragment>
                {!show && <span className="DotsIconsWrap"><Icon size={32} icon={threeHorizontal} onClick={() => this.enableButtons()} /></span>}
                {(show && roleType === 'admin')
                && (
                    <div ref={this.setButtonRefs}>
                        <button type="button" className="removeSingleUser" onClick={this.actionsCall.bind(this, 'remove', rowData)}>Remove</button>
                        {(rowData.signupStage === 0)
                            ? (<button type="button" className="profileBtn">Re-send invite</button>)
                            : (<button type="button" className="profileBtn" onClick={this.actionsCall.bind(this, 'view')}>Profile</button>)
                        }

                    </div>
                )}
            </Fragment>
        );
    }
  }

  ColumnFormatter.propTypes = {
    removeUserCallBack: PropTypes.func,
    rowData: PropTypes.object,
    roleType: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func),
    viewProfileCallBack: PropTypes.func
};

  const mapStateToProps = state => ({
    initialValues: (state.myProfile && state.myProfile.myProfileInitValues) ? state.myProfile.myProfileInitValues : undefined,
    inviteUserResponseDelete: state.userManagement.inviteUserInfo ? state.userManagement.inviteUserInfo : {},
    companyUsersProfile: state.myProfile.userRoleResponse ? state.myProfile.userRoleResponse : {},
    isOpenDeletePopup: state.myProfile.isOpenDeletePopup ? state.myProfile.isOpenDeletePopup : false,
    isActionButtonEnabled: state.userManagement.isButtonEnabled ? state.userManagement.isButtonEnabled : false
  });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        UserManagementActions, MyProfileAction), dispatch),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(ColumnFormatter);
