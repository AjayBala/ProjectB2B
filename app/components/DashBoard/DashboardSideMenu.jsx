import React from 'react';
import DashboardSideMenuList from './DashboardSideMenuList';
import './DashboardSideMenu.scss';


class DashboardSideMenu extends React.Component {
    render() {
      return (
          <div className="LeftSideMenuWrap">
              <div className="MenuBurgerIcon">
                  <p />
                  <p />
                  <p />
              </div>
              <DashboardSideMenuList />
          </div>
      );
    }
  }

export default DashboardSideMenu;
