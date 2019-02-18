import React from 'react';
import expect from 'expect';
import { ManagerCoursePage } from './ManagerCoursePage';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Manage course page', () => {
    it('Sets error message when trying to save empty title', () => {
        const props = {
            authors: [],
            course: {
                id: "",
                title: "",
                watchHref: "",
                authorId: "",
                length: "",
                category: ""
            },
            actions: {
                saveCourse: () => { return Promise.resolve(); }
            }
        };
        const wrapper = Enzyme.mount(<ManagerCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();

        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characteres.');
    });
});