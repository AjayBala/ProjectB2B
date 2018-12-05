import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';
import './ShoppingPreference.scss';
import { SHOPPING_CATEGORIES, SHOPPING_PREFFERENCE_TITLE, CLICK_FINISH, TERMS_AND_CONDITIONS, BACK } from '../../common/Constants';
import * as ProfessionalAction from '../../actions/ProfessionalAction';
import MultiSelectShoppingPreference from '../MultiSelectDropdown/MultiSelectShoppingPreference';

export class ShoppingPreference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShoppingPreferenceCategory: [],
        };
        this.searchValue;
    }

    componentWillMount() {
        const { actions, change } = this.props;
        change('shoppingPreference', []);
        actions.shoppingPreferenceHasValue(false);
    }


    shoppingCategoryOnChange = (e, { value }) => {
        const { change, actions } = this.props;
        if (_isEmpty(value)) {
            change('shoppingPreference', []);
            actions.shoppingPreferenceHasValue(false);
        } else {
            change('shoppingPreference', value);
            actions.shoppingPreferenceHasValue(true);
        }
    }

    render() {
        const { previousPage, handleSubmit, ShoppingPreferenceHasValue } = this.props;
        const { ShoppingPreferenceCategory } = this.state;

return (
    <div className="shopping-preference">
        <p className="formTextTitle">
            {SHOPPING_PREFFERENCE_TITLE}
        </p>
        <form className="form-style" onSubmit={handleSubmit}>
            <div>
                <Field
                    type="hidden"
                    name="shoppingPreference"
                    className="categorys"
                    component={MultiSelectShoppingPreference}
                    optionList={SHOPPING_CATEGORIES}
                    selectedValue={ShoppingPreferenceCategory}
                    onChangeMethod={this.shoppingCategoryOnChange}
                    label={ShoppingPreferenceHasValue ? 'Selected Items' : 'Suggested Products'}/>

                <div className="terms">
                    {CLICK_FINISH}
                    <a className="termsLink" href="https://help.overstock.com/help/s/article/TERMS-AND-CONDITIONS">
                        &nbsp;
                        {TERMS_AND_CONDITIONS}

                    </a>
                </div>
                <div className="formBtnWrap">
                    <button className="formBtn back-btn" type="submit" onClick={previousPage} >{BACK}</button>
                    <button className="formBtn signup-success-btn" type="submit">{ShoppingPreferenceHasValue ? 'Finish' : 'Skip for Now & Finish'}</button>
                </div>
            </div>
        </form>
    </div>
        );
    }
}

ShoppingPreference.propTypes = {
    previousPage: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    actions: PropTypes.object,
    ShoppingPreferenceHasValue: PropTypes.bool,
};

const ShoppingPreferenceForm = reduxForm({
    form: 'ShoppingPreference', // a unique identifier for this form
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(ShoppingPreference);

const mapStateToProps = state => ({
    initialValues: state.professional && state.professional.initValue,
    ShoppingPreferenceHasValue: state.professional ? state.professional.shoppingPreferenceHasValue : false,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingPreferenceForm);
