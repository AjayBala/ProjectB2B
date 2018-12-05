import React, { Component, Fragment } from 'react';
import {
    ControlLabel, Alert, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import { Icon } from 'react-icons-kit';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Dropdown } from 'semantic-ui-react';
import { envelopeO } from 'react-icons-kit/fa/envelopeO';
import ColumnFormatter from '../ColumnFormatter/ColumnFormatter';
import * as MyProfileAction from '../../../../../../actions/MyProfileAction';
import AddUser from '../AddUser/AddUser';
import * as UserManagementActions from '../../../../../../actions/UserManagementAction';
import RowExpandinator from '../Expandinator/RowExpandinator';
import './UserListTable.scss';
import { convertToPhoneNumberFormat, getBussinesId, getLoggedInUserDetails } from '../../../../../../common/Utils';
import RemoveProfilePopUp from '../../../../../Model/DeleteProfilePopup';

export const validate = values => {
    const error = {};
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailPattern.test(values.emailId, 15);
    if (!values.emailId) {
        error.emailId = 'Required';
    } else if (!validEmail) {
        error.emailId = 'Please Enter a Valid Email';
    }

return error;
};

export const renderSelectField = ({
    placeholder, input, label, type, meta: { touched, error },
}) => (
    <div className="form-group labelActive">
        <div className="floatLabelWrap">
            <select
                defaultValue="Admin"
                {...input}
                placeholder={placeholder}
                type={type}
                className="inputTxtStyle" >
                <option>Contributor</option>
                <option>Admin</option>
            </select>
            <ControlLabel className="labelTxt">{label}</ControlLabel>
            {touched && ((error && (<span className="errorTxt">{error}</span>)))}
        </div>
    </div>
);

export const renderMultiSelectField = ({
    input, name, onChangeMethod, optionList, defaultValue, label, meta: { touched, error },
}) => (
    <div className="form-group labelActive">
        <div className="floatLabelWrap multiSelectDropdown">
            <input
                {...input}
                name={name}
                autoComplete="off"
                type="hidden"
                className="inputTxtStyle"
                />
            <Dropdown fluid multiple search selection options={optionList} defaultValue={defaultValue[0]} onChange={onChangeMethod} />
            <ControlLabel className="labelTxt">{label}</ControlLabel>
            {touched && ((error && (<span className="errorTxt">{error}</span>)))}
        </div>
    </div>
);

