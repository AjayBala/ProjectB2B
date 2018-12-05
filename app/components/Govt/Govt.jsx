import React, { Component } from 'react';
import Stepper from 'react-stepper-horizontal';
import { Row, Col, Grid } from 'react-bootstrap';
import './GovtStyle.scss';
import { bindActionCreators } from 'redux';
import Cookies from 'js-cookie';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GovtBusinessInfo from './GovtBusinessInfo/GovtBusinessInfo';
import ShoppingPreference from '../ShoppingPreference/ShoppingPreference';
import { SHOPPING_CATEGORIES } from '../../common/Constants';
import * as govtAction from '../../actions/GovtAction';
import * as professionalAction from '../../actions/ProfessionalAction';
import * as SignUpAction from '../../actions/SignUpAction';
import history from '../../history';

const stages = [{ title: 'Organization Information', id: 1 }, { title: 'Shopping Options', id: 2 }];
export class Govt extends Component {
    componentWillMount() {
        const { actions } = this.props;
        const hasCookies = Cookies.get('signUserDetails');
        if (!hasCookies) {
            history.push('./');
        } else {
            actions.getSignUpDetails();
            actions.getGovtCategorys();
        }
    }

  nextPage = values => {
    const { actions, currentStageIndex, signUpDetails, govtcategorysList } = this.props;
    const submitValue = {};
    submitValue.id = signUpDetails.id;
    submitValue.emailId = signUpDetails.emailId;
    submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;
    if (currentStageIndex === 1) {
        values.isProfessional = false;
        submitValue.firstName = values.firstName;
        submitValue.lastName = values.lastName;
        const listItems = [];
        const categorys = !_isEmpty(values.categorys) ? values.categorys.filter(c => c !== '') : [];
        _map(categorys, obj => {
            const currentCategory = _find(govtcategorysList, { value: obj }, null);
            if (currentCategory && currentCategory.value !== 'Other') {
                listItems.push({ id: currentCategory.id, categoryName: currentCategory.value });
            }
          });
        if (values.otherCategory) {
            listItems.push({ categoryName: values.otherCategory });
        }
        const domainName = submitValue.emailId.replace(/.*@/, '').split('.');
        values.categories = listItems;
        values.nameOfBusiness = `${domainName[0] || null}${values.agencyName}`;
        submitValue.companyInfo = values;
        submitValue.isSignupDone = false;
        submitValue.signupStage = currentStageIndex + 1;
        if (typeof values.uploadFile === 'object' && values.uploadFile) {
            actions.uploadFileCompanyInfo(submitValue);
        } else {
            if (values.documentProof && !_isEmpty(values.documentProof)) {
                const doucmentData = values.documentProof[0];
                submitValue.companyInfo.documentProof = [];
                const document = {
                    documentProofId: doucmentData.documentProofId,
                };
                submitValue.companyInfo.documentProof.push(document);
            }
            actions.createCompanyInfo(submitValue);
        }
    }
  }

  previousPage = () => {
    const { actions, currentStageIndex, signUpDetails: { id } } = this.props;
    if (id) {
        actions.getSignupCustomerById(id);
    }
    actions.getGovtCategorys();
    actions.decrementStage(currentStageIndex);
  }

  onSubmit = values => {
    const { actions, currentStageIndex, signUpDetails } = this.props;
    const submitValue = {};
    submitValue.id = signUpDetails.id;
    submitValue.emailId = signUpDetails.emailId;
    submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;
    submitValue.signupStage = currentStageIndex + 1;
    submitValue.isSignupDone = true;
    const shoppingPreferenceList = values.shoppingPreference;
    submitValue.shoppingPreference = { shoppingPreferenceList };
    actions.createShoppingPreferences(submitValue);
}

  render() {
    const { currentStageIndex, govtcategorysList } = this.props;
    const currentStage = _find(stages, { id: currentStageIndex });

return (
    <Grid fluid >
        <Row className="insideHeaderWrap" >
            <Col lg={12}>
                <div className="stepProgressWrap">
                    <Stepper
                        steps={stages}
                        activeStep={currentStage.id - 1}
                        activeColor="#000"
                        completeColor="#000"
                        circleFontColor="transparent" />
                </div>
            </Col>
        </Row>
        <div className="container">
            {currentStage.id === 1
                  && (
                      <GovtBusinessInfo
                          categorysList={govtcategorysList}
                          onSubmit={this.nextPage}/>
            )}
            {currentStage.id === 2
                    && (
                        <ShoppingPreference
                            shoppingCategoriesList={SHOPPING_CATEGORIES}
                            previousPage={this.previousPage}
                            onSubmit={this.onSubmit} />
            )}
        </div>
    </Grid>
      );
  }
}

Govt.propTypes = {
    actions: PropTypes.object,
    currentStageIndex: PropTypes.number,
    signUpDetails: PropTypes.object,
    govtcategorysList: PropTypes.array,
};

const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    currentStageIndex: state.professional.stageIndex ? state.professional.stageIndex : 1,
    govtcategorysList: state.govt.categorys ? state.govt.categorys : [],
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        govtAction, professionalAction, SignUpAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Govt);
