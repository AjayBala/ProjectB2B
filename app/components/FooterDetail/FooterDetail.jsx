import React, { Component } from 'react';
import './FooterDetail.scss';
import {
    Row, Col
} from 'react-bootstrap';

import {
    Events, animateScroll as scroll, scrollSpy
} from 'react-scroll';
import '../../Style.scss';
import {
    GOV_BUYER_FIRST_TEXT,
    // PROFESSIONAL_BENEFITS,
    DESIGNER_BENEFITS,
    CORPORATE_BENEFITS,
    SMALL_BUSINESS,
    GOV_BUYER_SECOND_TEXT,
    CONTACT_US_INFO,
    CONCIERGE_EMAIL,
    CONTACT_US,
    PRO_BENEFITS_SERVICE,
    EXCL_PRO_SAVINGS,
    DEDICATED_ACCOUNT,
    FREE_SHIPING,
    DESIG_BENEFITS,
    SIGN_UP,
    SOLUT_FOR_GOV_BUYERS,
    COMPET_PRICING,
    CONV_PAYEMENT_OPTION,
    EASY_ACC_MGMT,
    SIMPLE_APPROV_PROCESS,
    BUSIN_ANALYTICS,
    CORP_BENEFITS,
    SMALL_BUSIN,
    CONCIERGE_PHONE,
    CONCIERGE_AVAILABILITY
} from '../../common/Constants';

