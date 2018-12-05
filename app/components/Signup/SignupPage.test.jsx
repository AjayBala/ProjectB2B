import React from 'react';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import SignupPage from './SignupPage';


describe('<SignupPage/>', () => {
    const location = { pathname: '/signup/contactUs' };
    const component = shallow(<SignupPage location={location}/>);
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('should render the component items properly', () => {
        expect(component.contains(' Discover the one-stop shop that works for you. ')).to.exist;
    });
    it('should render the component items properly', () => {
        expect(component.contains(' Discover the one-stop shop that works for you. ')).to.exist;
    });
    it('should render the component items properly', () => {
        expect(component.find('.bgStyle')).to.have.lengthOf(1);
    });
    it('should render the component items properly , to check bnrFormOutWrap has been used twice', () => {
        expect(component.find('.bnrFormOutWrap')).to.have.lengthOf(1);
    });
    it('Should render the user-migration-confirmation component', () => {
        ['contactUs']
        .forEach(id => {
            const p = global.document.createElement('p');
            p.id = id;
            global.document.body.appendChild(p);
        });
        component.setProps({
            location: { pathname: '/signup/contactUs' },
        });
    });
    it('Should render the user-migration-confirmation component', () => {
        ['benefits']
        .forEach(id => {
            const p = global.document.createElement('p');
            p.id = id;
            global.document.body.appendChild(p);
        });
        component.setProps({
            location: { pathname: '/signup/benefits' },
        });
        component.instance().componentDidMount();
    });
    it('Should render the user-migration-confirmation component false case', () => {
        component.instance().componentWillUnmount();
    });
});
