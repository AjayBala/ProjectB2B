import React, { Component } from 'react';
import Stepper from 'react-stepper-horizontal';
import { Row, Col, Grid } from 'react-bootstrap';
import './Professional.scss';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { bindActionCreators } from 'redux';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';
import PropTypes from 'prop-types';
import ProfessionalInfo from './ProfessionalInfo/ProfessionalInfo';
import { onlyNums } from '../../common/Utils';
import QuickVerify from './Quickverify/Quickverify';
import { SHOPPING_CATEGORIES } from '../../common/Constants';
import ShoppingPreference from '../ShoppingPreference/ShoppingPreference';
import * as SignUpAction from '../../actions/SignUpAction';
import history from '../../history';
import * as ProfessionalAction from '../../actions/ProfessionalAction';

const stages = [{ title: 'Business Information', id: 1 }, { title: 'Quick Verify', id: 2 }, { title: 'Shopping Options', id: 3 }];
export class Professional extends Component {
    constructor() {
        super();
        this.state = {
            businessType: 'Corporation'
        };
    }

    componentWillMount() {
        const { actions } = this.props;
        const hasCookies = Cookies.get('signUserDetails');
        if (!hasCookies) {
            history.push('./');
        } else {
            actions.getSignUpDetails();
           actions.getBusinessCategorys();
        }
    }

    nextPage = values => {
        const { actions, currentStageIndex, signUpDetails, bussinessCategorysList } = this.props;
        const submitValue = {};
        submitValue.id = signUpDetails.id;
        submitValue.emailId = signUpDetails.emailId;
        submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;

        if (currentStageIndex === 1) {
            values.isProfessional = true;
            submitValue.firstName = values.firstName;
            submitValue.lastName = values.lastName;
            const listItems = [];
            const categorys = !_isEmpty(values.categorys) ? values.categorys.filter(c => c !== '') : [];
            _map(categorys, obj => {
              const currentCategory = _find(bussinessCategorysList, { value: obj }, null);
              if (currentCategory && currentCategory.value !== 'Other') {
                listItems.push({ id: currentCategory.id, categoryName: currentCategory.value });
              }
            });
            if (values.otherCategory) {
                listItems.push({ categoryName: values.otherCategory });
            }
            values.categories = listItems;
            submitValue.companyInfo = Object.assign({}, values);
            submitValue.companyInfo.ein = onlyNums(values.ein);
            submitValue.isSignupDone = false;
            submitValue.signupStage = 2;
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
        } else if (currentStageIndex === 2) {
            const creditCardDetail = {};
            const creditCardNumber = values.cardNumber;
            const validCardNumber = _includes(creditCardNumber, '****');
            if (creditCardNumber && !validCardNumber) {
                creditCardDetail.nameOnCard = values.nameOnCard;
                creditCardDetail.cardNumber = values.cardNumber;
                const expiryDateValue = `${values.expirationMonth}/${values.expirationYear}`;
                creditCardDetail.expiryDate = expiryDateValue;
                creditCardDetail.cvv = values.cvv;
                submitValue.creditCard = [creditCardDetail];
            } else {
                submitValue.creditCard = [];
            }
            const addressDetails = {};
            if (values.cardNumber && values.address1) {
                addressDetails.address1 = values.address1;
                addressDetails.state = values.state;
                addressDetails.city = values.city;
                addressDetails.zip = values.zip;
                addressDetails.isShippingAddress = false;
                addressDetails.isDefault = false;
                submitValue.address = [addressDetails];
            } else {
                submitValue.address = [];
            }

            submitValue.signupStage = 3;
            submitValue.isSignupDone = false;
            actions.createCardDetails(submitValue);
        }
    }

    previousPage = () => {
        const { actions, currentStageIndex, signUpDetails: { id } } = this.props;
        if (id) {
             actions.getSignupCustomerById(id);
        }
        if (currentStageIndex === 2) {
            actions.getBusinessCategorys();
        }
        actions.decrementStage(currentStageIndex);
    }

    onSubmit = values => {
        const { actions, signUpDetails } = this.props;
        const submitValue = {};
        submitValue.id = signUpDetails.id;
        submitValue.emailId = signUpDetails.emailId;
        submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;
        submitValue.signupStage = 4;
        submitValue.isSignupDone = true;
        const shoppingPreferenceList = values.shoppingPreference;
        submitValue.shoppingPreference = { shoppingPreferenceList };
        actions.createShoppingPreferences(submitValue);
    };

      businessTypeChange = type => {
          this.setState({ businessType: type });
      }

      render() {
            const { businessType } = this.state;
            const { currentStageIndex, bussinessCategorysList } = this.props;
            const currentStage = _find(stages, { id: currentStageIndex });

return (
    <Grid fluid >
        <Row className="insideHeaderWrap" >
            <Col lg={12}>
                <div className="stepProgressWrap">
                    <Stepper
                        className="step-progress"
                        steps={stages}
                        activeStep={currentStage.id - 1}
                        activeColor="#000"
                        completeColor="#000"
                        defaultTitleColor="#000"
                        completeTitleOpacity="1"
                        circleFontColor="transparent" />
                </div>
            </Col>
        </Row>
        <div>
            {currentStage.id === 1
            && (
                <ProfessionalInfo
                    businessCategorys={bussinessCategorysList}
                    onSubmit={this.nextPage}
                    onBusinessTypeChange={this.businessTypeChange}
                    businessType={businessType}/>
            )}
            {currentStage.id === 2
                         && (
                             <QuickVerify
                                 previousPage={this.previousPage}
                                 onSubmit={this.nextPage}/>
                         )}
            {currentStage.id === 3
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

Professional.propTypes = {
    actions: PropTypes.object,
    currentStageIndex: PropTypes.number,
    signUpDetails: PropTypes.object,
    bussinessCategorysList: PropTypes.array,
};

const mapStateToProps = state => ({
    bussinessCategorysList: state.professional.categorys ? state.professional.categorys : [],
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    companyInfoSuccess: state.professional.companyInfoSuccess ? state.professional.companyInfoSuccess : null,
    currentStageIndex: state.professional.stageIndex ? state.professional.stageIndex : 1,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction, SignUpAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Professional);