class FooterDetail extends Component {
    componentDidMount () {
        Events.scrollEvent.register('begin');

        Events.scrollEvent.register('end');
        scrollSpy.update();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    scrollToSection(evt) {
        let targetWrapper = '';
        if (evt.target.alt) {
            targetWrapper = document.getElementById(evt.target.alt);
        } else {
            targetWrapper = document.getElementById(evt.target.title);
        }

        const targetWrapperOffsetTop = targetWrapper.offsetTop;
        scroll.scrollTo(targetWrapperOffsetTop);
    }

    render() {
        return (
            <div className="mainContentWrap">
                <div className="b2b-custom-container">
                    <section className="iconFullWrap">
                        <Row>
                            <Col sm={6} md={2}>
                                <div className="iconBoxWrap">
                                    <div className="boxOutsideWrap left">
                                        <img className="iconHeight" src="https://ak1.ostkcdn.com/img/mxc/b2b/designer-icon@1.5x.svg" onClick={this.scrollToSection} alt="designer" />
                                        <span className="icon_text_styles" onClick={this.scrollToSection} title="designer">Designers</span>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <div className="iconBoxWrap">
                                    <div className="boxOutsideWrap">
                                        <img className="iconHeight" src="https://ak1.ostkcdn.com/img/mxc/b2b/white-house_icon@1.5x.svg" onClick={this.scrollToSection} alt="government" />
                                        <span className="icon_text_styles" onClick={this.scrollToSection} title="government">Government</span>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <div className="iconBoxWrap">
                                    <div className="boxOutsideWrap">
                                        <img className="iconHeight" src="https://ak1.ostkcdn.com/img/mxc/b2b/globe-icon@1.5x.svg" onClick={this.scrollToSection} alt="corporate" />
                                        <span className="icon_text_styles" onClick={this.scrollToSection} title="corporate">Corporate</span>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} md={2}>
                                <div className="iconBoxWrap">
                                    <div className="boxOutsideWrap right">
                                        <img className="iconHeight" src="https://ak1.ostkcdn.com/img/mxc/b2b/chart-pie-36-icon@1.5x.svg" onClick={this.scrollToSection} alt="smallBusiness" />
                                        <span className="icon_text_styles" onClick={this.scrollToSection} title="smallBusiness">Small Business</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </section>
                    {/* <Row> //Commented as per Josh's request for Milestone1 Release
                        <Col sm={12} md={6}>
                            <div className="specialBuy">
                                <h1 className="titleBox_1">
                                    FEATURED BUY OF THE WEEK
                                    <span>Free Shipping</span>
                                </h1>
                                <a href="/signup" className="linkStyle_1">
                                    Shop Now
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                </a>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className="specialBuy">
                                <h1 className="titleBox_1">
                                    DISCOUNTS DEALS
                                    <span>Free Shipping</span>
                                </h1>
                                <a href="/signup" className="linkStyle_1">
                                    Shop Now
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                </a>
                            </div>
                        </Col>
                    </Row> */}
                    <section className="ProfBenefitsBase" id="benefits">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1">{PRO_BENEFITS_SERVICE}</h3>
                            </Col>
                        </Row>
                        <Row className="ProfBenefitIconWrap">
                            <Col sm={12} md={4} className="box1">
                                <div className="benefitBoxWrap">
                                    <img className="benefitsBoxIcon" src="https://ak1.ostkcdn.com/img/mxc/b2b/time&mony.png" alt="Exclusive Pro Savings"/>
                                    <h4>{EXCL_PRO_SAVINGS}</h4>
                                </div>
                            </Col>
                            <Col sm={12} md={4} className="box2">
                                <div className="benefitBoxWrap">
                                    <img className="benefitsBoxIcon" src="https://ak1.ostkcdn.com/img/mxc/b2b/concierge.png" alt="Dedicated Account Concierge"/>
                                    <h4>{DEDICATED_ACCOUNT}</h4>
                                </div>
                            </Col>
                            <Col sm={12} md={4} className="box3">
                                <div className="benefitBoxWrap">
                                    <img className="benefitsBoxIcon" src="https://ak1.ostkcdn.com/img/mxc/b2b/dolly.png" alt="Free Shipping over $45"/>
                                    <h4>{FREE_SHIPING}</h4>
                                </div>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="designer">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1">{DESIG_BENEFITS}</h3>
                                <p className="paragraph_Txt">{DESIGNER_BENEFITS}</p>
                            </Col>
                            <div className="b2b-custom-container">
                                <Row>
                                    <Col sm={12}>
                                        <img className="image-styles" src="https://ak1.ostkcdn.com/img/mxc/b2b/designer_img.jpg" alt="Designer Benefits" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="signBtnOutWrap">
                                        <button type="button" className="navigatebutton" onClick={this.scrollToTop}>{SIGN_UP}</button>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="government">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1">{SOLUT_FOR_GOV_BUYERS}</h3>
                                <p className="paragraph_Txt">{GOV_BUYER_FIRST_TEXT}</p>
                                <img className="image-styles" src="https://ak1.ostkcdn.com/img/mxc/b2b/Government.png" alt="Government Buyers" />
                                <p className="paragraph_Txt">{GOV_BUYER_SECOND_TEXT}</p>
                            </Col>
                            <Col md={6} sm={12} className="listOutsideWrap">
                                <ul>
                                    <li>{COMPET_PRICING}</li>
                                    <li>{CONV_PAYEMENT_OPTION}</li>
                                    <li>{EASY_ACC_MGMT}</li>
                                </ul>
                            </Col>
                            <Col md={6} sm={12} className="listOutsideWrap">
                                <ul>
                                    <li>{SIMPLE_APPROV_PROCESS}</li>
                                    <li>{BUSIN_ANALYTICS}</li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className="signBtnOutWrap">
                                <button type="button" className="navigatebutton" onClick={this.scrollToTop}>Sign Up </button>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="corporate">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1">
                                    {CORP_BENEFITS}
                                </h3>
                                <p className="paragraph_Txt">{CORPORATE_BENEFITS}</p>
                            </Col>
                            <div className="b2b-custom-container">
                                <Row>
                                    <Col sm={12}>
                                        <img className="image-styles" src="https://ak1.ostkcdn.com/img/mxc/b2b/corporate.png" alt="Corporate Benefits" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="signBtnOutWrap">
                                        <button type="button" className="navigatebutton" onClick={this.scrollToTop}>{SIGN_UP}</button>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="smallBusiness">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1">{SMALL_BUSIN}</h3>
                                <p className="paragraph_Txt">{SMALL_BUSINESS}</p>
                            </Col>
                            <div className="b2b-custom-container">
                                <Row>
                                    <Col sm={12}>
                                        <img className="image-styles" src="https://ak1.ostkcdn.com/img/mxc/b2b/small business.png" alt="Small Business" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="signBtnOutWrap">
                                        <button type="button" className="navigatebutton" onClick={this.scrollToTop}>{SIGN_UP}</button>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </section>
                </div>
                <div id="contactUs" className="contactUs-styles">
                    <div className="insideContainerWrap">
                        <div className="contactUs-info">
                            <img src="https://ak1.ostkcdn.com/img/mxc/b2b/overstock-logo.png" className="mainLogo" alt="FooterLogo"/>
                            <p className="contactUs-txt">{CONTACT_US_INFO}</p>
                        </div>
                        <div className="contactUs-details">
                            <h1>{CONTACT_US}</h1>
                            <p>
                                <i className="fa fa-envelope" />
                                <span className="contactUs-email">{CONCIERGE_EMAIL}</span>
                            </p>
                            <p>
                                <i className="fa fa-phone" />
                                <span className="contactUs-phone">{CONCIERGE_PHONE}</span>
                                <br/>
                                <span className="contactUs-timeDate">{CONCIERGE_AVAILABILITY}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterDetail;
