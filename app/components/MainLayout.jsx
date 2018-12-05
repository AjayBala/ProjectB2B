import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/HeaderComponent';
import FooterComponent from './Footer/FooterComponent';

const MainLayout = ({ children }) => (
    <div className="mainOutterWrap">
        <Header />
        {children}
        <FooterComponent />
    </div>
);
MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
