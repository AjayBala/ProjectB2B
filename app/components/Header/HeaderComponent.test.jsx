import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HeaderComponentForm, { HeaderComponent } from './HeaderComponent';

describe('Test case  for <HeaderComponent />', () => {
    let wrapper;
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            signIn: {
                isLoggedIn: true
            }
        });
        wrapper = mount(
            <Provider store={store}>
                <HeaderComponentForm />
            </Provider>,
        );
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should load the HeaderComponent component', () => {
        expect(wrapper).to.exist;
        expect(wrapper).to.have.length(1);
    });

    it('should load the HeaderComponent has Logo', () => {
        const Logo = wrapper.find('img');
        expect(Logo).to.exist;
    });

    it('should load the HeaderComponent a click', () => {
        const LogoLink = wrapper.find('a').at(0);
        LogoLink.simulate('click');
    });
    it('should load the HeaderComponent NavItem click', () => {
        const LogoLink = wrapper.find('NavItem').at(0);
        LogoLink.simulate('click');
    });
    it('should load onLocalRedirect click', () => {
        ['benefits', 'overview', 'contactUS']
        .forEach(id => {
            const NavItem = global.document.createElement('NavItem');
            NavItem.id = id;
            global.document.body.appendChild(NavItem);
        });
        const LogoLink = wrapper.find('NavItem').at(1);
        LogoLink.simulate('click');
    });
    it('Componentwillreceiveprops with reinitiate scenario', () => {
        const HeaderComponentWrapper = new HeaderComponent();
        HeaderComponentWrapper.props = {
            isSignedIn: true
        };
        const nextProps = {
            isSignedIn: true,
        };
        HeaderComponentWrapper.componentWillReceiveProps(nextProps);
    });
    it('should load scrollToBottom click', () => {
        const LogoLink = wrapper.find('NavItem').at(2);
        LogoLink.simulate('click');
    });


        it('should load the HeaderComponent component', () => {
            expect(wrapper).to.exist;
            expect(wrapper).to.have.length(1);
        });

        it('should load the HeaderComponent has Logo', () => {
            const Logo = wrapper.find('img');
            expect(Logo).to.exist;
        });

        it('should load the HeaderComponent a click', () => {
            const LogoLink = wrapper.find('a');
            // LogoLink.simulate('click');
            expect(LogoLink).to.exist;
        });
        // it('Password page API called and UI should render', () => {
        //     const wrapper = shallow(<DeactivateComAccount handleSubmit={handleSubmit} />);
        //     const instance = wrapper.instance();
        //     expect(instance).to.be.instanceOf(DeactivateComAccount);
        // });

        // it('checking FooterDetail scrool Events', () => {
        //     wrapper.instance().onLocalRedirect();
        // });
        // it('checking FooterDetail scrool Events', () => {
        //     wrapper.instance().scrollToBottom();
        // });
});