export class UserListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOrder: 'asc',
            sortedColumn: null,
            expandRowId: undefined,
            deleteUserData: ''
        };
    }

    componentWillMount = () => {
        const { actions } = this.props;
        window.addEventListener('scroll', this.handleScroll, false);
        actions.editRowEventId(0);
        actions.resetUserServerErrorAlert();
        actions.addUserEventEnable(false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    handleScroll = () => {
        const { scrolled, pageIndex, actions } = this.props;
        const { totalCount = 0 } = this.props;
        if (scrolled) {
            return;
         }
         const totalPages = Math.ceil(totalCount / 10);
        if (totalPages <= pageIndex) {
            return;
         }
        const lastRow = document.querySelector('tbody.customTable > tr:last-child');
        if (lastRow) {
            const lastRowOffset = lastRow.offsetTop;
            const pageOffset = document.body.scrollHeight;
            if (pageOffset > lastRowOffset) {
                actions.isScrollDown({ scrolled: true, pageIndex: pageIndex + 1 });
                this.loadMore();
            }
        }
      }

      loadMore = () => {
        const { pageIndex, size, LoadOnScroll } = this.props;
        LoadOnScroll({ pageIndex, size, onScroll: true, order: 'asc' });
    }

    viewMyProfile = row => {
        const { expandRowId } = this.state;
        const { actions } = this.props;
            this.setState({
                expandRowId: expandRowId === row.id ? undefined : row.id
            });
            if (expandRowId !== row.id) {
                actions.getUserListData(row);
            }
    }

    closeModelRemoveFile = () => {
        const { actions } = this.props;
        actions.accountManagementDeletePopupClose();
    }

    removeMyProfile = row => {
        if (row.signupStage === 0) {
            const { logedInUserValue = {}, actions } = this.props;
            const deleteUserPayload = {
                userId: row.id,
                bussinessId: logedInUserValue.companyInfo.id
            };
            this.closeModelRemoveFile();
            actions.userManagementdeleteInivtedUserRequest(deleteUserPayload);
    } else {
        const { logedInUserValue = {}, actions } = this.props;
        const { companyInfo: { id } } = logedInUserValue;
        if (id) {
            actions.accountManagementGetUserRoleRequest(id);
        }
    }

        this.setState({ deleteUserData: row });
    };

    deleteAccountConfirm = () => {
        const { logedInUserValue = {}, actions } = this.props;
        const { id } = logedInUserValue;
        const deleteUserPayload = {
            userId: id,
            bussinessId: logedInUserValue.companyInfo.id
        };
        this.closeModelRemoveFile();
        actions.userManagementDeleteUserRequest(deleteUserPayload);
    }

    sortedUsersByField = (sortBy, sortOrder, index) => {
        const { actions } = this.props;
        const { sortedColumn } = this.state;
        if (sortBy) {
            actions.isScrollDown({ scrolled: false, pageIndex: 1 });
            let payload = Object.assign({});
            if (sortedColumn !== sortBy) {
                payload = { pageIndex: 1, size: 10, onScroll: false, order: 'asc', orderByField: `${sortBy}` };
                this.setState({ sortOrder: 'asc', sortedColumn: sortBy });
            } else {
                const sort = (sortOrder === 'asc') ? 'desc' : 'asc';
                payload = { pageIndex: 1, size: 10, onScroll: false, order: `${sort}`, orderByField: `${sortBy}` };
                this.setState({ sortOrder: sort, sortedColumn: sortBy });
            }
            payload.businessId = getBussinesId();
            actions.getUsersList(payload);
        }

        const sortArrowIcon = document.getElementsByClassName('sortArrow');

        for (let i = 0; i < sortArrowIcon.length; i += 1) {
            sortArrowIcon[i].style.display = 'none';
        }
        const tableSortIcon = document.querySelector(`tr#tableHeadWrap th:nth-child(${index + 1}) .sortArrow`);
        if (tableSortIcon) {
            tableSortIcon.style.display = 'inline-block';
        }
    }

    getProfileImages = userInfo => {
        if (userInfo.profileImgResponse) {
            return <img className="userProfileImage" alt="profile" src={userInfo.profileImgResponse} height="40px" width="40px" />;
        }

        return <span className="userProfileImg">{userInfo.fullName && userInfo.fullName[0]}</span>;
    }

    editableField = row => {
        const { actions } = this.props;
        actions.editRowEventId(row.id);
        actions.setEditInitialValues(row);
    }

    groupListOnChange = (e, { value }) => {
        const { change } = this.props;
        if (_isEmpty(value)) {
            change('groups', null);
        } else {
            change('groups', value);
        }
    }

    handleDismiss = () => {
        const { actions } = this.props;
        actions.resetUserServerErrorAlert();
    }

    closeAccrodionProfile = () => {
        this.setState({
            expandRowId: undefined
        });
    }

    render() {
        const { tableCloumns, listedUserData, roleType, addUserEventEnable, editRowEventId, groupList, handleSubmit, isOpenDeletePopup, companyUsersProfile = {}, userManagementError } = this.props;
        const { sortOrder, expandRowId, deleteUserData } = this.state;

        const editUserSubmit = values => {
            const { groupList, actions } = this.props;
            const submitValues = {};
            submitValues.id = values.id;
            submitValues.emailId = values.emailId;
            submitValues.roleType = values.roleType;
            submitValues.companyInfo = {
                    id: getBussinesId()
                };
            const listItems = [];
            const groups = !_isEmpty(values.groups) ? values.groups.filter(c => c !== '') : [];
            _map(groups, obj => {
              const currentCategory = _find(groupList, { value: obj }, null);
              if (currentCategory && currentCategory.id) {
                listItems.push({ id: currentCategory.id, groupName: currentCategory.value });
              }
            });
            submitValues.group = listItems;
            actions.editUserInCompanyRequest(submitValues);
            actions.resetUserServerErrorAlert();
        };

        return (
            <Fragment>
                { isOpenDeletePopup
                ? (
                    <RemoveProfilePopUp
                        removeheader={1}
                        show={isOpenDeletePopup}
                        onHide={this.closeModelRemoveFile}
                        onDeleteConfirm={this.deleteAccountConfirm}
                        modeltype={companyUsersProfile.code}
                        isAdminUser={deleteUserData.roleType === 'admin'}
                    />
                    )
                : null}
                {userManagementError
                    && (
                        <Alert bsStyle="danger" className="alert-banner-error serverErrorBanner" onDismiss={this.handleDismiss}>
                            <p>{userManagementError}</p>
                        </Alert>
                    )
                }
                <table id="cutomizeTableWrap">
                    <thead>
                        <tr id="tableHeadWrap">
                            {_map(tableCloumns, (obj, index) => {
                            return (
                                <th
                                    key={index}
                                    onClick={() => this.sortedUsersByField(obj.dataField, sortOrder, index)}
                                >
                                    {obj.label}
                                    {obj.dataField && <span style={{ display: 'none' }} className={sortOrder === 'desc' ? 'sortArrow down' : 'sortArrow up'}><img alt="" /></span>}
                                </th>
                            );
                        }, this)}
                        </tr>
                    </thead>
                    <tbody className="customTable">
                        {
                        addUserEventEnable
                        && (
                            <AddUser />
                        )
                    }
                        {_map(listedUserData, (obj, index) => {
                        const groupNames = [];
                        const name = (obj.signupStage === 0) ? 'Pending' : obj.fullName;
                        const getLoggedInUserDetailsInfo = getLoggedInUserDetails();

                        return (
                            <tr className="userListRow" key={index}>
                                <td colSpan="6" >
                                    <form onSubmit={handleSubmit(editUserSubmit)}>
                                        <table>
                                            <tbody>
                                                <tr className={(name === 'Pending') ? 'invitedUsers' : undefined}>
                                                    <td>
                                                        {(obj.signupStage === 0)
                                                                ? (<Icon size={32} icon={envelopeO}/>)
                                                                : (<span className={obj.id === getLoggedInUserDetailsInfo.id ? 'profileImgWrap activeUser' : 'profileImgWrap'}>{this.getProfileImages(obj)}</span>)
                                                            }
                                                    </td>
                                                    <td>
                                                        {name}
                                                    </td>
                                                    <td>
                                                        {obj.emailId}
                                                    </td>
                                                    <td className="isEditableField">
                                                        {editRowEventId === obj.id
                                                            ? (
                                                                <Field
                                                                    name="roleType"
                                                                    type="text"
                                                                    label="Role"
                                                                    component={renderSelectField}
                                                                />
                                                            )
                                                            : [
                                                                (roleType === 'admin' && name !== 'Pending')
                                                                    ? <a key="334" onClick={() => this.editableField(obj)}>{obj.roleType}</a>
                                                                    : obj.roleType
                                                            ]
                                                        }
                                                    </td>
                                                    <td className="isEditableField">
                                                        {editRowEventId === obj.id
                                                            ? (
                                                                <Field
                                                                    name="groups"
                                                                    className="categorys"
                                                                    label="Group"
                                                                    component={renderMultiSelectField}
                                                                    optionList={groupList}
                                                                    defaultValue={_map(obj.group, obj => {
                                                                        groupNames.push(obj.groupName);

                                                                        return groupNames;
                                                                    })}
                                                                    onChangeMethod={this.groupListOnChange}
                                                                />
                                                            )
                                                            : [(
                                                                (obj.group.length) ? _map(obj.group, obj => {
                                                                    groupNames.push(obj.groupName);
                                                                })
                                                                : [(roleType === 'admin')
                                                                    ? <span key={`unassaignedAdmin-${index}`} className="emptyGroup" onClick={() => this.editableField(obj)}>{'Unassaigned'}</span>
                                                                    : <span key={`unassaigned-${index}`} className="emptyGroup">{'Unassaigned'}</span>
                                                                ]
                                                            ),
                                                            ((roleType === 'admin')
                                                                ? (
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip" key={groupNames}>{groupNames.toString()}</Tooltip>}>
                                                                        <a key="66" className="groupNameFormatter" onClick={() => this.editableField(obj)}>{groupNames.toString()}</a>
                                                                    </OverlayTrigger>)
                                                                : groupNames.toString()
                                                            )]
                                                        }
                                                    </td>
                                                    <td>
                                                        {editRowEventId === obj.id
                                                            ? (
                                                                <button type="submit" className="profileBtn AddBtn">Done</button>
                                                            )
                                                            : [(
                                                                (roleType === 'admin')
                                                                    ? (
                                                                        <ColumnFormatter
                                                                            roleType={roleType}
                                                                            rowData={obj}
                                                                            key="55"
                                                                            viewProfileCallBack={() => this.viewMyProfile(obj)}
                                                                            removeUserCallBack={() => this.removeMyProfile(obj)}/>
                                                                            )
                                                                    : convertToPhoneNumberFormat(obj.phoneNumber)
                                                            )]
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                    {expandRowId === obj.id ? (
                                        <table className="userProfileViewWrap">
                                            <tbody>
                                                <tr key={index} >
                                                    <td colSpan="6">
                                                        <RowExpandinator userData={obj} futureName={'userManagement'} closeAccordionCallBack={() => this.closeAccrodionProfile()} deleteUserCallBack={() => this.removeMyProfile(obj)}/>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : null}
                                </td>
                            </tr>
                        );
                    }, this)}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

UserListTable.propTypes = {
    listedUserData: PropTypes.array,
    isOpenDeletePopup: PropTypes.bool,
    roleType: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func),
    addUserEventEnable: PropTypes.bool,
    LoadOnScroll: PropTypes.func,
    totalCount: PropTypes.number,
    tableCloumns: PropTypes.array,
    groupList: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func,
    editRowEventId: PropTypes.number,
    companyUsersProfile: PropTypes.object,
    logedInUserValue: PropTypes.object,
    userManagementError: PropTypes.string,
    scrolled: PropTypes.bool,
    pageIndex: PropTypes.number,
    size: PropTypes.number
};

const EditUserForm = reduxForm({
    form: 'EditUserForm', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(UserListTable);

const mapStateToProps = state => ({
    isOpenDeletePopup: state.myProfile.isOpenDeletePopup ? state.myProfile.isOpenDeletePopup : false,
    addUserEventEnable: state.userManagement ? state.userManagement.addUserEventEnable : false,
    editRowEventId: state.userManagement ? state.userManagement.editRowEventId : 0,
    groupList: state.groupManagement ? state.groupManagement.groupList : {},
    initialValues: state.userManagement.userEditInitialValues ? state.userManagement.userEditInitialValues : {},
    companyUsersProfile: state.myProfile.userRoleResponse ? state.myProfile.userRoleResponse : {},
    logedInUserValue: (state.myProfile && state.myProfile.myProfileInitValues) ? state.myProfile.myProfileInitValues : undefined,
    pageIndex: state.userManagement.pageIndex ? state.userManagement.pageIndex : 1,
    size: state.userManagement.size ? state.userManagement.size : 10,
    scrolled: state.userManagement.scrolled ? state.userManagement.scrolled : false,
    sortedUserList: state.userManagement ? state.userManagement.sortedUserList : [],
    userManagementError: state.userManagement.error ? state.userManagement.error : '',
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        MyProfileAction, UserManagementActions
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
