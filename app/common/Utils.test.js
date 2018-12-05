import { expect } from 'chai';
import {
    positiveValue,
    validateEmail,
    getEmailDomain,
    validateMonth,
    validateYear,
    required,
    normalizeZip,
    normalizeCard,
    normalizeCardNumber,
    validatePassword,
    validateNewPassword,
    phoneNumberFormatting,
    companyPhoneNumberFormatting,
    einNumberFormater,
 } from './Utils';

describe('Utils', () => {
it('Should be called positiveValue with value', () => {
    const aptError = positiveValue(123);
    expect(aptError).to.equal(undefined);
});

it('Should be called positiveValue with value', () => {
    const aptError = positiveValue(-1);
    expect(aptError).to.equal('Must be positive values');
});

it('call validateEmail with proper value', () => {
    const values = {
        emailId: 'josh@ostk.com',
        password: 'Password@1'
    };
    const emailValidation = validateEmail(values);
    expect(emailValidation).to.equal('');
});

it('call validateEmail with empty emailID', () => {
    const values = {
        password: 'Password@1'
    };
    const emailValidation = validateEmail(values);
    expect(emailValidation).to.equal('Required');
});

it('call validateEmail with invalid emailID', () => {
    const values = {
        emailId: 'josh@ostkcom',
        password: 'Password@1'
    };
    const emailValidation = validateEmail(values);
    expect(emailValidation).to.equal('Please Enter a Valid Email');
});

it('call getEmailDomain with emailID', () => {
    const value = 'josh@ostk.com';
    const domain = getEmailDomain(value);
    expect(domain).to.equal('.com');
});

it('call getEmailDomain with mil emailID', () => {
    const value = 'josh@gov.mil';
    const domain = getEmailDomain(value);
    expect(domain).to.equal('.mil');
});

it('call getEmailDomain with mil', () => {
    const domain = getEmailDomain();
    expect(domain).to.equal(null);
});

it('call validateMonth with valid month', () => {
    const values = { month: 10 };
    const month = validateMonth(values);
    expect(month).to.equal('');
});

it('call validateMonth with in-valid month', () => {
    const values = { month: 13 };
    const month = validateMonth(values);
    expect(month).to.equal('Invalid Month');
});

it('call validateMonth with in-valid negative month', () => {
    const values = { month: 0 };
    const month = validateMonth(values);
    expect(month).to.equal('Invalid Month');
});

it('call validateYear with valid year', () => {
    const values = { year: 2028 };
    const year = validateYear(values);
    expect(year).to.equal('');
});

it('call validateYear with in-valid lower year', () => {
    const values = { year: -120 };
    const year = validateYear(values);
    expect(year).to.equal('Invalid Year');
});

it('call validateYear with in-valid higher year', () => {
    const values = { year: 2058 };
    const year = validateYear(values);
    expect(year).to.equal('Invalid Year');
});

it('call required with valid values', () => {
    const values = { year: 2058 };
    const requiredValue = required(values);
    expect(requiredValue).to.equal(undefined);
});

it('call required with empty values', () => {
    const requiredValue = required();
    expect(requiredValue).to.equal('Required');
});

it('call normalizeZip with valid zip values', () => {
    const value = 'aaa';
    const zipValue = normalizeZip(value);
    expect(zipValue).to.equal('');
});

it('call normalizeZip with empty zip values', () => {
    const value = '';
    const zipValue = normalizeZip(value);
    expect(zipValue).to.equal(value);
});
it('call normalizeCard and it should check starting 4 digits number', () => {
    const cardNumber = '6756';
    const normalizedCardDetails = normalizeCard(cardNumber);
    expect(normalizedCardDetails).to.equal('6756-');
});

it('call normalizeCard and it should check 8 digits number', () => {
    const cardNumber = '67777777';
    const normalizedCardDetails = normalizeCard(cardNumber);
    expect(normalizedCardDetails).to.equal('6777-7777-');
});

it('call normalizeCard and it should check 12 digits number', () => {
    const cardNumber = '677777778989';
    const normalizedCardDetails = normalizeCard(cardNumber);
    expect(normalizedCardDetails).to.equal('67777777-8989-');
});

it('call normalizeCard and it should check 12 digits number', () => {
    const cardNumber = '6777777789893';
    const normalizedCardDetails = normalizeCard(cardNumber);
    expect(normalizedCardDetails).to.equal('6777-7777-8989-3');
});

it('call normalizeCard and it should check 2 digits number', () => {
    const cardNumber = '67';
    const normalizedCardDetails = normalizeCard(cardNumber, '67');
    expect(normalizedCardDetails).to.equal('67');
});

it('call normalizeCard and it should check 6 digits number', () => {
    const cardNumber = '672299';
    const normalizedCardDetails = normalizeCard(cardNumber, '672299');
    expect(normalizedCardDetails).to.equal('6722-99');
});

it('call normalizeCard and it should check 10 digits number', () => {
    const cardNumber = '6722996666';
    const normalizedCardDetails = normalizeCard(cardNumber, '672299');
    expect(normalizedCardDetails).to.equal('67229966-66');
});

it('call normalizeCard and it should check 6 digits number', () => {
    const cardNumber = '';
    const normalizedCardDetails = normalizeCard(cardNumber, '');
    expect(normalizedCardDetails).to.equal('');
});

it('call normalizeCard and it should check undefined values', () => {
    const normalizedCardDetails = normalizeCard(undefined, undefined);
    expect(normalizedCardDetails).to.equal(undefined);
});

it('call normalizeCardNumber and it should check num only in card number', () => {
    const normalizedCardDetails = normalizeCardNumber('6777-7777-8989-3');
    expect(normalizedCardDetails).to.equal('6777777789893');
});

it('call normalizeCardNumber and it should check num only in card number', () => {
    const normalizedCardDetails = normalizeCardNumber();
    expect(normalizedCardDetails).to.equal();
});

it('call validatePassword and should validate with valid details', () => {
    const values = {
        password: 'Pasword@1',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validatePasswordDetails = validatePassword(values, length, capital, special, number);
    expect(validatePasswordDetails.error).to.equal('');
});
it('call validatePassword and should validate with in valid details no number in password', () => {
    const values = {
        password: 'Pasword@',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validatePasswordDetails = validatePassword(values, length, capital, special, number);
    expect(validatePasswordDetails.error).to.equal('Atleast 1 numeric character');
});
it('call validatePassword and should validate with in valid details no special character in password', () => {
    const values = {
        password: 'Pasword1',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validatePasswordDetails = validatePassword(values, length, capital, special, number);
    expect(validatePasswordDetails.error).to.equal('Atleast 1 special character(!,*,$,@)');
});
it('call validatePassword and should validate with in valid details no capital letter in password', () => {
    const values = {
        password: 'pasword1@',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validatePasswordDetails = validatePassword(values, length, capital, special, number);
    expect(validatePasswordDetails.error).to.equal('At least 1 capital letter');
});
it('call validatePassword and should validate with in valid details less than 8 chars in password', () => {
    const values = {
        password: 'Pas1@',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validatePasswordDetails = validatePassword(values, length, capital, special, number);
    expect(validatePasswordDetails.error).to.equal('8 character minimum');
});
it('call validatePassword and should validate without password', () => {
    const values = {
        password: '',
        emailId: 'josh@ostk.com'
    };
    const validatePasswordDetails = validatePassword(values);
    expect(validatePasswordDetails.error).to.equal('Required');
});
it('call phoneNumberFormatting and it should check starting 3 digits number', () => {
    const phoneNumber = '675';
    const normalizedphoneNumberDetails = phoneNumberFormatting(phoneNumber);
    expect(normalizedphoneNumberDetails).to.equal('675');
});

it('call phoneNumberFormatting and it should check 6 digits number', () => {
    const phoneNumber = '677777';
    const normalizedphoneNumberDetails = phoneNumberFormatting(phoneNumber);
    expect(normalizedphoneNumberDetails).to.equal('(677) 777');
});

it('call phoneNumberFormatting and it should check 10 digits number', () => {
    const phoneNumber = '6777777789';
    const normalizedphoneNumberDetails = phoneNumberFormatting(phoneNumber);
    expect(normalizedphoneNumberDetails).to.equal('(677) 777-7789');
});

it('call phoneNumberFormatting and it should check 6 digits number', () => {
    const phoneNumber = '';
    const normalizedphoneNumberDetails = phoneNumberFormatting(phoneNumber, '');
    expect(normalizedphoneNumberDetails).to.equal('');
});

it('call phoneNumberFormatting and it should check undefined values', () => {
    const normalizedphoneNumberDetails = phoneNumberFormatting(undefined, undefined);
    expect(normalizedphoneNumberDetails).to.equal(undefined);
});

it('call companyPhoneNumberFormatting and it should check starting 3 digits number', () => {
    const phoneNumber = '675';
    const normalizedphoneNumberDetails = companyPhoneNumberFormatting(phoneNumber);
    expect(normalizedphoneNumberDetails).to.equal('675');
});

it('call companyPhoneNumberFormatting and it should check 6 digits number', () => {
    const phoneNumber = '677777';
    const normalizedphoneNumberDetails = companyPhoneNumberFormatting(phoneNumber);
    expect(normalizedphoneNumberDetails).to.equal('(677) 777');
});

it('call companyPhoneNumberFormatting and it should check 10 digits number', () => {
    const phoneNumber = '6777777789';
    const normalizedphoneNumberDetails = companyPhoneNumberFormatting(phoneNumber);
    expect(normalizedphoneNumberDetails).to.equal('(677) 777 7789');
});
it('call companyPhoneNumberFormatting and it should check 6 digits number', () => {
    const phoneNumber = '';
    const normalizedphoneNumberDetails = companyPhoneNumberFormatting(phoneNumber, '');
    expect(normalizedphoneNumberDetails).to.equal('');
});

it('call companyPhoneNumberFormatting and it should check undefined values', () => {
    const normalizedphoneNumberDetails = companyPhoneNumberFormatting(undefined, undefined);
    expect(normalizedphoneNumberDetails).to.equal(undefined);
});
it('call validateNewPassword and should validate with valid details', () => {
    const values = {
        password: 'Pasword@1',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validateNewPasswordDetails = validateNewPassword(values, length, capital, special, number);
    expect(validateNewPasswordDetails.error).to.equal('Required');
});
it('call validateNewPassword and should validate with in valid details no number in password', () => {
    const values = {
        password: 'Pasword@',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validateNewPasswordDetails = validateNewPassword(values, length, capital, special, number);
    expect(validateNewPasswordDetails.error).to.equal('Required');
});
it('call validateNewPassword and should validate with in valid details no special character in password', () => {
    const values = {
        password: 'Pasword1',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validateNewPasswordDetails = validateNewPassword(values, length, capital, special, number);
    expect(validateNewPasswordDetails.error).to.equal('Required');
});
it('call validateNewPassword and should validate with in valid details no capital letter in password', () => {
    const values = {
        password: 'pasword1@',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validateNewPasswordDetails = validateNewPassword(values, length, capital, special, number);
    expect(validateNewPasswordDetails.error).to.equal('Required');
});
it('call validateNewPassword and should validate with in valid details less than 8 chars in password', () => {
    const values = {
        password: 'Pas1@',
        emailId: 'josh@ostk.com'
    };
    const length = { classList: { remove() {}, add() {} } };
    const capital = { classList: { remove() {}, add() {} } };
    const special = { classList: { remove() {}, add() {} } };
    const number = { classList: { remove() {}, add() {} } };
    const validateNewPasswordDetails = validateNewPassword(values, length, capital, special, number);
    expect(validateNewPasswordDetails.error).to.equal('Required');
});
it('call validateNewPassword and should validate without password', () => {
    const values = {
        password: '',
        emailId: 'josh@ostk.com'
    };
    const validateNewPasswordDetails = validateNewPassword(values);
    expect(validateNewPasswordDetails.error).to.equal('Required');
});
it('call einNumberFormater and it should check starting 2 digits number', () => {
    const einNumber = '67';
    const normalizedEinNumberDetails = einNumberFormater(einNumber);
    expect(normalizedEinNumberDetails).to.equal('67');
});

it('call einNumberFormater and it should check 6 digits number', () => {
    const einNumber = '677777';
    const normalizedEinNumberDetails = einNumberFormater(einNumber);
    expect(normalizedEinNumberDetails).to.equal('67-7777');
});

it('call einNumberFormater and it should check 6 digits number', () => {
    const einNumber = '';
    const normalizedEinNumberDetails = einNumberFormater(einNumber, '');
    expect(normalizedEinNumberDetails).to.equal('');
});

it('call einNumberFormater and it should check undefined values', () => {
    const normalizedEinNumberDetails = einNumberFormater(undefined, undefined);
    expect(normalizedEinNumberDetails).to.equal(undefined);
});
it('call onlyNums and it should check for only numbers', () => {
    const onlyNums = 'ABCD';
    const normalizedOnlyNumsDetails = einNumberFormater(onlyNums);
    expect(normalizedOnlyNumsDetails).to.equal('');
});

it('call onlyNums and it should check 6 digits number', () => {
    const onlyNums = '';
    const normalizedOnlyNumsDetails = einNumberFormater(onlyNums, '');
    expect(normalizedOnlyNumsDetails).to.equal('');
});

it('call onlyNums and it should check undefined values', () => {
    const normalizedOnlyNumsDetails = einNumberFormater(undefined, undefined);
    expect(normalizedOnlyNumsDetails).to.equal(undefined);
});
});
