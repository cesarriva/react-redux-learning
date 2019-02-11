import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { Redirect } from 'react-router'

class ManagerCoursePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            redirectToCoursesPage: false
        };

        this.updateCourseFormState = this.updateCourseFormState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.course.id != nextProps.course.id) {
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    updateCourseFormState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.setState({ redirectToCoursesPage: true });
    }

    render() {
        let { redirectToCoursesPage } = this.state;

        if (redirectToCoursesPage) {
            return <Redirect to={'/courses'} />
        }

        return (
            <CourseForm
                course={this.state.course}
                errors={this.state.errors}
                allAuthors={this.props.authors}
                onChange={this.updateCourseFormState}
                onSave={this.saveCourse} />
        );
    }
}

ManagerCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function getCourseInCoursesById(id, courses) {
    if (id) {
        let coursesFiltered = courses.filter(c => c.id == id);
        if (coursesFiltered.length == 0) return null;
        return coursesFiltered[0];
    }
    return (
        {
            id: "",
            title: "",
            watchHref: "",
            authorId: "",
            length: "",
            category: ""
        });
}

function mapStateToProps(state, ownProps) {
    let courseId = ownProps.match.params.id;
    let course = getCourseInCoursesById(courseId, state.courses);

    const authorsForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerCoursePage);