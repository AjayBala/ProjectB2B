import React from 'react';
import {
    Col, Row, OverlayTrigger, Tooltip, Panel, Alert
    } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import _filter from 'lodash/filter';
import { Icon } from 'react-icons-kit';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import _isEmpty from 'lodash/isEmpty';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { threeHorizontal } from 'react-icons-kit/entypo/threeHorizontal';
import floatingLabelField from '../../../../FloatingLabel/FloatingLabel';
import DeleteGroupPopUpDetails from '../../../../Model/DeleteGroupPopUpDetails';
import ImageComponent from '../../../../ImageComponent';
import * as GroupManagementAction from '../../../../../actions/GroupManagementAction';
import * as UserManagementActions from '../../../../../actions/UserManagementAction';
import * as MyProfileAction from '../../../../../actions/MyProfileAction';
import './GroupManagement.scss';
import { getBussinesId, getUserID, getRoleType } from '../../../../../common/Utils';
import RowExpandinator from '../MembersTab/Expandinator/RowExpandinator';

class GroupManagement extends React.Component {
    constructor() {
        super();
        this.state = {
            openGroupIndex: [],
            deleteGroup: false,
            deleteGroupId: undefined,
            editGroupID: '',
            dragUser: undefined,
            expandRowId: undefined,
        };
        this.editingGroupId = '';
        this.isNewSubGroup = false;
        this.isRemoveUser = false;
    }

    componentWillMount = () => {
        const { actions } = this.props;
        const bussinessId = getBussinesId();
        if (bussinessId) {
            actions.getGroupsRequest(bussinessId);
        }
        actions.resetGroupServerErrorAlert();
        const roleType = getRoleType();
        this.isReadOnly = (roleType !== 'admin') ? true : false;
    }

    getBussinesName = () => {
        const signUpDetails = Cookies.get('signUserDetails') ? JSON.parse(Cookies.get('signUserDetails')) : {};
        const { companyInfo = {} } = signUpDetails;

        return companyInfo.name;
    }

    onOpenCollapse = grpIndex => {
        const { openGroupIndex } = this.state;
        const index = openGroupIndex.indexOf(grpIndex);
        if (index > -1) {
            openGroupIndex.splice(index, 1);
        } else {
            openGroupIndex.push(grpIndex);
        }
        this.editingGroupId = '';
        this.setState({ openGroupIndex });
    }

    isCurrentGrp = grpIndex => {
        const { openGroupIndex } = this.state;
        const index = openGroupIndex.indexOf(grpIndex);
        if (index > -1) {
            return true;
        }

        return false;
    }

    onDragStartRow = (event, user = {}, group, subGroup) => {
        const dragUserObj = Object.assign({});
        dragUserObj.id = user.id;
        dragUserObj.emailId = user.emailId;
        dragUserObj.roleType = user.roleType;
        dragUserObj.sourceGroup = this.construcObject(group, subGroup);
        this.setState({ dragUser: dragUserObj });
    }

    construcObject = (group, subGroup) => {
        const constructGroup = Object.assign({});
        if (subGroup) {
            constructGroup.id = subGroup.id;
            constructGroup.groupName = subGroup.groupName;
            constructGroup.parentGroupId = group.id;
            constructGroup.parentGroupName = group.groupName;
        } else {
            constructGroup.id = group.id;
            constructGroup.groupName = group.groupName;
        }

        return constructGroup;
    }

    onDropRow = (event, group, subGroup) => {
        event.stopPropagation();
        const { actions } = this.props;
        const { dragUser = {} } = this.state;
        const { sourceGroup = null } = dragUser;
        const targetGroup = this.construcObject(group, subGroup);
        if (sourceGroup.id !== targetGroup.id) {
            const dragUserPayload = Object.assign({}, dragUser);
            dragUserPayload.targetGroup = targetGroup;
            dragUserPayload.bussinessId = getBussinesId();
            actions.moveUserBetweenGroups(dragUserPayload);
        }
    }

