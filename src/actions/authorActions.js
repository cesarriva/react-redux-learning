import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';

//-----Actions
export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

//-----Thunks for async calls
export function loadAuthors() {
    return dispatch => {
        return authorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw (error);
        });
    }
}

