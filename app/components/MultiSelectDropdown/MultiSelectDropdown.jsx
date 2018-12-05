import React, { Component } from 'react';
import {
    ControlLabel, Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { info } from 'react-icons-kit/feather/info';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import './multiSelectDropdown.scss';

/* eslint-disable react/prop-types */
export class MultiSelectDropdown extends Component {
    render() {
        const tooltip = infoText => (
            <Tooltip id="tooltip">
                <strong>{infoText}</strong>
            </Tooltip>
          );
        const { label, input, onChangeMethod, BusinessCategoryHasValue, SelectedBusinessCategory = [], isInfo, infoText, emptyOrNot,
            optionList, meta: { touched, error } } = this.props;

        return (
            <div
                className={(BusinessCategoryHasValue)
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
                    <Dropdown fluid multiple search selection options={optionList} value={SelectedBusinessCategory} onChange={onChangeMethod} />
                    <ControlLabel className="labelTxt">{label}</ControlLabel>
                    <span className="iconWarning">
                        <i className="fa fa-exclamation-triangle" aria-hidden="true" />
                    </span>
                    {!emptyOrNot && touched && error && <span className="error_text">{error}</span>}
                    <span className="iconInfo">
                        {isInfo && (
                        <OverlayTrigger className="iconInfo" placement="bottom" overlay={tooltip(infoText)}>
                            <Icon size={20} style={{ color: '#E9C46A' }} icon={info} />
                        </OverlayTrigger>
                        )}
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    initialValues: state.professional && state.professional.companyInfoInitValues,
    BusinessCategoryHasValue: state.professional ? state.professional.businessCategoryHasValue : false,
    SelectedBusinessCategory: state.professional ? state.professional.selectedBusinessCategory : [],
});

export default connect(mapStateToProps)(MultiSelectDropdown);
