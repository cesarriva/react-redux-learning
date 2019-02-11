import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

//-----Actions
export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function updateCourseSuccess(updatedCourse) {
    return { type: types.UPDATE_COURSE_SUCCESS, course: updatedCourse };
}

export function createCourseSuccess(createdCourse) {
    return { type: types.CREATE_COURSE_SUCCESS, course: createdCourse };
}

//-----Thunks for async calls
export function loadCourses() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw (error);
        });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError())
            throw (error);
        });
    };
}