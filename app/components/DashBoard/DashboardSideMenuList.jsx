import React from 'react';
import './DashboardSideMenu.scss';
import { Icon } from 'react-icons-kit';
import { user } from 'react-icons-kit/feather/user';
import { users } from 'react-icons-kit/feather/users';
import history from '../../history';


/* eslint-disable react/prop-types */
export class DashboardSideMenuList extends React.Component {
    render() {
const { pathname } = location;

return (
    <ul className="DashboardSideMenuListWrap">
        <li className={pathname && pathname === '/dashboard/accountabs' ? 'active' : null}>
            <a onClick={() => history.push('./accountabs')}>
                <Icon size={20} icon={user} />
                        Account
            </a>
        </li>
        <li className={pathname && pathname === '/dashboard/user-management' ? 'active' : null}>
            <a onClick={() => history.push('./user-management')}>
                <Icon size={20} icon={users} />
                        User Management
            </a>
        </li>
    </ul>
);
}
}

export default DashboardSideMenuList;
