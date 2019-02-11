//this is the root redurcer, by convention, its called index.js
import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
    courses: courses,
    authors: authors
});

export default rootReducer;