import React from 'react';
import { shallow, mount } from 'enzyme';

// Import the unconnected version -- see http://redux.js.org/docs/recipes/WritingTests.html#connected-components
import { UserInput } from '../../src/components/UserInput';

let wrapper, inputHelp;
beforeEach(() => {
    wrapper = shallow(<UserInput />);
    inputHelp = <div className="text-validation-help input-help">Links should start with "http://" or "https://"</div>;
});

describe('UserInput', () => {
    test('should show feedback, cross icon and have "incorrect" style on focus w/ invalid input', () => {
        // const { wrapper, inputHelp } = t.context.data;

        expect(wrapper.find('input[type="text"]').hasClass('text-input')).toBe(true);

        'http:/'.split('').reduce((acc, curr) => {
            acc += curr;
            wrapper.find('input[type="text"]').simulate('change', { target: { value: acc } });

            expect(wrapper.state('input')).toBe(acc);
            expect(
                wrapper.find('input[type="text"]').hasClass('text-input input-focus-incorrect')
            ).toBe(true);
            expect(wrapper.contains(inputHelp)).toBe(true);
            expect(wrapper.find('svg').hasClass('incorrect-input-icon')).toBe(true);
            return acc;
        }, '');
    });

    test('should not show feedback, contain check icon and have "correct" style on focus w/ valid input', () => {
        // const { wrapper, inputHelp } = t.context.data;

        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });

        expect(
            wrapper.find('input[type="text"]').hasClass('text-input input-focus-correct')
        ).toBe(true); // or simply input-focus-correct
        expect(wrapper.contains(inputHelp)).toBe(false);
        expect(wrapper.find('svg').hasClass('correct-input-icon')).toBe(true);
    });

    test('should blur, fire shortenLink and clear the input field on Enter w/ valid input', () => {
        // It seems that wrapper.ref() does not work with the new "ref" style (see https://github.com/airbnb/enzyme/issues/298
        // and https://github.com/airbnb/enzyme/issues/566. We will mount the component into the document and detect
        // changes in document.activeElement.
        document.body.innerHTML = '<div id="root"></div>';
        const shortenLink = jest.fn();
        const wrapper = mount(<UserInput shortenLink={shortenLink}/>, { attachTo: document.body.firstChild });

        // Put the cursor into the input field. The first three lines are there for the sake of exercise, because the same
        // won't work with blur for some reason (commented out below). We'll be relying on document.activeElement.
        const focusSpy = jest.spyOn(wrapper.find('input[type="text"]').getDOMNode(), 'focus');
        wrapper.find('input[type="text"]').getDOMNode().focus();
        expect(focusSpy).toHaveBeenCalled();
        expect(document.activeElement.nodeName).toBe('INPUT');

        // Type correct input and hit Enter
        const blurSpy = jest.spyOn(wrapper.find('input[type="text"]').getDOMNode(), 'blur');
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });
        expect(wrapper.state('input')).toBe('http://');
        wrapper.find('input[type="text"]').simulate('keyDown', {key: 'Enter', keyCode: 13});
        expect(wrapper.state('input')).toBe('');
        expect(shortenLink).toHaveBeenCalled(); // shortenLink is tested separately in actions
        expect(blurSpy).toHaveBeenCalled();
        expect(document.activeElement.nodeName).toBe('BODY');


        // Trying to test form submission (needed to test if event.preventDefault() has been called on Enter). Won't work:
        // const submitSpy = jest.spyOn(wrapper.find('form').getDOMNode(), 'submit');
        // wrapper.find('input[type="text"]').simulate('change', { target: { value: 'http://' } });
        // wrapper.find('input[type="text"]').simulate('keyDown', { key: 'Enter', keyCode: 13 });
        // expect(submitSpy).toHaveBeenCalled();
    });
});