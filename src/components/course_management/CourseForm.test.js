import React from 'react';
import expect from 'expect';
import CourseForm from './CourseForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

function setup(saving) {
    const props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => { },
        onChange: () => { }
    };

    return Enzyme.shallow(<CourseForm {...props} />);
}

describe('Tests via Enzyme', () => {
    it('renders form and h1', () => {
        const wrapper = setup(false);
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Manage Course');
    });

    it('save button is labeled "Save" when not saving', () => {
        const wrapper = setup(false);
        expect(wrapper.find('input').props().value).toBe('Save');
    });

    it('save button is labeled "Saving..." when saving', () => {
        const wrapper = setup(true);
        expect(wrapper.find('input').props().value).toBe('Saving...');
    });
});
