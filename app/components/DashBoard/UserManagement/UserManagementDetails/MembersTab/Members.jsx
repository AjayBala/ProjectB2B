import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _sortBy from 'lodash/sortBy';
import * as GroupManagementAction from '../../../../../actions/GroupManagementAction';
import UserListTable from './UserListTable/UserListTable';
import { getBussinesId, getLoggedInUserDetails } from '../../../../../common/Utils';
import * as UserManagementActions from '../../../../../actions/UserManagementAction';

class MembersTab extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUserInfo: {}
    };
  }

  componentWillMount = () => {
    const { actions } = this.props;
    const loggedInUserInfo = getLoggedInUserDetails();
    const defaultPayload = { pageIndex: 1, size: 10, onScroll: false, order: 'asc', orderByField: 'firstName' };
    this.getUsersList(defaultPayload);
    if (loggedInUserInfo.roleType) {
      this.setState({
        loggedInUserInfo,
      });
    }
    actions.getDefaultLazyLoadParams();
  };

  getUsersList = params => {
    const { actions } = this.props;
    const payload = Object.assign({}, params);
    payload.businessId = getBussinesId();
    if (payload.businessId) {
      actions.getUsersList(payload);
      actions.getGroupsListRequest(payload.businessId);
    }
  }

  loadMoreRows = params => {
    this.getUsersList(params);
  }

  enableButtons = row => {
      const { actions } = this.props;
      actions.enableButtons();
      row.isEnabled = true;
    };

  render() {
    const { usersList } = this.props;
    const { totalUsers = 0 } = usersList;
    const { loggedInUserInfo } = this.state;
    const tableCloumns = [
      { dataField: '' },
      { dataField: 'firstName', label: 'Name' },
      { dataField: 'email', label: 'Email' },
      { dataField: 'roleType', label: 'Role' },
      { dataField: '', label: 'Group' }
    ];

    // if (usersList && usersList.usersInfo) {
    //   usersList.usersInfo = _sortBy(usersList.usersInfo, obj => {
    //     return obj.id !== loggedInUserInfo.id;
    //   });
    // }
    const columnToBeIncluded = (loggedInUserInfo.roleType === 'admin') ? { dataField: '', label: 'Actions' } : { dataField: 'phoneNumber', label: 'Phone' };
    tableCloumns.push(columnToBeIncluded);

    return (
        <UserListTable
            tableCloumns={tableCloumns}
            LoadOnScroll={this.loadMoreRows}
            totalCount={totalUsers}
            listedUserData={usersList && usersList.usersInfo}
            roleType={loggedInUserInfo.roleType}
        />
      );
    }
}


MembersTab.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  usersList: PropTypes.object
};

const mapStateToProps = state => ({
  isActionButtonEnabled: state.userManagement.isButtonEnabled ? state.userManagement.isButtonEnabled : false,
  usersList: state.userManagement.usersList ? state.userManagement.usersList : {},
  error: state.userManagement.error ? state.userManagement.error : ''
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign(UserManagementActions, GroupManagementAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersTab);
