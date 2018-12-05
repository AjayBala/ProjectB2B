import { expect } from 'chai';
import GovtReducer from './GovtReducer';
import * as types from '../actionTypes/GovtActionTypes';

describe('GovtReducer', () => {
    const payload = {};
    it('Should be called GET_CATEGORYS_REQUEST', () => {
        expect(
            GovtReducer(undefined, {
                type: types.GET_CATEGORYS_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_CATEGORYS_SUCCESS', () => {
        expect(
            GovtReducer([], {
                type: types.GET_CATEGORYS_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_CATEGORYS_ERROR', () => {
        expect(
            GovtReducer(undefined, {
                type: types.GET_CATEGORYS_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            GovtReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
