import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import './Switch.scss';


class CustomSwitch extends Component {
    render() {
        const { checkedState, changeCallBack, type } = this.props;

        return (
            <div id="switchContainer">
                <Switch
                    onChange={() => { changeCallBack(type); }}
                    checked={checkedState}
                    className="react-switch-custom"
                    id="custom-switch"
                    onColor="#40B630"
                    checkedIcon={false}
                    uncheckedIcon={false}
                     />
            </div>
        );
    }
}

CustomSwitch.propTypes = {
    changeCallBack: PropTypes.func,
    checkedState: PropTypes.bool,
    type: PropTypes.string,
};

export default CustomSwitch;
