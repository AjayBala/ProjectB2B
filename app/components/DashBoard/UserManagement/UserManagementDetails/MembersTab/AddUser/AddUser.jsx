import React, { Component } from 'react';
import {
    ControlLabel
    // Table, TableHead, TableRow, TableCell
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Field, reduxForm } from 'redux-form';
import { Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _map from 'lodash/map';
import * as UserManagementAction from '../../../../../../actions/UserManagementAction';
import './AddUser.scss';
import floatingLabelField from '../../../../../FloatingLabel/FloatingLabel';
// import MultiSelectDropdown from '../../../../MultiSelectDropdown/MultiSelectDropdown';

export const validate = values => {
    const error = {};
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.emailId, 15);
    // const validPwd = emailPasswordPattern.test(values.password);
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

// const multiOptions = [
//     { value: 'Unassigned', text: 'Unassigned' },
//     { value: 'HR', text: 'HR' },
//     { value: 'HR|SLC', text: 'HR|SLC' },
//     { value: 'Procurement', text: 'Procurement' },
//     { value: 'Product', text: 'Product' },
//     { value: 'Tech Team', text: 'Tech Team' }
// ];

export const renderMultiSelectField = ({
    input, name, onChangeMethod, optionList, label, meta: { touched, error },
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
            <Dropdown fluid multiple search selection options={optionList} defaultValue={['Unassigned']} onChange={onChangeMethod} />
            <ControlLabel className="labelTxt">{label}</ControlLabel>
            {touched && ((error && (<span className="errorTxt">{error}</span>)))}
        </div>
    </div>
);


export class AddUser extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentWillMount = () => {
        const { actions } = this.props;
        actions.resetUserServerErrorAlert();
    }

    groupListOnChange = (e, { value }) => {
        const { change } = this.props;
        if (_isEmpty(value)) {
            change('groups', null);
        } else {
            change('groups', value);
        }
    }

    render() {
        const cancelAddUser = () => {
            const { actions } = this.props;
            actions.addUserEventEnable(false);
        };

        const addUserSubmit = values => {
            const { groupList, actions } = this.props;
            const submitValues = {};
            submitValues.emailId = values.emailId;
            submitValues.roleType = values.roleType;
            const signUserDetails = Cookies.get('signUserDetails') ? JSON.parse(Cookies.get('signUserDetails')) : null;
            if (signUserDetails) {
                submitValues.invitedByCustomer = signUserDetails.id;
                submitValues.companyInfo = {
                    id: signUserDetails.companyInfo.id,
                };
            }
            const listItems = [];
            const groups = !_isEmpty(values.groups) ? values.groups.filter(c => c !== '') : [];
            _map(groups, obj => {
              const currentCategory = _find(groupList, { value: obj }, null);
              if (currentCategory && currentCategory.id) {
                listItems.push({ id: currentCategory.id, groupName: currentCategory.value });
              }
            });
            submitValues.group = listItems;
            actions.inviteUserIntoCompanyRequest(submitValues);
            actions.resetUserServerErrorAlert();
        };

        const { groupList, handleSubmit } = this.props;

        return (
            <tr className="addUserFormWrap">
                <td colSpan="6">
                    <form onSubmit={handleSubmit(addUserSubmit)}>
                        <table>
                            <tbody>
                                <tr>
                                    <td />
                                    <td />
                                    <td>
                                        <Field
                                            name="emailId"
                                            type="text"
                                            label="Email"
                                            component={floatingLabelField}
                                        />
                                    </td>
                                    <td>
                                        <Field
                                            name="roleType"
                                            type="text"
                                            label="Role"
                                            component={renderSelectField}
                                        />
                                    </td>
                                    <td>
                                        <Field
                                            name="groups"
                                            className="categorys"
                                            label="Group"
                                            component={renderMultiSelectField}
                                            optionList={groupList}
                                            onChangeMethod={this.groupListOnChange}
                                            />
                                    </td>
                                    <td>
                                        <button type="button" className="profileBtn CancelBtn" onClick={cancelAddUser}>Cancel</button>
                                        <button type="submit" className="profileBtn AddBtn">Add</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </td>
            </tr>
        );
    }
}

const AddUserForm = reduxForm({
    form: 'AddUserForm', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(AddUser);

AddUser.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.objectOf(PropTypes.func),
    groupList: PropTypes.array,
    change: PropTypes.func,
};

const mapStateToProps = state => ({
    groupList: state.groupManagement ? state.groupManagement.groupList : {},
    initialValues: { roleType: 'Contributor' }
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(UserManagementAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);
