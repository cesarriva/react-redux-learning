import courseReducer from './courseReducer';
import expect from 'expect';
import * as courseActions from '../actions/courseActions';

describe('Course Reducer Tests', () => {
    it('Should add course when action is CREATE_COURSE_SUCESS', () => {
        //arrange
        const initialState = [
            { title: 'A' },
            { title: 'B' }
        ];
        const newCourse = { title: 'C' };
        const action = courseActions.createCourseSuccess(newCourse);

        //act
        const newState = courseReducer(initialState, action);

        //assert
        expect(newState.length).toEqual(3);
        expect(newState[2].title).toEqual('C');
    });
});