    onDragOverRow = event => {
        event.preventDefault();
    }

    rmvUserFromGroup = (user, grpID) => {
        const { actions } = this.props;
        const payload = {};
        payload.businessId = getBussinesId();
        payload.id = grpID;
        payload.users = [user];
        actions.removeUserRequest(payload);
    }

    onGroupDelete = grpID => {
        this.setState({
            deleteGroup: true,
            deleteGroupId: grpID,
        });
    }


    singleDeleteConfirmation = groupId => {
        const { actions } = this.props;
        const payload = {};
        payload.businessId = getBussinesId();
        payload.groupId = groupId;
        actions.deleteGroupRequest(payload);
    };

    openEditGroup = groupDetails => {
        if (!this.isNewSubGroup) {
            const { change } = this.props;
            change('newGroupName', '');
            change('newGroupName', groupDetails.groupName);
            this.editingGroupId = groupDetails.id;
            this.setState({ editGroupID: groupDetails.id });
        }
    }

    editComplete = (groupDetails, e) => {
        const { change } = this.props;
        if (e.nativeEvent.relatedTarget === null) {
            this.editingGroupId = '';
            const { actions, newGroupName } = this.props;
            if (newGroupName && newGroupName !== groupDetails.groupName) {
                const updatedGroup = {
                    id: groupDetails.id,
                    groupName: newGroupName,
                    businessId: getBussinesId(),
                    businessName: this.getBussinesName()
                };
                actions.editGroupRequest(updatedGroup);
            } else {
                this.setState({
                    editGroupID: ''
                });
            }
        }
        change('newGroupName', '');
    };

    createSubGroup = subGroupDetails => {
        const { change } = this.props;
        change('newGroupName', '');
        this.editingGroupId = subGroupDetails.id;
        this.isNewSubGroup = true;
    }


    createSubGroupComplete = parentGroupDetails => {
        const { actions, newGroupName } = this.props;
        if (newGroupName) {
            const newSubGroupName = `${parentGroupDetails.groupName}|${newGroupName}`;
            const createGroupData = {
                groupName: newSubGroupName,
                businessId: getBussinesId(),
                parentGroup: {
                    id: parentGroupDetails.id,
                    groupName: parentGroupDetails.groupName
                },
                businessName: this.getBussinesName(),
            };
            actions.createGroupRequest(createGroupData);
        } else {
            this.setState({
                editGroupID: ''
            });
        }
        this.isNewSubGroup = false;
        this.editingGroupId = '';
    };

    createGroupComplete = () => {
        const { actions, newGroupName } = this.props;
        const createGroupData = {
            groupName: newGroupName,
            businessId: getBussinesId(),
            parentGroupId: null,
            parentGroupName: null
        };
        newGroupName ? actions.createGroupRequest(createGroupData) : null;
        actions.triggerCreateGroup(false);
    };

    viewProfileInfo = row => {
        const { expandRowId } = this.state;
        const { actions } = this.props;
            this.setState({
                expandRowId: expandRowId === row.id ? undefined : row.id
            });
            if (expandRowId !== row.id) {
                actions.getGroupManagementUserData(row);
            }
    }

    closeAccrodionProfile = () => {
        this.setState({
            expandRowId: undefined
        });
    }

    handleDismiss = () => {
        const { actions } = this.props;
        actions.resetGroupServerErrorAlert();
    }

    closeModelRemoveFile = () => {
        const { actions } = this.props;
        actions.accountManagementDeletePopupClose();
    }

    ClearGroup = () => {
        const { change, actions } = this.props;
        change('newGroupName', '');
        actions.setClearGroupName(false);

return null;
    }

