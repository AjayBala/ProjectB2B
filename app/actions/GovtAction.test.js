import { expect } from 'chai';
import * as GovtActionTypes from '../actionTypes/GovtActionTypes';
import * as actions from './GovtAction';

describe('Govt Actions', () => {
    describe('Govt Action Form', () => {
        let getGovtCategorys = null;
        it('returns correct action type get note', () => {
            getGovtCategorys = actions.getGovtCategorys();
            expect(getGovtCategorys.type).to.equal(GovtActionTypes.GET_CATEGORYS_REQUEST);
        });
    });
});
