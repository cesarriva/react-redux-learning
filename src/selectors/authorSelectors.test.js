import { authorsForDropdown } from './authorSelectors';
import expect from 'expect';

describe('Author selectors', () => {
    describe('authorsForDropdown', () => {
        it('Should return author data to be used in dropdown', () => {
            const authors = [
                {
                    id: 'cory-house',
                    firstName: 'Cory',
                    lastName: 'House'
                },
                {
                    id: 'scott-allen',
                    firstName: 'Scott',
                    lastName: 'Allen'
                }
            ];

            const expected = [
                { value: 'cory-house', text: 'Cory House' },
                { value: 'scott-allen', text: 'Scott Allen' }
            ]

            expect(authorsForDropdown(authors)).toEqual(expected);
        });
    });
});