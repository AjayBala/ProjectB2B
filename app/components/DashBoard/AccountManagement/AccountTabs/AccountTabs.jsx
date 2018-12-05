import React from 'react';
import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyProfile from '../AccountDetails/MyProfile/MyProfile';
import CompanyProfile from '../AccountDetails/CompanyProfile/CompanyProfile';
import Activity from '../AccountDetails/Activity/Activity';
import './AccountTabs.scss';
import * as MyProfileAction from '../../../../actions/MyProfileAction';

/* eslint-disable react/prop-types */
export class AccountTabs extends React.Component {
    render() {
    const { location: { pathname } } = this.props;

return (
    <div className="DashboardRightSideWrap">
        <Tabs className="TabOutterWrap">
            <TabList className="TabHeaderWrap">
                <Tab className="TabHeaderTitle">
                    <span>
                        My profile
                    </span>
                </Tab>
                <Tab className="TabHeaderTitle">
                    <span>
                        Company profile
                    </span>
                </Tab>
                <Tab className="TabHeaderTitle">
                    <span>
                        Activity
                    </span>
                </Tab>
            </TabList>
            <div className="TabContentWrap">
                <TabPanel>
                    { pathname && pathname === '/dashboard/accountabs' && <MyProfile />}
                </TabPanel>
                <TabPanel>
                    <CompanyProfile />
                </TabPanel>
                <TabPanel>
                    <Activity />
                </TabPanel>
            </div>
        </Tabs>
    </div>
    );
}
}

const mapStateToProps = state => ({
    userDetailsData: state.myProfile.signUpDetails ? state.myProfile.signUpDetails : []
    });

const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators(Object.assign(MyProfileAction), dispatch),
    });

export default connect(mapStateToProps, mapDispatchToProps)(AccountTabs);
