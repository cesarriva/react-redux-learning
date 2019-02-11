import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

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
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw (error);
        });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            throw (error);
        });
    };
}