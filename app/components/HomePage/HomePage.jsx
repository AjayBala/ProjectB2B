import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ModalPopup from '../Model/SuccessPopup';

const bgStyle = {
    width: '100%',
    float: 'left',
};

class HomePage extends Component {
    constructor() {
        super();
        this.state = ({ isModalAppear: true });
    }

    closeModel = () => {
        this.setState({ isModalAppear: false });
    }

    render() {
        const { isModalAppear } = this.state;
        const { bodycontent } = this.props;

return (
    <Fragment>
        <img alt="home background" style={bgStyle} onClick={this.closeModel} id="bgImg"/>
        <div>
            {isModalAppear
            && (
            <ModalPopup
                show={isModalAppear}
                successignup={1}
                bodycontent={bodycontent}
                onHide={this.closeModel} />
)}
        </div>
    </Fragment>
        );
    }
}

HomePage.propTypes = {
    bodycontent: PropTypes.string,
};

export default HomePage;
