import React from 'react';
import logo from '../../logo.svg';
import PropTypes from 'prop-types';

function AjaxSpinner({ text }) {
    return (
        <div className="App-spinner-wrapper">
            <img src={logo} />
            {text}
        </div>
    );
}

AjaxSpinner.propTypes = {
    text: PropTypes.string.isRequired
};

export default AjaxSpinner;