import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { Redirect } from 'react-router'
import toastr from 'toastr';
import { authorsForDropdown } from '../../selectors/authorSelectors';

export class ManagerCoursePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            redirectToCoursesPage: false,
            saving: false
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

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characteres.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirectAfterSaving())
            .catch(err => {
                this.setState({ saving: false });
                toastr.error(err);
            });
    }

    redirectAfterSaving() {
        this.setState({ saving: false });
        toastr.success("Course saved.")
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
                onSave={this.saveCourse}
                saving={this.state.saving} />
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

    return {
        course: course,
        authors: authorsForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerCoursePage);