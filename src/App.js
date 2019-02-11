import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from '../src/components/home/HomePage';
import AboutPage from '../src/components/about/AboutPage';
import NavMenu from '../src/components/shared/NavMenu';
import CoursesPage from './components/course_management/CoursesPage';
import ManageCoursePage from './components/course_management/ManageCoursePage';
import AjaxSpinner from './components/shared/AjaxSpinner';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavMenu />
          {this.props.loading && <AjaxSpinner text={"Loading..."} />}
          <div className="container">
            <div className="row">
              <div className="col">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/home" exact component={HomePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/courses" component={CoursesPage} />
                <Route exact path="/course" component={ManageCoursePage} />
                <Route path="/course/:id" component={ManageCoursePage} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