    renderSubgroups = (group, childGroups, isSubGrpChild) => {
        const { editGroupID } = this.state;
        const tooltip = (
            <Tooltip id="tooltip">
              Remove from group
            </Tooltip>
          );

return childGroups.map((subGroup, sugGrpIndex) => {
    const { expandRowId } = this.state;

    return (
        <div
            className="groupWrap"
            onDragOver={event => this.onDragOverRow(event)}
            onDrop={event => this.onDropRow(event, subGroup, null)}
            key={`subGrp-${sugGrpIndex}`}>
            <div className="headingBlock">
                {(!(this.isNewSubGroup) && this.editingGroupId && this.editingGroupId === subGroup.id) ? (
                    <Row className="subGroupWrap">
                        <Col md={5}>
                            {/* <p className="parentGrpName">{`${group.groupName} |`}</p>&nbsp; */}
                            <span>
                                <form className="add-sub-group myProfileFormWrap">
                                    <Field
                                        name="newGroupName"
                                        type="text"
                                                    // eslint-disable-next-line react/jsx-no-bind
                                        onBlur={this.editComplete.bind(this, subGroup)}
                                        component={floatingLabelField}
                                        isAutofocus={true}
                                                />&nbsp;
                                </form>
                            </span>
                        </Col>
                        <Col md={7}>
                            <span className="actionsBlock">
                                <div className="UserManagementDeleteIcon">
                                    <input type="button" value="Remove" className="formBtn rmv" onClick={this.onGroupDelete.bind(this, subGroup.id)}/>
                                    <input type="button" onClick={this.createSubGroup.bind(this, subGroup)} value="Add Sub Group" className="formBtn subgrp"/>
                                </div>
                            </span>
                        </Col>
                    </Row>
                )
                : (
                    <div className="subHeaderName">
                        <span className="nameBlock">
                            {/* <p className="parentGrpName">{`${group.groupName} |`}</p> */}
                            {!isSubGrpChild ? (
                                <p>&nbsp;
                                    {subGroup.groupName}
                                </p>
                            ) : (
                                <p>&nbsp;
                                    {subGroup.groupName}
                                </p>
                            )}
                        </span>
                        {!this.isReadOnly && (
                            <span className="actionsBlock" onClick={this.openEditGroup.bind(this, subGroup)} style={{ width: 24, height: 24 }}>
                                <Icon size={'10%'} icon={threeHorizontal}/>
                            </span>
                        )}
                    </div>
                )}
                {this.isNewSubGroup && this.editingGroupId && this.editingGroupId === subGroup.id && (
                    <div className="subHeaderName">
                        <span className="nameBlock">
                            {/* <p className="parentGrpName">{`${group.groupName} |`}</p>&nbsp; */}
                            <p>&nbsp;
                                {`${subGroup.groupName} |`}&nbsp;
                            </p>
                            <form className="myProfileFormWrap">
                                <Field
                                    name="newGroupName"
                                    type="text"
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onBlur={this.createSubGroupComplete.bind(this, subGroup)}
                                    isAutofocus={true}
                                    label="New Sub Group"
                                    component={floatingLabelField}
                                                />&nbsp;
                            </form>
                        </span>
                        <span className="actionsBlock" style={{ width: 24, height: 24 }}>
                            <Icon size={'10%'} icon={threeHorizontal}/>
                        </span>
                    </div>
                )}
            </div>
            {subGroup.users && subGroup.users.map((user, subGrpUserIndex) => {
                const userId = getUserID();
                let userClassName;
                if (userId === user.id) {
                    userClassName = 'userCard loggedInUser';
                } else {
                    userClassName = 'userCard';
                }

                return (
                    <div className="">
                        <div
                            className={userClassName}
                            key={`subGrpUser-${subGrpUserIndex}`}
                        >
                            { editGroupID === subGroup.id ? (
                                <div className="grpUserDelete">

                                    <OverlayTrigger placement="top" overlay={tooltip}>
                                        <button type="button" className="RmvUserBtn">
                                            <i className="fa fa-minus-circle RmvUser" onClick={this.rmvUserFromGroup.bind(this, user, subGroup.id)} />
                                        </button>
                                    </OverlayTrigger>

                                </div>
                            ) : null }

                            {user.profileImgResponse
                            ? (
                                <ImageComponent
                                    imageSrc={user.profileImgResponse}
                                    height="24"
                                    width="24"
                                    containerStyles={{ width: '24px', flex: 1 }}
                                />
                            )
                            : (
                                <ImageComponent
                                    height="24px"
                                    width="24px"
                                    isNoImage={true}
                                    placeholder={user.emailId[0]}
                                    containerStyles={{ width: '24px', flex: 1 }}
                                />
                        ) }
                            <div className="userDetailFields">
                                {user.firstName ? user.firstName : null}
                                {user.lastName ? user.lastName : null}
                            </div>
                            <div className="userDetailFields">{user.emailId}</div>
                            <div className="userDetailFields">{user.roleType}</div>
                            {!this.isReadOnly ? (<div className="userDetailFields editables" onClick={() => this.viewProfileInfo(user)}>View Profile</div>) : null}
                            {!this.isReadOnly ? (
                                <div
                                    className="userDetailFields iconWrap"
                                    draggable
                                    onDragStart={event => this.onDragStartRow(event, user, group, subGroup)}
                                >
                                    <span className="dragIcon"/>
                                </div>
                            ) : null}
                        </div>
                        {expandRowId === user.id ? (
                            <div className="groupUserProfileViewWrap">
                                <RowExpandinator userData={user} futureName={'groupManagement'} closeAccordionCallBack={() => this.closeAccrodionProfile()} deleteUserCallBack={() => { this.rmvUserFromGroup(user, subGroup.id); }}/>
                            </div>
                        ) : null}
                    </div>
                );
            })}
            <hr/>
            { subGroup.userGroups ? this.renderSubgroups(subGroup, subGroup.userGroups, true) : null }
        </div>
                );
            });
        }

