import React, { Component, Fragment } from 'react';
import { Router, Route } from 'react-router';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import history from './history';
import BtoCMigrationFrom from './components/BtoCMigrationFrom/BtoCMigrationFrom';
import SignUpPage from './components/Signup/SignupPage';
import HomePage from './components/HomePage/HomePage';
import ForgotPasswordEmailTemplate from './components/ForgotPassword/ForgotPasswordEmailTemplate/ForgotPasswordEmailTemplate';
import MainLayout from './components/MainLayout';
import Professional from './components/Professional/Professional';
import Govt from './components/Govt/Govt';
import ForgotPasswordPopUp from './components/ForgotPassword/ForgotPasswordPopUp/ForgotPasswordPopUp';
import SignInTwoStepAuthentication from './components/Signin/SigninTwoStepAuthentication/SigninTwoStepAuthentication';
import SignIn from './components/Signin/Signin';
import { SUCCESSFUL_ACCOUNT_CREATION, SUCCESSFUL_LOGIN } from './common/Constants';
import OprofessionalHomePage from './components/HomePage/OprofessionalHomePage';
import Overview from './components/Overview/Overview';
import DashboardScreen from './components/DashBoard/DashboardScreen';
// import SADashboardScreen from './components/SuperAdmin/SADashboardScreen';

export class App extends Component {
    render() {
    return (
        <MainLayout>
            <section id="mainWrap">
                <Router history={history}>
                    <Fragment>
                        <PrivateRoute exact path="/" component={<h1>B2B Home Page</h1>} />
                        <Route path="/opro" component={SignUpPage} />
                        <Route path="/signup" component={SignUpPage} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/btoc-migration-from" component={BtoCMigrationFrom} />
                        <Route path="/professional" component={Professional} />
                        <Route path="/gov" component={Govt} />
                        <Route path="/user-migration-confirmation" component={SignUpPage} />
                        <Route path="/home" render={routeProps => <HomePage {...routeProps} bodycontent={SUCCESSFUL_ACCOUNT_CREATION} />} />
                        <Route path="/email-template" component={ForgotPasswordEmailTemplate} />
                        <Route path="/reset-new-password" component={ForgotPasswordPopUp} />
                        <Route path="/signin-two-way-auth" component={ForgotPasswordPopUp} />
                        <Route path="/professionalHome" render={routeProps => <HomePage {...routeProps} bodycontent={SUCCESSFUL_LOGIN} />} />
                        <Route path="/signin-two-step-authentication" component={SignInTwoStepAuthentication} />
                        <Route path="/dashboard" component={DashboardScreen} />
                        {/* <Route path="/super-admin" component={SADashboardScreen} /> */}
                        <Route path="/oprofessionalHome" component={OprofessionalHomePage} />
                        <Route path="/overview" component={Overview} />
                    </Fragment>
                </Router>
            </section>
        </MainLayout>
    );
    }
}

export default App;
