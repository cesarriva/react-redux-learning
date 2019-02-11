import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ name, label, value, defaultOption, options, error, onChange }) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + "haserror";
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control">
                    <option value="">{defaultOption}</option>
                    {options.map(op => {
                        return <option key={op.value} value={op.value}>{op.text}</option>
                    })}
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    defaultOption: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default SelectInput;