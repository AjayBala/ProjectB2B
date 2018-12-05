import React from 'react';
import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-icons-kit';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { userPlus } from 'react-icons-kit/feather/userPlus';
import { users } from 'react-icons-kit/fa/users';
import MembersTab from '../UserManagementDetails/MembersTab/Members';
import Group from '../UserManagementDetails/GroupManagement/GroupManagement';
import './UserManagementTabs.scss';
import { getRoleType } from '../../../../common/Utils';
import * as MyProfileAction from '../../../../actions/MyProfileAction';
import * as UserManagementAction from '../../../../actions/UserManagementAction';
import * as GroupManagementAction from '../../../../actions/GroupManagementAction';

export class UserManagementTabs extends React.Component {
    constructor() {
        super();
        this.state = {
            isGroupTabClicked: false
        };
    }

    triggerCreateGroup = () => {
        const { actions } = this.props;
        actions.triggerCreateGroup(true);
    }

    componentWillMount = () => {
        const { actions } = this.props;
        actions.addUserEventEnable(false);
    }

    render() {
        const { usersList } = this.props;
        const { isGroupTabClicked = false } = this.state;
        const roleType = getRoleType();
        const addUserEvent = () => {
            const { actions } = this.props;
            actions.addUserEventEnable(true);
        };

        return (
            <div className="DashboardRightSideWrap">
                <Tabs className="TabOutterWrap">
                    <TabList className="TabHeaderWrap">
                        <Tab className="TabHeaderTitle">
                            <span onClick={() => { this.setState({ isGroupTabClicked: false }); }}>
                                Members&nbsp;
                                {(!_isEmpty(usersList)) && <span className="currentCount">{usersList.totalUsers}</span>}
                            </span>
                        </Tab>
                        <Tab className="TabHeaderTitle">
                            <span onClick={() => { this.setState({ isGroupTabClicked: true }); }}>
                                Groups&nbsp;
                                {(!_isEmpty(usersList)) && <span className="currentCount">{usersList.totalGroups}</span>}
                            </span>
                        </Tab>
                        {roleType === 'admin'
                        ? (!isGroupTabClicked && (
                            <div disabled className="addIconWrap" onClick={addUserEvent}>
                                <Icon size={30} style={{ color: '#0093EE' }} icon={userPlus} />
                            </div>
                        )) : null}

                        {roleType === 'admin'
                        ? (isGroupTabClicked && (
                            <div disabled className="addIconWrap" onClick={this.triggerCreateGroup}>
                                <Icon size={30} style={{ color: '#0093EE' }} icon={users} />
                            </div>
                        )) : null}

                    </TabList>
                    <div className="TabContentWrap">
                        <TabPanel>
                            <MembersTab />
                        </TabPanel>
                        <TabPanel>
                            <Group />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        );
    }
}

UserManagementTabs.propTypes = {
    usersList: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
};

const mapStateToProps = state => ({
    userDetailsData: state.myProfile.signUpDetails ? state.myProfile.signUpDetails : [],
    usersList: state.userManagement.usersList ? state.userManagement.usersList : {}
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(MyProfileAction, UserManagementAction, GroupManagementAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementTabs);
