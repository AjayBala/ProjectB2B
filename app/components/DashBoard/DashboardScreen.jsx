import React from 'react';
import { Router, Route } from 'react-router';
import history from '../../history';
import UserManagementTab from './UserManagement/UserManagementTabs/UserManagementTab';
import AccountTabs from './AccountManagement/AccountTabs/AccountTabs';
import DashboardSideMenu from './DashboardSideMenu';
import './DashboardScreen.scss';

class DashboardScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: true
        };
    }

    menuClickHandler = () => {
        const { isOpen } = this.state;
        const toggledIsOpen = isOpen ? false : true;
        this.setState({
            isOpen: toggledIsOpen
        });
    }

    render() {
        const { isOpen } = this.state;

        return (
            <div className="DashboardOutterWrap" id={isOpen ? 'MenuActived' : ''}>
                <DashboardSideMenu sideMenuTrigger={this.menuClickHandler}/>
                <Router history={history}>
                    <React.Fragment>
                        <Route path="/dashboard/accountabs" component={AccountTabs} />
                        <Route path="/dashboard/user-management" component={UserManagementTab} />
                    </React.Fragment>
                </Router>
            </div>
        );
    }
}

export default DashboardScreen;
