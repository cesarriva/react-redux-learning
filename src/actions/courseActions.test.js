import * as courseActions from './courseActions';
import * as actionTypes from './actionTypes';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Should creacte BEGIN_AJAX_CALL and LOAD_COURSE_SUCCESS when loading courses', (done) => {
        //arrange
        const expectedActions = [
            { type: actionTypes.BEGIN_AJAX_CALL },
            { type: actionTypes.LOAD_COURSES_SUCCESS, body: { courses: [{ id: 'clean-code', title: 'Clen Code' }] } }
        ];

        const store = mockStore({ courses: [] }, expectedActions);
        store.dispatch(courseActions.loadCourses()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(actionTypes.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(actionTypes.LOAD_COURSES_SUCCESS);
            done();
        });
    });
});