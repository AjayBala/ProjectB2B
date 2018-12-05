import React, { Component } from 'react';
import {
    ControlLabel
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import './multiSelectDropdown.scss';

/* eslint-disable react/prop-types */
export class MultiSelectShoppingPreference extends Component {
    render() {
        const { label, input, onChangeMethod, ShoppingPreferenceHasValue, emptyOrNot,
            optionList, meta: { touched, error } } = this.props;

        return (
            <div
                className={ShoppingPreferenceHasValue
                ? 'form-group labelActive' : 'form-group'}>
                <div
                    id="multiSelectDropdown"
                    className={!emptyOrNot && touched
            && error ? 'floatLabelWrap multiSelectDropdown errorBorder' : 'floatLabelWrap multiSelectDropdown'}>
                    <input
                        {...input}
                        autoComplete="off"
                        type="hidden"
                        className="inputTxtStyle"
                        />
                    <Dropdown fluid multiple search selection options={optionList} onChange={onChangeMethod} />
                    <ControlLabel className="labelTxt">{label}</ControlLabel>
                    {!emptyOrNot && touched && error && <span className="error_text">{error}</span>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    initialValues: state.professional && state.professional.companyInfoInitValues,
    ShoppingPreferenceHasValue: state.professional ? state.professional.shoppingPreferenceHasValue : false,
});

export default connect(mapStateToProps)(MultiSelectShoppingPreference);