        render() {
            const { deleteGroup, editGroupID, expandRowId, deleteGroupId } = this.state;
            const { userGroupsResponse = [], isCreateGroupClicked, groupManagementError, usersList: { totalGroups = 0 }, clearGroupName } = this.props;
            const groupDeleteContent = {
                        title: 'Are you sure you want to remove Group?',

            };
            const tooltip = (
                <Tooltip id="tooltip">
                Remove from group
                </Tooltip>
            );

            return (
                <div>
                    { groupManagementError && (
                    <Alert bsStyle="danger" className="alert-banner-error serverErrorBanner" onDismiss={this.handleDismiss}>
                        <p>{groupManagementError}</p>
                    </Alert>
                                        )}
                    <div>
                        {clearGroupName && this.ClearGroup()}
                        {isCreateGroupClicked && (
                            <div>
                                <Row>
                                    <Col md={5}>
                                        <form className="create-group-box myProfileFormWrap">
                                            <Field
                                                name="newGroupName"
                                                type="text"
                                                className="create-group-box"
                                // eslint-disable-next-line react/jsx-no-bind
                                                onBlur={this.createGroupComplete.bind(this)}
                                                isAutofocus={true}
                                                label="New Group"
                                                component={floatingLabelField}
                                            />&nbsp;
                                        </form>
                                    </Col>
                                    <Col md={7} style={{ float: 'right' }}>
                                        <span className="actionsBlock" style={{ width: 24, height: 24 }}>
                                            <Icon style={{ float: 'right' }} size={'10%'} icon={threeHorizontal}/>
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>
                    { deleteGroup && (
                    <DeleteGroupPopUpDetails
                        show={deleteGroup}
                        resetpassword={1}
                        onHide={() => { this.setState({ deleteGroup: false }); }}
                        bodycontent={groupDeleteContent}
                        onConfirm={() => this.singleDeleteConfirmation(deleteGroupId)}
                    />
                    )}
                    {totalGroups === 0
                    ? (
                        <div className="noGroups">
                            <div className="headerName">Organization starts here</div>
                            <div className="userDetailFields">
                                <br/>
                                <br/>
                                <p>You can structure groups to best fit your organization, these can be teams, department, locations, etc.</p>
                                <p>Groups can be named and fully customized by you.</p>
                                <br/>
                                <br/>
                                <p>Structuring groups and subgroups keeps teams on track, improves order tracking, and benefits communications.</p>
                            </div>
                        </div>
                    )
                : null }
                    { !_isEmpty(userGroupsResponse) && userGroupsResponse.map((group, grpIndex) => {
                        return (
                            <div
                                className="groupWrap"
                                onDragOver={event => this.onDragOverRow(event)}
                                onDrop={event => this.onDropRow(event, group, null)}
                                key={grpIndex}>
                                <div className="headingBlock">
                                    {(!(this.isNewSubGroup) && this.editingGroupId && this.editingGroupId === group.id)
                                        ? (
                                            <span >
                                                <form className="edit-group-name myProfileFormWrap">
                                                    <div className="headerName">
                                                        <span className="edit-group-name nameBlock">
                                                            <Field
                                                                name="newGroupName"
                                                                type="text"
                                                                 // eslint-disable-next-line react/jsx-no-bind
                                                                onBlur={this.editComplete.bind(this, group)}
                                                                isAutofocus={true}
                                                                component={floatingLabelField}
                                                            />
                                                        </span>
                                                        <span className="actionsBlock">
                                                            <div className="UserManagementDeleteIcon">
                                                                <input type="button" value="Remove" className="formBtn rmv" onClick={this.onGroupDelete.bind(this, group.id)}/>
                                                                <input type="button" onClick={this.createSubGroup.bind(this, group)} value="Add Sub Group" className="formBtn subgrp"/>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </form>
                                            </span>
                                    ) : (
                                        <div className="headerName">

                                            <span className="nameBlock" onClick={this.onOpenCollapse.bind(this, grpIndex)}>{group.groupName}</span>
                                            {!this.isReadOnly && (
                                                <span className="actionsBlock" onClick={this.openEditGroup.bind(this, group)} style={{ width: 24, height: 24 }}>
                                                    <Icon size={'10%'} icon={threeHorizontal}/>
                                                </span>
                                            )}
                                        </div>
                                                                      )}
                                    {this.isNewSubGroup && this.editingGroupId && this.editingGroupId === group.id && (
                                        <Row className="subGroupWrap">
                                            <Col md={5}>
                                                <span className="parentGrpName">{`${group.groupName} |`}</span>&nbsp;
                                                <span>
                                                    <form className="add-sub-group myProfileFormWrap">
                                                        <Field
                                                            name="newGroupName"
                                                            type="text"
                                                             // eslint-disable-next-line react/jsx-no-bind
                                                            onBlur={this.createSubGroupComplete.bind(this, group)}
                                                            placeholder="New Sub Group"
                                                            isAutofocus={true}
                                                            component={floatingLabelField}
                                                        />&nbsp;
                                                    </form>
                                                </span>
                                            </Col>
                                            <Col md={7}>
                                                <span style={{ width: 24, height: 24, float: 'left' }}>
                                                    <Icon size={'10%'} icon={threeHorizontal}/>
                                                </span>
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                                <Panel id="collapsible-panel-example-1" onToggle={() => {}} expanded={this.isCurrentGrp(grpIndex)}>
                                    <Panel.Collapse>
                                        <Panel.Body>
                                            {group.users && group.users.map((user, userIndex) => {
                                            const userId = getUserID();
                                            let userClassName;
                                            if (userId === user.id) {
                                                userClassName = 'userCard loggedInUser';
                                            } else {
                                                userClassName = 'userCard';
                                            }

                                                return (
                                                    <div>
                                                        <div
                                                            className={userClassName}
                                                            key={`grpUser-${userIndex}`}
                                                        >

                                                            { editGroupID === group.id ? (
                                                                <div className="grpUserDelete">

                                                                    <OverlayTrigger placement="top" overlay={tooltip}>
                                                                        <button type="button" className="RmvUserBtn">
                                                                            <i className="fa fa-minus-circle RmvUser" onClick={this.rmvUserFromGroup.bind(this, user, group.id)} />
                                                                        </button>
                                                                    </OverlayTrigger>

                                                                </div>
                                                        ) : null }
                                                            {user.profileImgResponse
                                                            ? (
                                                                <ImageComponent
                                                                    imageSrc={user.profileImgResponse}
                                                                    height="44"
                                                                    width="44"
                                                                    containerStyles={{ width: '24px', flex: 1 }}
                                                                />
                                                            )
                                                            : (
                                                                <ImageComponent
                                                                    height="44px"
                                                                    width="44px"
                                                                    isNoImage={true}
                                                                    placeholder={user.emailId[0]}
                                                                    containerStyles={{ width: '24px', flex: 1 }}
                                                                />
                                                            ) }
                                                            <div className="userDetailFields">
                                                                {user.firstName ? user.firstName : null}
                                                                {user.lastName ? user.lastName : null}
                                                            </div>
                                                            <div className="userDetailFields">{user.emailId}</div>
                                                            <div className="userDetailFields">{user.roleType}</div>
                                                            {!this.isReadOnly ? (<div className="userDetailFields editables" onClick={() => this.viewProfileInfo(user)}>View Profile</div>) : null}
                                                            {!this.isReadOnly ? (
                                                                <div
                                                                    className="userDetailFields iconWrap"
                                                                    draggable
                                                                    onDragStart={event => this.onDragStartRow(event, user, group, null)}
                                                                >
                                                                    <span className="dragIcon"/>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        {expandRowId === user.id ? (
                                                            <div className="groupUserProfileViewWrap">
                                                                <RowExpandinator userData={user} futureName={'groupManagement'} closeAccordionCallBack={() => this.closeAccrodionProfile()} deleteUserCallBack={() => { this.rmvUserFromGroup(user, group.id); }}/>
                                                            </div>
                                                            ) : null}
                                                    </div>
                                                );
                                            })}
                                            <hr />
                                            { group.userGroups ? this.renderSubgroups(group, group.userGroups) : null }
                                        </Panel.Body>
                                    </Panel.Collapse>
                                </Panel>
                            </div>
                        );
                    }) }
                </div>
            );
        }
    }

GroupManagement.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    change: PropTypes.func.isRequired,
    newGroupName: PropTypes.string,
    userGroupsResponse: PropTypes.array,
    isCreateGroupClicked: PropTypes.bool,
    usersList: PropTypes.object,
    groupManagementError: PropTypes.string,
    clearGroupName: PropTypes.bool
};

const selector = formValueSelector('GroupManagementForm');

const mapStateToProps = state => ({
    userGroupsResponse: state.groupManagement && state.groupManagement.userGroups ? state.groupManagement.userGroups : [],
    isCreateGroupClicked: state.groupManagement.isCreateGroupClicked ? state.groupManagement.isCreateGroupClicked : false,
    newGroupName: selector(state, 'newGroupName'),
    logedInUserValue: (state.myProfile && state.myProfile.myProfileInitValues) ? state.myProfile.myProfileInitValues : undefined,
    initialValues: { newGroupName: null },
    companyUsersProfile: state.myProfile.userRoleResponse ? state.myProfile.userRoleResponse : {},
    groupManagementError: state.groupManagement.error ? state.groupManagement.error : '',
    usersList: state.userManagement.usersList ? state.userManagement.usersList : {},
    clearGroupName: state.groupManagement.clearGroupName ? state.groupManagement.clearGroupName : false
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        GroupManagementAction, UserManagementActions, MyProfileAction
    ), dispatch),
});
const GroupManagementForm = reduxForm({
    form: 'GroupManagementForm', // a unique identifier for this form
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(GroupManagement);

export default connect(mapStateToProps, mapDispatchToProps)(GroupManagementForm);
